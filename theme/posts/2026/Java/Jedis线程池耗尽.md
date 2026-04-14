---
title: Jedis线程池耗尽相关问题
tags: [Java， 多线程]
categories: [多线程]
date: 2026-4-6
description: Jedis线程池耗尽相关问题
articleGPT: Jedis线程池耗尽相关问题
references:
  - title: Java
    url: https://github.com/imsyy/vitepress-theme-curve
---



# 项目问题笔记（Problem Notes）

## 1. Spring Boot 启动失败：`Invalid empty profile` 与 `spring.profiles.active`

### 现象

启动时报错（示例）：

```bash
APPLICATION FAILED TO START

Failed to bind properties under 'spring.profiles.active' to java.util.Set<java.lang.String>:

    Property: spring.profiles.active
    Value: "
"
    Origin: "spring.profiles.active" from property source "systemProperties"
    Reason: java.lang.IllegalStateException: Invalid empty profile
```

关键点：

- **Origin 是 `systemProperties`**：说明 `spring.profiles.active` 来自 JVM 系统属性（通常是 IDE 运行配置或启动脚本的 `-Dspring.profiles.active=...`），会覆盖 `application.yaml`。
- **Value 为空/仅空白**：Spring Boot 不允许空 profile，因此报 `Invalid empty profile`。

### 根因（本仓库的实际原因）

在 IntelliJ IDEA 的运行配置中，`OrangeSystemApplication` 曾被设置了空的 Active Profiles，对应 `.idea/workspace.xml` 类似：

```xml
<option name="ACTIVE_PROFILES" value="&#10;" />
```

`&#10;` 是换行符，等价于 Active profiles 输入框里只有空白/回车，最终作为系统属性传入，覆盖 YAML。

### 解决方案

- **IDE 修复（推荐）**：Run/Debug Configurations → Spring Boot → 对应 Application → Active profiles 填 `dev` 或完全清空（不要只留换行/空白）。
- **不要传空系统属性**：避免 `-Dspring.profiles.active=` 这种等号后为空的写法。

---

## 2. Spring Boot 启动失败：`application-dev.yaml` 中非法配置 `spring.profiles.active`

### 现象

报错（示例）：

```bash
InvalidConfigDataPropertyException: Property 'spring.profiles.active' imported from location
'class path resource [application-dev.yaml]' is invalid in a profile specific resource
```

### 根因

`application-dev.yaml` 属于 **profile 专用配置**（只有在 dev profile 已经激活后才会加载）。

因此 Spring Boot 明确禁止在 profile 专用文件里再次声明：

- `spring.profiles.active`

否则会产生“在 dev 文件里再激活 dev”的自引用/冲突，直接判定为非法配置。

### 解决方案

- 把 `spring.profiles.active` **从 `application-dev.yaml` 删除**。
- 将 `spring.profiles.active` 放在：
  - `application.yaml`（作为默认激活），或
  - 启动参数/环境变量（如 `-Dspring.profiles.active=dev` / `SPRING_PROFILES_ACTIVE=dev`）。

---

## 3. Redis 分布式锁：误删/覆盖锁、Lua 脚本问题与修复方案（Jedis）

### 现象与诉求

希望用 Lua 脚本删除锁 key，避免“删除过程中 key 失效”的竞态；并检查项目里的分布式锁实现是否正确。

### 常见问题（本项目里曾出现/容易出现）

- **加锁方式错误**：使用 `SETEX` 会无条件覆盖 key，不是互斥锁（不能防并发）。
- **锁所有者未校验**：直接 `DEL lockKey` 或 Lua 仅判断 `EXISTS` 就删，会误删别人的锁。
- **脚本未执行**：只把 Lua 存到变量，没有 `eval` 调用等同于没解锁。
- **重试方式不当**：递归重试会导致栈增长；高并发下更容易雪崩。
- **连接泄漏**：`jedisPool.getResource()` 获取连接后未 close，会更快耗尽连接池。

### 正确做法（推荐实现）

#### 3.1 原子加锁：`SET key value NX PX ttl`

- `NX`：仅当 key 不存在时设置（互斥）
- `PX ttl`：毫秒级过期，防止死锁（进程挂掉锁能自动释放）

#### 3.2 原子解锁：Lua 校验 value 再删除

只删除“我持有的锁”，避免误删别人的锁：

```lua
if redis.call('GET', KEYS[1]) == ARGV[1] then
  return redis.call('DEL', KEYS[1])
else
  return 0
end
```

#### 3.3 重试策略

- 用 **循环 + 总超时**（例如最多尝试 3 秒，每 50ms 重试一次）
- 超时就 **快速失败/降级**，避免请求线程长期阻塞

---

## 4. 压测“跑到一半不返回”：如何避免 Jedis 连接池耗尽后的阻塞

### 现象

压测中途出现大量请求“不返回/卡住”，看起来像死锁；但日志可能仍能看到：

- “获取锁成功”
- “释放锁结果: 1”

这类情况通常不是死锁，而是**资源阻塞**。

### 典型根因

- **Jedis 连接池耗尽**：并发过高时，线程卡在 `jedisPool.getResource()` 等待连接；如果 `maxWait` 过大或无限，会表现为“永久不返回”。
- **控制台输出阻塞**：高并发 `System.out.println` 是同步 IO，会严重拖慢并发，放大阻塞。
- **连接泄漏**：某些路径获取了连接但未 close，导致池子越来越小，最终耗尽。

### 解决方案（从“立刻止血”到“架构升级”）

#### 4.1 立刻止血：连接池必须有限等待 + 失败快速返回

- **设置 `maxWait` 为小且有限**（例如 10ms～100ms 或按 SLA 设置），不要无限等待。
- **连接拿不到就降级/拒绝**（返回“系统繁忙”），不要让请求线程一直阻塞。
- 适度调大 `maxTotal/maxIdle`，但不要无限增大（Redis 单机也扛不住太多连接）。

#### 4.2 线程/并发隔离：不要让所有请求同时去抢 Redis 连接

- **限流**：对会访问 Redis 的接口做 QPS/并发限制。
- **舱壁隔离**：用独立线程池/信号量限制“同时访问 Redis 的并发数”。
- **全链路超时**：把“获取连接 + 执行命令 + 重试”都纳入同一个超时预算。

#### 4.3 减少“每请求一次 Redis”

要支撑极高请求量，重点是减少 Redis 压力：

- **本地缓存（如 Caffeine）**：热点数据优先本地命中
- **请求合并（singleflight）**：同 key 并发回源合并成 1 次
- **异步刷新/预热**：避免每个请求都触发锁竞争/回源

#### 4.4 客户端升级建议

如果目标真是超大吞吐并且希望减少阻塞线程：

- 优先考虑 **Lettuce（Netty、异步）**，少量连接支撑更高并发
- Jedis 是阻塞模型，想堆高并发往往需要更多线程/连接，更容易在压测下出现等待堆积

### 落地检查清单

- 代码里是否存在 `jedisPool.getResource()` 未 close 的路径？
- `maxWait` 是否有限？拿不到连接是否快速失败？
- 是否在压测时大量 `System.out.println`？
- 业务是否对同一个 key 大量并发回源（需要 singleflight/本地缓存）？

