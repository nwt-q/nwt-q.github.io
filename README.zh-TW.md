# 📚 ELNB - 綜合開發者知識庫

<div align="center">
  
[![License](https://img.shields.io/github/license/nwt-q/nwt-q.github.io?style=flat-square&color=blue)](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-41b883?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5.22-41b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.6.10-6477D9?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

[🌐 線上預覽](https://vitepress.yiov.top/) | [📖 文件](https://vitepress.yiov.top/getting-started) | [🚀 GitHub](https://github.com/nwt-q/nwt-q.github.io)

</div>

---

## 🌟 專案簡介

**ELNB** (Endless Learning & Notes Base) 是一個基於 VitePress 構建的綜合性技術知識庫平台，旨在為前端開發人員提供一個系統化、結構化的知識分享與儲存空間。

這個專案不僅是一個簡單的文件網站，更是一個完整的知識管理系統，涵蓋從基礎前端技術到高級後端開發的廣泛內容。

### ✨ 核心功能

- 📝 **Markdown 驅動** - 使用熟悉的 Markdown 語法快速建立和組織內容
- ⚡ **超高速構建** - 即時伺服器啟動、超高速熱更新，並利用 Vite 生態系外掛
- 🎨 **現代化主題** - 精美的預設主題和可自訂的 UI 元件
- 🌐 **多語言支援** - 支援多語言文件（中文、英文、日文、韓文等）
- 📊 **數學公式支援** - 內建 KaTeX 支援，完美渲染數學公式
- 🔄 **流程圖支援** - 整合 Mermaid，輕鬆繪製專業流程圖
- 🎯 **元件化** - 支援 Vue 元件嵌入，實現高度客製化

---

## 🛠️ 技術棧

### 核心框架
- **[VitePress](https://vitepress.dev/)** - 靜態網站生成器
- **[Vue 3](https://vuejs.org/)** - 渐進式 JavaScript 框架
- **[Vite](https://vitejs.dev/)** - 下一代前端構建工具

### 外掛與工具
- **[markdown-it-katex](https://github.com/GooglingXXX/markdown-it-katex)** - 數學公式渲染
- **[vitepress-plugin-mermaid](https://github.com/alefViggia/vitepress-plugin-mermaid)** - 流程圖繪製
- **[vitepress-plugin-group-icons](https://github.com/alefViggia/vitepress-plugin-group-icons)** - 圖示群組支援
- **[markdown-it-task-checkbox](https://github.com/jgierer12/markdown-it-task-checkbox)** - 任務清單

### 開發工具
- **[pnpm](https://pnpm.io/)** - 快速、節省磁碟空間的套件管理器
- **[TypeScript](https://www.typescriptlang.org/)** - 類型安全的 JavaScript

---

## 📖 快速開始

### 前置要求

- Node.js 18+ 
- pnpm 8.6.10+

### 安裝步驟

```bash
# 複製倉庫
git clone https://github.com/nwt-q/nwt-q.github.io.git
cd nwt-q.github.io

# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm docs:dev
```

訪問 `http://localhost:5173` 即可預覽網站。

### 建置生產版本

```bash
# 建置網站
pnpm docs:build

# 預覽建置結果
pnpm docs:preview
```

---

## 📚 文件內容

### 基礎教程
- [快速上手](https://vitepress.yiov.top/getting-started) - 從零開始搭建 VitePress 網站
- [配置說明](https://vitepress.yiov.top/configuration) - 詳細配置指南
- [Markdown 語法](https://vitepress.yiov.top/markdown) - Markdown 進階用法
- [元件使用](https://vitepress.yiov.top/components) - Vue 元件整合

### 技術筆記
- **前端開發**
  - [React](https://vitepress.yiov.top/react/) - React 技術棧筆記
  - [Vue](https://vitepress.yiov.top/) - Vue 生態相關
  - [JavaScript](https://vitepress.yiov.top/) - JS 深入理解

- **後端開發**
  - [Java](https://vitepress.yiov.top/Java/) - Java 開發筆記
  - [Redis](https://vitepress.yiov.top/Redis/) - 緩存技術
  - [PostgreSQL](https://vitepress.yiov.top/PostgreSQL/) - 資料庫管理
  - [RabbitMQ](https://vitepress.yiov.top/RabbitMQ/) - 消息佇列

- **DevOps**
  - [Docker](https://vitepress.yiov.top/docker/) - 容器化技術
  - [Kubernetes](https://vitepress.yiov.top/kubernetes/) - 容器編排
  - [Nginx](https://vitepress.yiov.top/nginx/) - 伺服器配置

- **計算機基礎**
  - [計算機網路](https://vitepress.yiov.top/Internet/) - 網路知識
  - [Linux](https://vitepress.yiov.top/Linux/) - Linux 系統
  - [計算機組成原理](https://vitepress.yiov.top/coa/) - 計算機原理

- **其他技術**
  - [Git](https://vitepress.yiov.top/Git/) - 版本控制
  - [Python](https://vitepress.yiov.top/Python/) - Python 腳本
  - [Blander](https://vitepress.yiov.top/blander/) - 3D 建模

---

## 🎨 主題客製化

本專案採用了現代化的主題設計，包含以下特色元件：

- 🎨 **自訂樣式** - 精美的程式碼高亮和區塊樣式
- 🖱️ **互動元件** - 滑鼠跟隨、粒子效果等
- 📱 **響應式設計** - 完美適配桌面和行動端
- 🌙 **深色模式** - 預設深色主題，保護視力

---

## 🌍 多語言支援

本專案支援多語言文件，當前已支援：

- 🇨🇳 [簡體中文](https://vitepress.yiov.top/) (預設)
- 🇺🇸 [English](https://vitepress.yiov.top/en/)
- 🇫🇷 [Français](https://vitepress.yiov.top/fr/)

---

## 🤝 貢獻指南

歡迎任何形式的貢獻！如果您發現內容有誤或有新的學習筆記想要分享，請按照以下步驟操作：

1. Fork 本倉庫
2. 建立您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 貢獻類型

- 🐛 Bug 修復
- ✨ 新功能
- 📝 文件改進
- 🎨 主題優化
- 🌐 多語言翻譯

---

## 📊 網站統計

- 📄 **文件數量**: 100+ 篇技術文章
- 📚 **技術分類**: 15+ 個技術領域
- 🌐 **訪問量**: 持續成長中
- 🤝 **貢獻者**: 歡迎加入

---

## 📬 聯絡方式

- 📧 郵箱: [contact@vitepress.yiov.top](mailto:contact@vitepress.yiov.top)
- 💬 社群: [Discord](https://chat.vitejs.dev/)
- 🐦 Twitter: [@vitepress](https://twitter.com/vitepress)

---

## 📄 授權條款

本專案採用 [MIT 授權條款](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE) - 詳情請參閱 LICENSE 檔案。

---

## 🙏 致謝

- [VitePress](https://vitepress.dev/) 團隊提供的優秀工具
- 所有貢獻者和使用者的持續支援
- 開源社群的寶貴資源

---

<div align="center">
  
⭐️ 如果這個專案對您有幫助，歡迎在 GitHub 上給它點個 Star！

[![Star History Chart](https://api.star-history.com/svg?repos=nwt-q/nwt-q.github.io&type=Date)](https://star-history.com/#nwt-q/nwt-q.github.io&Date)

</div>

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/nwt-q">nwt-q</a> and the community
</p>
