# 🧾 JumpServer Docker 部署踩坑总结笔记

（基于 JumpServer 单容器部署）

------

# 一、整体问题链路（你经历的全过程）

你的问题其实是一步步叠加的：

```
Docker网络问题
→ Redis连接问题
→ Redis认证问题
→ JumpServer兼容问题
→ 核心服务未启动
→ DOMAINS限制
→ MFA限制
```

👉 每一步都是“正常机制”，但组合起来就很容易卡死

------

# 二、Docker 访问宿主机问题

## ❗问题

容器访问：

```
host.docker.internal
```

报错：

```
no such host
```

------

## ✅ 原因

- Linux 默认没有 `host.docker.internal`
- 只有 Mac / Windows 自带

------

## ✅ 解决

```bash
--add-host=host.docker.internal:host-gateway
```

------

# 三、Redis 连接与认证问题

------

## ❗现象

```text
AuthenticationError: Invalid Username or Password
```

------

## 🧠 排查过程

你验证过：

```bash
ACL LIST
```

结果：

```text
user default on nopass
```

👉 理论：Redis 无密码 ✅
👉 实际：仍然报认证错误 ❌

------

## 💥 根本原因

👉 JumpServer 内部逻辑：

```
即使 Redis 无密码 → 仍然尝试 AUTH → 报错
```

👉 尤其在 Redis 6+（ACL模式）下更明显

------

## ✅ 结论

| 情况         | 结果     |
| ------------ | -------- |
| Redis 无密码 | ❌ 不兼容 |
| Redis 有密码 | ✅ 正常   |

------

## ✅ 最终解决（推荐）

```bash
redis-cli
ACL SETUSER default on >123456 allcommands allkeys
```

然后：

```bash
-e REDIS_PASSWORD=123456
```

------

# 四、SQLite 单机模式误区

------

## ❗你的尝试

👉 不使用 MySQL 和 Redis，只用 SQLite

------

## 💥 问题

虽然日志显示：

```
init sqlite db
```

但：

👉 **jms_all 镜像并不完全支持纯 SQLite**

------

## ❗结果

```
jms_core 未启动
http://localhost:8080 无法访问
```

------

## ✅ 结论

| 组件  | 是否必须 |
| ----- | -------- |
| MySQL | 可选     |
| Redis | ❗必须    |

------

# 五、核心服务未启动（关键问题）

------

## ❗错误

```text
connect: connection refused localhost:8080
```

------

## 🧠 说明

- jms_core 没起来
- 其他组件（koko/lion）在等待

------

## 💥 原因

- Redis 异常
- DB 初始化失败

------

## ✅ 解决

👉 至少保证：

```
Redis 正常 + 可认证
```

------

# 六、挂载目录错误

------

## ❗错误写法

```bash
-v /opt/jumpserver:/opt/jumpserver/data/media
```

------

## ❗报错

```
Device or resource busy
```

------

## ✅ 正确写法

```bash
-v /opt/jumpserver:/opt/jumpserver/data
```

------

# 七、DOMAINS 配置问题

------

## ❗错误提示

```
配置文件有问题，设置 DOMAINS=
```

------

## 🧠 原因

JumpServer 安全策略：

👉 限制允许访问的域名/IP

------

## ✅ 解决

```bash
-e DOMAINS=*
```

------

## 📌 推荐写法（生产）

```bash
-e DOMAINS=your.domain.com
```

------

# 八、MFA（多因素认证）问题

------

## ❗提示

```
该操作需要验证您的 MFA
```

------

## 🧠 原因

JumpServer 默认安全策略：

👉 敏感操作必须 MFA

------

## ✅ 方案一（推荐）

使用认证 App：

- Google Authenticator
- Microsoft Authenticator

👉 扫码绑定即可

------

## ✅ 方案二（测试用）

关闭 MFA：

```bash
-e SECURITY_MFA_AUTH=0
```

------

# 九、最终可用最简方案（推荐）

------

## ✅ 最少组件（稳定）

👉 SQLite + Redis

```bash
docker run --name jumpserver -d \
  --add-host=host.docker.internal:host-gateway \
  -v /opt/jumpserver:/opt/jumpserver/data \
  -p 19543:80 \
  -p 2222:2222 \
  -e SECRET_KEY=xxx \
  -e BOOTSTRAP_TOKEN=xxx \
  -e DOMAINS=* \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PORT=6379 \
  -e REDIS_PASSWORD=123456 \
  jumpserver/jms_all:latest
```

------

# 十、核心经验总结（重点）

------

## 🎯 1️⃣ 不要用“无密码 Redis”

👉 JumpServer 不稳定支持 ❌

------

## 🎯 2️⃣ Redis 几乎是必须组件

👉 即使用 SQLite

------

## 🎯 3️⃣ 单容器 jms_all 有兼容坑

👉 推荐：

- docker-compose
- 内部网络

------

## 🎯 4️⃣ 必须配置 DOMAINS

否则：

```
无法登录
```

------

## 🎯 5️⃣ MFA 是默认安全策略

不是错误，是机制

------

# 🚀 总结一句话

👉 你这次踩的不是“一个坑”，而是：

> **Docker网络 + Redis认证 + JumpServer设计 三者叠加问题**

------

如果你下一步想要一套：

- ✅ 生产级部署（MySQL + Redis + JumpServer）
- ✅ docker-compose 一键启动
- ✅ 无任何坑