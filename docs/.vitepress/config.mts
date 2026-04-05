import { defineConfig } from 'vitepress'

import { devDependencies } from '../../package.json'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import markdownItKatex from 'markdown-it-katex'


import { usePosts } from './theme/untils/permalink';
const { rewrites } = await usePosts();

const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
]

export default defineConfig({
  lang: 'zh-CN',
  title: "ENLB",
  description: "我的vitpress文档教程",
  rewrites,

  // #region fav
    head: [
      ['link', { rel: 'icon', href: '/logo.png' }],
    // --- Google Analytics GA4 ---
    // [
    //   'script',
    //   { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX' }
    // ],
    // [
    //   'script',
    //   {},
    //   `
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'G-XXXXXXX');
    //   `
    // ],

    // // --- Baidu Tongji ---
    // [
    //   'script',
    //   {},
    //   `
    //   var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_TRACKING_ID";
    //     var s = document.getElementsByTagName("script")[0]; 
    //     s.parentNode.insertBefore(hm, s);
    //   })();
    //   `
    // ]
  ],
  // #endregion fav

  base: '/', //网站部署到github的vitepress这个仓库里

  // cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: 'dark',

  //多语言
  locales: {
    root: {
      label: '简体中文',
      lang: 'Zh_CN',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
    fr: {
      label: 'French',
      lang: 'fr',
      link: '/fr/',
    }
  },

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // toc显示一级标题
    toc: { level: [1, 2, 3] },

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    config: (md) => {
      // 组件插入h1标题下
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      },

        // 代码组中添加图片
        md.use((md) => {
          const defaultRender = md.render
          md.render = (...args) => {
            const [content, env] = args
            const currentLang = env?.localeIndex || 'root'
            const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'  // 判断是否是首页

            if (isHomePage) {
              return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
            }
            // 调用原始渲染
            let defaultContent = defaultRender.apply(md, args)
            // 替换内容
            if (currentLang === 'root') {
              defaultContent = defaultContent.replace(/NOTE/g, '提醒')
                .replace(/TIP/g, '建议')
                .replace(/IMPORTANT/g, '重要')
                .replace(/WARNING/g, '警告')
                .replace(/CAUTION/g, '注意')
            } else if (currentLang === 'ko') {
              // 韩文替换
              defaultContent = defaultContent.replace(/NOTE/g, '알림')
                .replace(/TIP/g, '팁')
                .replace(/IMPORTANT/g, '중요')
                .replace(/WARNING/g, '경고')
                .replace(/CAUTION/g, '주의')
            }
            // 返回渲染的内容
            return defaultContent
          }

          // 获取原始的 fence 渲染规则
          const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content);
          
          // 重写 fence 渲染规则
          md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const info = token.info.trim();

            // 判断是否为 md:img 类型的代码块
            if (info.includes('md:img')) {
              // 只渲染图片，不再渲染为代码块
              return `<div class="rendered-md">${md.render(token.content)}</div>`;
            }

            // 其他代码块按默认规则渲染（如 java, js 等）
            return defaultFence(tokens, idx, options, env, self);
          };
        })

      md.use(groupIconMdPlugin) //代码组图标
      md.use(markdownItTaskCheckbox) //todo
      md.use(MermaidMarkdown);
      md.use(markdownItKatex);
    }
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'), //css图标
          js: 'logos:javascript', //js图标
        },
      }),
      [MermaidPlugin()]
    ] as any,
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //主题配置
  themeConfig: {
    //左上角logo
    logo: '/logo.png',
    //logo: 'https://vitejs.cn/vite3-cn/logo-with-shadow.png', //远程引用
    //siteTitle: false, //标题隐藏

    //设置站点标题 会覆盖title
    //siteTitle: 'Hello World',

    //编辑本页
    editLink: {
      pattern: 'https://github.com/nwt-q/nwt-q.github.io/tree/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },

    //导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '导航网站', link: '/nav/mao' },
      {
        text: '🍉指南',
        items: [
          {
            // 分组标题1
            text: '介绍',
            items: [
              { text: '前言', link: '/preface' },
            ],
          },
          {
            // 分组标题2
            text: '基础设置',
            items: [
              { text: '快速上手', link: '/getting-started' },
              { text: '配置', link: '/configuration' },
              { text: '页面', link: '/page' },
              { text: 'Frontmatter', link: '/frontmatter' },
            ],
          },
          {
            // 分组标题3
            text: '进阶玩法',
            items: [
              { text: 'Markdown', link: '/markdown' },
              { text: '团队', link: '/team' },
              { text: '多语言', link: '/multi-language' },
              { text: 'DocSearch', link: '/docsearch' },
              { text: '静态部署', link: '/assets' },
              { text: '样式美化', link: '/style' },
              { text: '组件', link: '/components' },
              { text: '布局插槽', link: '/layout' },
              { text: '插件', link: '/plugin' },
              { text: '更新及卸载', link: '/update' },
              { text: '搭建导航', link: '/nav/' },
              { text: '永久链接', link: '/permalink/' },
            ],
          },
        ],
      },
      { text: '更新日志', link: '/changelog' },
    ],


    //侧边栏
    sidebar: [
      // 指南
      {
        text: '🍉指南',
        collapsed: true,
        items: [
          {
            //分组标题1
            text: '介绍',
            collapsed: true,
            items: [
              { text: '前言', link: '/preface' },
            ],
          },
          {
            //分组标题2
            text: '基础配置',
            collapsed: true,
            items: [
              { text: '快速上手', link: '/getting-started' },
              { text: '配置', link: '/configuration' },
              { text: '页面', link: '/page' },
              { text: 'Frontmatter', link: '/frontmatter' },
            ],
          },
          {
            //分组标题3
            text: '进阶玩法',
            collapsed: true,
            items: [
              { text: 'Markdown', link: '/markdown' },
              { text: '团队', link: '/team' },
              { text: '多语言', link: '/multi-language' },
              { text: 'DocSearch', link: '/docsearch' },
              { text: '静态部署', link: '/assets' },
              { text: '样式美化', link: '/style' },
              { text: '组件', link: '/components' },
              { text: '布局插槽', link: '/layout' },
              { text: '插件', link: '/plugin' },
              { text: '更新及卸载', link: '/update' },
              { text: '搭建导航', link: '/nav/' },
              { text: '永久链接', link: '/permalink/' },
            ],
          },
          {
            //分组标题3
            text: '其他站点',
            collapsed: true,
            items: [
              { text: 'VuePress', link: 'https://vuepress.yiov.top/' },
              { text: '劝学录教程', link: 'https://yiov.top/' },
              { text: '个人主页', link: 'https://yingyayi.com/' },
            ],
          },
        ]
      },
      // GenThinking 笔记
      {
          text: 'GenThinking 笔记',
          collapsed: true,
          items: [
            { text: '快速开始', link: '/Git4GenThinking/index' },
          ]
      },
      // 数学笔记
      {
        text: '数学笔记',
        collapsed: true,
        items: [
          {
             text: '高等数学', 
              collapsed: false,
             items: [
              { text: '小结', link: '/math/AdvancedMathematics/AdvancedMathematics' },
               { text: '极限与连续', link: '/math/AdvancedMathematics/Limit' },
               { text: '导数', link: '/math/AdvancedMathematics/Derivatives' },
             ]
          },
          { text: '线性代数', link: '/math/LinearAlgebra/LinearAlgebra' },
        ]
      },
      // 组件
      {
        text: '组件',
        collapsed: false,
        items: [
          {
            text: 'Redis笔记',
            collapsed: true,
            items: [
              { text: '主从模式原理与实操', link: '/Redis/MasterSlave' },
            ]
          },
           {
            text: 'Kubernetes笔记',
            collapsed: true,
            items: [
              { text: 'Kubernetes基础概念', link: '/Kubernetes/index' },
            ]
          },
          {
            text: 'RabbitMQ笔记',
            collapsed: true,
            items: [
              { text: 'RabitMQ的安装', link: '/RabbitMQ/index' },
            ]
          },
          {
            text: 'PostgreSQL笔记',
            collapsed: true,
            items: [
              { text: 'PostgreSQL介绍', link: '/PostgreSQL/index' },
            ]
          },
          {
            text: 'Docker笔记',
            collapsed: true,
            items: [
              { text: 'docker的安装与使用', link: '/docker/index' },
              { text: 'Docker数据卷访问失败', link: '/docker/FindVolumes' },
            ]
          },
          {
            text: 'Git笔记',
            collapsed: true,
            items: [
              { text: '内网仓库间的互相拷贝', link: '/Git/GitForLocal' },
              { text: '代码提交规范组件', link: '/Git/gitcz.md' },
            ]
          },
          {
            text: 'Nginx笔记',
            collapsed: true,
            items: [
              { text: 'Nginx反向代理', link: '/nginx/ReverseProxy' },
            ]
          },
        ]
      },
      // 微信笔记
      {
        text: '微信笔记',
        collapsed: false,
        items: [
          { text: '微信转码接口文档', link: '/wchat/wxcode' },
          { text: '微信短链接口文档', link: '/wchat/miniprogramlink' }
        ]
      },
      // Java笔记
      {
        text: 'Java报错解决方案',
        collapsed: false,
        items: [
          { text: 'Java读取配置文件中的信息', link: '/Java/configuration' },
          { text: 'Java中发送对应的Http请求', link: '/Java/HttpClient' },
          { text: 'Jankins', link: '/Java/JenKins' },
         ]
      },
      // 计算机网络笔记
      {
        text: '计算机网络解决方案',
        collapsed: false,
        items: [
          { text: 'Linux如何登录认证网络', link: '/Internet/CampusNetWork' },
          
         ]
      },
      // 论文笔记
      {
        text: '论文笔记',
        collapsed: false,
        items: [
          { text: '论文写作常见格式', link: '/thesis/index' },
         ]
      },
      // Linux 笔记
      {
        text: 'Linux笔记',
        collapsed: false,
        items: [
          { text: 'wsl本地子系统', link: '/Linux/wsluse' },
          { text: 'Linux文件储存系统', link: '/Linux/fdisk' },
         ]
      },
      // blander
      {
        text: 'Blander笔记',
        collapsed: false,
        items: [
          { text: 'blander使用指南', link: '/blander/index' }
         ]
      },
      //大模型训练笔记
      {
        text: '大模型训练笔记',
        collapsed: false,
        items: [
          { text: '模型压缩', link: '/ModelTraning/ModelAER' }
         ]
      },
      // 计算机组成原理笔记
      {
        text: '计算机组成原理笔记',
        collapsed: false,
        items: [
          { text: '计算机组成原理概述', link: '/coa/index' },
          { text: '进制概述', link: '/coa/NumeralSystem' }
         ]
      },
    ],
    //Algolia搜索
    search: {
      provider: 'algolia',
      options: {
        appId: 'JVJEBWQD37',
        apiKey: '1b6a44deb590789b3b1bb02d6bd5db1b',
        indexName: 'doc',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },



    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nwt-q/nwt-q.github.io' },
      { icon: 'twitter', link: 'https://twitter.com/' },
      { icon: 'discord', link: 'https://chat.vitejs.dev/' },
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: 'https://weixin.qq.com/',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat'
      }
    ],

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',




    //页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">京****号</a>`,
    },


    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',


    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },


    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

  },



})