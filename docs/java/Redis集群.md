---
title: Redis 集群搭建与配置详细操作笔记
tags: [Redis,集群]
categories: [Redis]
date: 2026-3-21
description: Redis 集群搭建与配置详细操作笔记
articleGPT: Redis 集群搭建与配置详细操作笔记
references:
  - title: Java
    url: https://github.com/imsyy/vitepress-theme-curve
---

### Redis 集群搭建与配置详细操作笔记

#### 一、前言

在现代分布式系统架构中，Redis 作为高性能的内存数据库，广泛应用于缓存、会话存储、消息队列等场景。为了提升系统的可用性与扩展性，单节点 Redis 已无法满足生产环境的需求，因此搭建高可用的 Redis 集群成为关键环节。

本文将基于实际操作流程，详细记录使用 Docker 搭建 Redis Cluster（Redis 集群）的完整过程，涵盖集群创建、节点分配、主从复制配置及最终验证步骤，旨在为后续运维、部署与故障排查提供一份清晰、可复用的技术笔记。

#### 二、环境准备

在开始之前，请确保本地或服务器已安装以下组件：

- Docker Engine
- Docker Compose（可选，用于管理多容器）
- Redis 镜像（建议使用 6.0+ 版本，支持原生集群模式）

本操作假设已通过 Docker 启动了 6 个 Redis 容器，分别命名为：

- redis-node-1（端口 7001）
- redis-node-2（端口 7002）
- redis-node-3（端口 7003）
- redis-node-4（端口 7004）
- redis-node-5（端口 7005）
- redis-node-6（端口 7006）

每个容器均已启用集群模式（cluster-enabled yes）并配置了正确的 cluster-config-file 与 cluster-node-timeout 参数。

#### 三、执行集群创建命令

进入任意一个节点容器（如 redis-node-1），执行 redis-cli 的集群创建命令。该命令将自动完成哈希槽分配、主从角色指定与节点握手。

命令如下：

```bash
docker exec -it redis-node-1 redis-cli --cluster create \
redis-node-1:7001 \
redis-node-2:7002 \
redis-node-3:7003 \
redis-node-4:7004 \
redis-node-5:7005 \
redis-node-6:7006 \
--cluster-replicas 1
```

参数说明：

- --cluster create：表示创建新集群
- 列出的六个地址为集群节点
- --cluster-replicas 1：表示每个主节点配备 1 个从节点

#### 四、集群配置预览与自动分配

执行命令后，Redis 会自动分析节点数量，并根据 --cluster-replicas 1 的策略进行规划。

由于共有 6 个节点，系统将自动分配：

- 3 个主节点（Master）
- 3 个从节点（Replica）

哈希槽（Hash Slots）分配方案如下：

- Master[0] → Slots 0 - 5460
- Master[1] → Slots 5461 - 10922
- Master[2] → Slots 10923 - 16383

该分配确保了数据在三个主节点间均匀分布，覆盖全部 16384 个槽位。

从节点分配关系：

- redis-node-5:7005 → 作为 redis-node-1:7001 的副本
- redis-node-6:7006 → 作为 redis-node-2:7002 的副本
- redis-node-4:7004 → 作为 redis-node-3:7003 的副本

系统输出节点角色预览：

```bash
M: 38c08c61b1c06815058ddc54ce2d02c097a62e9e redis-node-1:7001
   slots:[0-5460] (5461 slots) master
M: 209782c88f83acccbbc4264ba1cd49045fea89fc redis-node-2:7002
   slots:[5461-10922] (5462 slots) master
M: ae8a4fe4ec6207de842d0bb4c4c1f403703e6128 redis-node-3:7003
   slots:[10923-16383] (5461 slots) master
S: c1cf0f4ae661fc6eb3c02c095f36e54e8e5b6d88 redis-node-4:7004
   replicates ae8a4fe4ec6207de842d0bb4c4c1f403703e6128
S: fa933aef75352946a882a0c8d5757c9dcb23c509 redis-node-5:7005
   replicates 38c08c61b1c06815058ddc54ce2d02c097a62e9e
S: 0a14b8dc408fa9d7a69072a1f00f051b5a9aaf4a redis-node-6:7006
   replicates 209782c88f83acccbbc4264ba1cd49045fea89fc
```

此时系统提示：

```bash
Can I set the above configuration? (type 'yes' to accept):
```

#### 五、确认并完成集群构建

输入 yes 并回车，系统将执行以下核心操作：

- 向各节点发送 CLUSTER MEET 命令，触发集群握手协议
- 分配不同的配置纪元（config epoch），确立选举权基准
- 完成主从复制关系绑定
- 等待所有节点加入集群

等待片刻后，系统自动执行集群健康检查：

```bash
>>> Performing Cluster Check (using node redis-node-1:7001)
...
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```



#### 六、结果分析与状态解读

最终输出表明：

- 所有节点就槽位分配达成一致
- 全部 16384 个哈希槽均被覆盖
- 主从复制关系正确建立
- 集群处于稳定、可用状态

节点角色与 IP 映射（根据实际输出）：

- 主节点1：redis-node-1（172.18.0.6:7001）→ 管理槽 0-5460，从节点为 redis-node-5
- 主节点2：redis-node-2（172.18.0.6:7002）→ 管理槽 5461-10922，从节点为 redis-node-6
- 主节点3：redis-node-3（172.18.0.5:7003）→ 管理槽 10923-16383，从节点为 redis-node-4

所有从节点状态为 slave，slots: (0 slots)，正确指向各自的主节点。

#### 七、后续验证操作

为确保集群正常运行，可执行以下验证命令：

1. **连接集群客户端**

```bash
docker exec -it redis-node-1 redis-cli -c -p 7001
```

-c 参数表示启用集群模式，支持自动重定向。

2. **查看集群信息**

```bash
127.0.0.1:7001> cluster info
```

关注以下字段：

- cluster_state:ok
- cluster_slots_assigned:16384
- cluster_known_nodes:6
- cluster_size:3
3. **查看节点拓扑**

```bash
127.0.0.1:7001> cluster nodes
```

可清晰看到主从关系、运行状态与复制ID。

4. **测试数据读写**

```bash
127.0.0.1:7001> set test_key "Hello Redis Cluster"
-> Redirected to slot [12345] located at 172.18.0.5:7003
"OK"
```

验证数据能否正确路由并写入。

#### 八、总结

本次操作成功完成了 Redis 集群的搭建，关键点总结如下：

- 使用 --cluster-replicas 1 实现了高可用架构，每个主节点均有备份
- 系统自动完成哈希槽的均衡分配，确保数据分散
- 主从节点自动配对，无需手动配置 replication
- 最终状态显示所有槽位覆盖，集群健康

该集群现已具备故障转移、数据分片与高并发处理能力，可作为生产或测试环境的基础组件投入使用。



#### 九、附录：常见问题提示

- 若节点无法通信，排查 Docker 网络配置与防火墙策略
- 确保各节点的 cluster-enabled 配置已开启
- 若出现 slots not covered 错误，需检查节点状态与连接性
- 集群创建前，确保所有节点为空，清除残留 RDB/AOF 文件



## 参考资料

[Oracle RAC原理 - 知乎](https://zhuanlan.zhihu.com/p/110618860)

https://mcp.so/zh

[Java and Redis Tutorial: Getting Started with Jedis Client](https://redis.io/tutorials/develop/java/getting-started/)

[Redis Sentinel-深入浅出原理和实战 - 知乎](https://zhuanlan.zhihu.com/p/334983562)

