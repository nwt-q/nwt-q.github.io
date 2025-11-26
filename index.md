---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

customCss: |
  :root {
    --vp-c-primary: #3b82f6; /* 主色：蓝色（专业、冷静） */
    --vp-c-primary-light: #60a5fa;
    --vp-c-primary-lighter: #93c5fd;
    --vp-c-text-1: #1e293b; /* 正文深色 */
    --vp-c-text-2: #475569; /* 次要文本色 */
    --vp-c-bg: #f8fafc; /* 背景色 */
    --vp-c-card: #ffffff; /* 卡片背景 */
  }

  /* 优化 Hero 区域间距和阴影 */
  .VPHomeHero {
    padding: 4rem 0 6rem;
    background: linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%);
    border-radius: 0 0 2rem 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }

  /* 卡片悬停效果 */
  .VPHomeFeatures .VPFeature {
    transition: all 0.3s ease;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
  }
  .VPHomeFeatures .VPFeature:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.08);
    border-color: var(--vp-c-primary-lighter);
  }

  /* 按钮样式优化 */
  .VPButton.brand {
    border-radius: 0.75rem;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
  }
  .VPButton.alt {
    border-radius: 0.75rem;
    padding: 0.75rem 1.5rem;
    border: 1px solid #e2e8f0;
  }

hero:
  name: "考研数学二笔记"
  text: "结构化考点 · 高效复习指南"
  tagline: 覆盖高数+线代核心考点 | 公式+例题+易错点汇总 | 适配最新考纲
  image:
    src: /pubilc/ELNB.png
    alt: 考研数学二笔记
  actions:
    - theme: brand
      text: 开始学习 →
      link: /markdown-examples.md # 链接到第一个考点（需对应你的目录结构）
    - theme: alt
      text: 查看目录
      link: /markdown-examples.md  # 可新建目录页，或直接链接到侧边栏首页
    - theme: alt
      text: 下载PDF版
      link: /markdown-examples.md # 可选：添加PDF下载入口

features:
  - title: 📚 考点全覆盖
    details: 严格按照最新考研数学二考纲梳理，高数（函数/导数/积分等）+ 线代（矩阵/方程组等）核心模块无遗漏，拒绝冗余内容。
    icon: 📚
  - title: 📝 结构化梳理
    details: 每个考点按「定义→性质→公式→例题→易错点」分层呈现，逻辑清晰，方便构建知识体系，适配背诵和刷题场景。
    icon: 📝
  - title: ✨ 重点可视化
    details: 高频考点标红、核心公式高亮、易错点单独标注，快速抓住复习重点，节省筛选时间。
  - title: 📱 响应式适配
    details: 支持电脑、平板、手机多设备访问，通勤、自习室随时查阅，碎片化时间高效利用。
  - title: 🧮 例题+练习
    details: 每个知识点配套经典例题和真题改编练习，学练结合，强化理解记忆。
  - title: 🔄 持续更新
    details: 同步考纲变化和命题趋势，定期补充新增考点、解题技巧，陪伴全程复习。

footer:
  message: "📅 2025 考研复习专用 | 基于 VitePress 构建"
  copyright: "© All Rights Reserved | 专注考研数学二高效复习"
---