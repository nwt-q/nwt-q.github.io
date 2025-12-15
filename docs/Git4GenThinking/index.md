# 生成式思维与知识工作流学习笔记

## 课程学习地址

1. 课程打卡地址

https://m.datawhale.cn/activity/461

2. 大家可以提前看下课程的readme和讲义大纲提前了解

- 课程简介：https://www.gitlink.org.cn/Gitconomy/Git4GenThinking

- 讲义大纲：https://www.gitlink.org.cn/Gitconomy/Git4GenThinking/tree/main/GT-Workflow-Course-2025%2F02-Syllabus%2Fsyllabus.md

::: tip 说明
本次课程学习活动免费，如果有私聊提出收费，请警惕。
:::

## 课程目标

完成本课程，你将：

- 理解生成式AI工作方式与知识工作流思维
- 学会将知识任务拆解、结构化输入、迭代优化
- 能构建可复用工作流模板（Workflow Template）
- 具备封装Cherry Studio智能助手
- 产出一个可运行的 ModelScope MCP Agent

最终，你将完成一套属于自己的 **AI工作助手**。



## 课程安排

| **任务信息**                                                 | **天数** | **作业**                                | **打卡截止时间**       |
| ------------------------------------------------------------ | -------- | --------------------------------------- | ---------------------- |
| 12月15日正式开始                                             | 共14天   |                                         |                        |
| **第一周：思维重构与结构化** <br />目标：掌握结构化输入与生成式推理。 |          |                                         |                        |
| **Task01：从搜索到生成——定义你的知识工作流图谱**             | 2天      | `Workflow-Diagram.png` (工作流可视化图) | 截止时间 12月16日23:59 |
| **Task02：结构化输入——为AI准备清晰的“图纸”**                 | 2天      | `Structured-Note.md` (Obsidian 笔记包)  | 截止时间 12月18日23:59 |
| **Task03：生成与迭代——导演你的首次人机共创**                 | 2天      | `Prompt-Log.md` (迭代日志对比表)        | 截止时间 12月20日23:59 |
| **第二周: 资产沉淀与自动化**目标：从手动操作进阶为智能体开发。 |          |                                         |                        |
| **Task04：资产沉淀——构建工作流模板**                         | 2天      | `SOP-Template.md` (可复用模板)          | 截止时间 12月22日23:59 |
| **Task05：智能助手入门——让工作流半自动运行**                 | 2天      | `Agent-Config.json` (智能体配置文件)    | 截止时间 12月24日23:59 |
| **Task06：智能助手开发——构建可复用的知识工作助手**           | 4天      | `Final-Project-Package` (综合项目包)    | 截止时间 12月28日23:59 |
| DEMO DAY：优秀学习者分享作品                                 |          |                                         | 时间待定               |

## **角色分工**

本课程采用 **3-5人小组制**。AI 时代不再有独行侠，我们需要学会“人-人协作”与“人-机协作”。

- **Product Owner (队长)**: 统筹进度，负责最终 Pull Request 的提交与质量把控。
- **Prompt Architect (提示词架构师)**: 负责设计结构化 Prompt，优化生成效果。
- **Tool Specialist (技术专家)**: 负责 Cherry Studio 环境配置、MCP 调试与工具链打通。
- **Knowledge Curator (知识库管理员)**: 负责 Obsidian 笔记整理与资产归档。

## 技术栈

本课程采用 **“本地优先 + 开源协议”** 的工具栈，拒绝黑盒，拥抱开源：

- **知识库/编辑器**: [Obsidian](https://obsidian.md/)
- **AI 客户端 (驾驶舱)**: [Cherry Studio](https://www.cherry-ai.com/)
- **模型源 (发动机)**: [ModelScope (魔搭社区)](https://modelscope.cn/) - Qwen2.5 / DeepSeek
- **连接协议 (机械臂)**: [MCP (Model Context Protocol)](https://modelcontextprotocol.io/)

如果是零基础的可以看 [CherryStudio搭建本地AI知识库，三大痛点与进阶方案。_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1NMoFYoEsb/) 这个视频了解 **Cherry Studio** 

<iframe  style="width:100%; aspect-ratio:16/9; margin-top: 2em;"  src="//player.bilibili.com/player.html?bvid=BV1NMoFYoEsb&autoplay=0&loop=0"  frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowfullscreen> </iframe>

对MCP不了解的可以看这个视频了解 [MCP是啥？技术原理是什么？一个视频搞懂MCP的一切。Windows系统配置MCP，Cursor Cline使用MCP_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1AnQNYxEsy?vd_source=f02990bf5222d371585fba0726513017&spm_id_from=333.788.videopod.sections)


<iframe  style="width:100%; aspect-ratio:16/9; margin-top: 2em;"  src="//player.bilibili.com/player.html?bvid=BV1AnQNYxEsy&autoplay=0&loop=0"  frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowfullscreen> </iframe>

详细提交作业方式参考： [通过生成式思维构建MCP智能体 - Datawhale](https://www.datawhale.cn/activity/461/learn/267/5906)

