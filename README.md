# 📚 ELNB - 前端开发人员的综合笔记平台

<div align="center">
  
[![License](https://img.shields.io/github/license/nwt-q/nwt-q.github.io?style=flat-square&color=blue)](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-41b883?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5.22-41b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.6.10-6477D9?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

[🌐 在线访问](https://vitepress.yiov.top/) | [📖 文档](https://vitepress.yiov.top/getting-started) | [🚀 GitHub](https://github.com/nwt-q/nwt-q.github.io)

</div>

---

## 🌟 项目简介

**ELNB** (Endless Learning & Notes Base) 是一个基于 VitePress 构建的综合性技术笔记平台，旨在为前端开发人员提供一个系统化、结构化的知识分享和存储空间。

该项目不仅是一个简单的文档站点，更是一个完整的知识管理体系，涵盖了从基础前端技术到高级后端开发的广泛内容。

### ✨ 核心特性

- 📝 **Markdown 驱动** - 使用熟悉的 Markdown 语法快速编写和组织内容
- ⚡ **极速构建** - 基于 Vite 的闪电般快速开发体验和热更新
- 🎨 **现代化主题** - 精美的默认主题和可定制的 UI 组件
- 🌐 **多语言支持** - 支持中文、英文、日文、韩文等多语言文档
- 📊 **数学公式支持** - 内置 KaTeX 支持，完美渲染数学公式
- 🔄 **流程图支持** - 集成 Mermaid，轻松绘制专业流程图
- 🎯 **组件化** - 支持 Vue 组件嵌入，实现高度定制化

---

## 🛠️ 技术栈

### 核心框架
- **[VitePress](https://vitepress.dev/)** - 静态站点生成器
- **[Vue 3](https://cn.vuejs.org/)** - 渐进式 JavaScript 框架
- **[Vite](https://cn.vitejs.dev/)** - 下一代前端构建工具

### 插件与工具
- **[markdown-it-katex](https://github.com/GooglingXXX/markdown-it-katex)** - 数学公式渲染
- **[vitepress-plugin-mermaid](https://github.com/alefViggia/vitepress-plugin-mermaid)** - 流程图绘制
- **[vitepress-plugin-group-icons](https://github.com/alefViggia/vitepress-plugin-group-icons)** - 图标组支持
- **[markdown-it-task-checkbox](https://github.com/jgierer12/markdown-it-task-checkbox)** - 任务列表

### 开发工具
- **[pnpm](https://pnpm.io/)** - 快速、节省磁盘空间的包管理器
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript

---

## 📖 快速开始

### 前置要求

- Node.js 18+ 
- pnpm 8.6.10+

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/nwt-q/nwt-q.github.io.git
cd nwt-q.github.io

# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev
```

访问 `http://localhost:5173` 即可预览站点。

### 构建生产版本

```bash
# 构建站点
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

---

## 📚 文档内容

### 基础教程
- [快速上手](https://vitepress.yiov.top/getting-started) - 从零开始搭建 VitePress 站点
- [配置说明](https://vitepress.yiov.top/configuration) - 详细配置指南
- [Markdown 语法](https://vitepress.yiov.top/markdown) - Markdown 高级用法
- [组件使用](https://vitepress.yiov.top/components) - Vue 组件集成

### 技术笔记
- **前端开发**
  - [React](https://vitepress.yiov.top/react/) - React 技术栈笔记
  - [Vue](https://vitepress.yiov.top/) - Vue 生态相关
  - [JavaScript](https://vitepress.yiov.top/) - JS 深入理解

- **后端开发**
  - [Java](https://vitepress.yiov.top/Java/) - Java 开发笔记
  - [Redis](https://vitepress.yiov.top/Redis/) - 缓存技术
  - [PostgreSQL](https://vitepress.yiov.top/PostgreSQL/) - 数据库管理
  - [RabbitMQ](https://vitepress.yiov.top/RabbitMQ/) - 消息队列

- **DevOps**
  - [Docker](https://vitepress.yiov.top/docker/) - 容器化技术
  - [Kubernetes](https://vitepress.yiov.top/kubernetes/) - 容器编排
  - [Nginx](https://vitepress.yiov.top/nginx/) - 服务器配置

- **计算机基础**
  - [计算机网络](https://vitepress.yiov.top/Internet/) - 网络知识
  - [Linux](https://vitepress.yiov.top/Linux/) - Linux 系统
  - [计算机组成原理](https://vitepress.yiov.top/coa/) - 计算机原理

- **其他技术**
  - [Git](https://vitepress.yiov.top/Git/) - 版本控制
  - [Python](https://vitepress.yiov.top/Python/) - Python 脚本
  - [Blander](https://vitepress.yiov.top/blander/) - 3D 建模

---

## 🎨 主题定制

项目采用了现代化的主题设计，包含以下特色组件：

- 🎨 **自定义样式** - 精美的代码高亮和块样式
- 🖱️ **交互组件** - 鼠标跟随、粒子效果等
- 📱 **响应式设计** - 完美适配桌面和移动端
- 🌙 **深色模式** - 默认深色主题，保护视力

---

## 🌍 多语言支持

项目支持多语言文档，当前已支持：

- 🇨🇳 [简体中文](https://vitepress.yiov.top/) (默认)
- 🇺🇸 [English](https://vitepress.yiov.top/en/)
- 🇫🇷 [Français](https://vitepress.yiov.top/fr/)

---

## 🤝 贡献指南

欢迎任何形式的贡献！如果您发现内容有误或有新的学习笔记想要分享，请按照以下步骤操作：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 贡献类型

- 🐛 Bug 修复
- ✨ 新功能
- 📝 文档改进
- 🎨 主题优化
- 🌐 多语言翻译

---

## 📊 站点统计

- 📄 **文档数量**: 100+ 篇技术文章
- 📚 **技术分类**: 15+ 个技术领域
- 🌐 **访问量**: 持续增长中
- 🤝 **贡献者**: 欢迎加入

---

## 📬 联系方式

- 📧 邮箱: [contact@vitepress.yiov.top](mailto:contact@vitepress.yiov.top)
- 💬 社区: [Discord](https://chat.vitejs.dev/)
- 🐦 Twitter: [@vitepress](https://twitter.com/vitepress)

---

## 📄 许可证

本项目采用 [MIT 许可证](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE) - 详情请参阅 LICENSE 文件。

---

## 🙏 致谢

- [VitePress](https://vitepress.dev/) 团队提供的优秀工具
- 所有贡献者和用户的持续支持
- 开源社区的宝贵资源

---

<div align="center">
  
⭐️ 如果这个项目对您有帮助，欢迎在 GitHub 上给它点个 Star！

[![Star History Chart](https://api.star-history.com/svg?repos=nwt-q/nwt-q.github.io&type=Date)](https://star-history.com/#nwt-q/nwt-q.github.io&Date)

</div>

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/nwt-q">nwt-q</a> and the community
</p>
