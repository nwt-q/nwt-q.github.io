---
title: 存量API转换MCP
tags: [nacos,mcp]
categories: [中间件]
date: 2026-3-28
description:  存量API转换MCP
articleGPT:  存量API转换MCP
references:
  - title: naocs
    url: https://nacos.io/docs/latest/manual/user/ai/api-to-mcp/
---



# 存量API转换MCP

最近在思考如何将已经编写好的api服务转成mcp服务给ai调用，然后调研后发现 [Higress]([MCP Server 快速开始（Docker 版） | Higress](https://higress.cn/docs/ai/mcp-quick-start_docker/))



## Higress AI 网关介绍

Higress AI 网关提供 MCP Server 统一托管能力，可以帮助 AI Agent 快速对接各类数据源。通过 MCP Server，AI Agent 可以方便地访问数据库、REST API 等外部服务，无需关心具体的连接细节。其中，数据库对接能力是网关内置的能力；而对于 REST API，任何外部 REST API 都可以通过简单的配置转换成 MCP Server。本文将以 一个简单的 REST API 为例，介绍通过 Higress 将一个 REST API 转化为 MCP Server 的配置流程。



然后根据官方提供的文档进行实践（最佳实践方案）*



## 大致步骤

1. 先部署nacos
2. 在nacos中创建mcp服务，该服务是利用现有的api服务创建即http 转mcp
3. 再部署higress
4. 在higress中配置nacos再配置相关dns服务
5. 在插件中查找mcp服务，配置mcp插件
6. 使用Cherry Studio调用相关服务





***最佳实践方案**：查找网上文档去解决多歧义并且可能存在错误， 去寻找相关视频去学习，不完善与我需求不符，所以官方文档是学习这个网关的最佳在本次实验中


##   参考资料

[存量API转换MCP手册 | Nacos 官网](https://nacos.io/docs/latest/manual/user/ai/api-to-mcp/)

[MCP Server 快速开始（Docker 版） | Higress](https://higress.cn/docs/ai/mcp-quick-start_docker/)

[诞生才一周年，MCP凉了-36氪](https://www.36kr.com/p/3576656973577345)

[MCP已死，CLI当立！Perplexity首先放弃使用MCP，全网赞成 - 知乎](https://zhuanlan.zhihu.com/p/2015841871449040128)

[什么是 Skill？深入理解 AI 系统中的 Skill 概念 - 知乎](https://zhuanlan.zhihu.com/p/2000612266601641650)

[一文读懂 Harness Engineering：AI 时代软件工程的全新范式 - 知乎](https://zhuanlan.zhihu.com/p/2021938778906862975)

[免费API接口工具大全_聚合数据 - 天聚地合](https://www.juhe.cn/docs/o1)

