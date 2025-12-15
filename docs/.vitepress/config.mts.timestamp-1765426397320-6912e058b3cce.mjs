// docs/.vitepress/config.mts
import { defineConfig } from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/vitepress@1.6.4_@algolia+client-search@5.29.0_@types+node@24.7.1_less@4.4.2_sass@1.93.2_search-insights@2.17.3/node_modules/vitepress/dist/node/index.js";
import markdownItTaskCheckbox from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/markdown-it-task-checkbox@1.0.6/node_modules/markdown-it-task-checkbox/index.js";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/vitepress-plugin-group-icons@1.6.3_markdown-it@14.1.0_vite@6.3.5/node_modules/vitepress-plugin-group-icons/dist/index.js";
import { MermaidMarkdown, MermaidPlugin } from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/vitepress-plugin-mermaid@2.0.17_mermaid@11.12.0_vitepress@1.6.4/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";
import markdownItKatex from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/markdown-it-katex@2.0.3/node_modules/markdown-it-katex/index.js";

// docs/.vitepress/theme/untils/permalink.ts
import matter from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import fg from "file:///D:/CodeHub/Local/blog_front/node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/index.js";
import fs from "fs/promises";
import path from "path";
var generateString = (length) => {
  const charset = "0123456789abcdef";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCode += charset[randomIndex];
  }
  return randomCode;
};
var extractTitleFromContent = (content) => {
  const h1Regex = /^\s*#\s+(.+?)\s*$/m;
  const match = content.match(h1Regex);
  return match ? match[1].trim() : "";
};
var usePosts = async ({
  srcDir = "permalink",
  // 默认源目录为'permalink'
  baseDir = "docs"
  // 默认基础目录为'docs'
} = {}) => {
  const rewrites2 = {};
  try {
    const paths = (await fg(`${baseDir}/${srcDir}/**/*.md`, {
      ignore: ["**/index.md"]
      // 忽略所有index.md文件
    })).sort();
    const postsMap = {};
    await Promise.all(
      paths.map(async (postPath) => {
        const { data, content } = matter.read(postPath);
        if (!data.title) {
          const extractedTitle = extractTitleFromContent(content);
          if (extractedTitle) {
            data.title = extractedTitle;
          }
        }
        if (!data.permalink) {
          data.permalink = `/${srcDir}/${generateString(6)}`;
        }
        postsMap[postPath] = {
          permalink: data.permalink,
          title: data.title || path.basename(postPath, ".md")
        };
      })
    );
    await Promise.all(
      paths.map(async (postPath, index) => {
        const { data, content } = matter.read(postPath);
        const prevPost = index > 0 ? postsMap[paths[index - 1]] : null;
        const nextPost = index < paths.length - 1 ? postsMap[paths[index + 1]] : null;
        if (prevPost && !data.prev) {
          data.prev = {
            text: prevPost.title,
            link: prevPost.permalink
          };
        }
        if (nextPost && !data.next) {
          data.next = {
            text: nextPost.title,
            link: nextPost.permalink
          };
        }
        await fs.writeFile(
          postPath,
          matter.stringify(content, data),
          "utf8"
        );
        const relativePath = postPath.replace(`${baseDir}/`, "");
        rewrites2[relativePath.replace(/[+()]/g, "\\$&")] = `${data.permalink}.md`.slice(1).replace(/[+()]/g, "\\$&");
      })
    );
    return { rewrites: rewrites2 };
  } catch (e) {
    console.error(e);
    return { rewrites: rewrites2 };
  }
};

// docs/.vitepress/config.mts
var __vite_injected_original_import_meta_url = "file:///D:/CodeHub/Local/blog_front/docs/.vitepress/config.mts";
var { rewrites } = await usePosts();
var customElements = [
  "math",
  "maction",
  "maligngroup",
  "malignmark",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mi",
  "mlongdiv",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mscarries",
  "mscarry",
  "mscarries",
  "msgroup",
  "mstack",
  "mlongdiv",
  "msline",
  "mstack",
  "mspace",
  "msqrt",
  "msrow",
  "mstack",
  "mstack",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
  "math",
  "mi",
  "mn",
  "mo",
  "ms",
  "mspace",
  "mtext",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "msqrt",
  "mstyle",
  "mmultiscripts",
  "mover",
  "mprescripts",
  "msub",
  "msubsup",
  "msup",
  "munder",
  "munderover",
  "none",
  "maligngroup",
  "malignmark",
  "mtable",
  "mtd",
  "mtr",
  "mlongdiv",
  "mscarries",
  "mscarry",
  "msgroup",
  "msline",
  "msrow",
  "mstack",
  "maction",
  "semantics",
  "annotation",
  "annotation-xml"
];
var config_default = defineConfig({
  lang: "zh-CN",
  title: "ENLB",
  description: "\u6211\u7684vitpress\u6587\u6863\u6559\u7A0B",
  rewrites,
  // #region fav
  head: [
    ["link", { rel: "icon", href: "/logo.png" }]
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
  base: "/",
  //网站部署到github的vitepress这个仓库里
  // cleanUrls:true, //开启纯净链接无html
  //启用深色模式
  appearance: "dark",
  //多语言
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587",
      lang: "Zh_CN"
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en/"
    },
    fr: {
      label: "French",
      lang: "fr",
      link: "/fr/"
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
          return code.replace(/\[\!\!code/g, "[!code");
        }
      }
    ],
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      }, // 代码组中添加图片
      md.use((md2) => {
        const defaultRender = md2.render;
        md2.render = (...args) => {
          const [content, env] = args;
          const currentLang = env?.localeIndex || "root";
          const isHomePage = env?.path === "/" || env?.relativePath === "index.md";
          if (isHomePage) {
            return defaultRender.apply(md2, args);
          }
          let defaultContent = defaultRender.apply(md2, args);
          if (currentLang === "root") {
            defaultContent = defaultContent.replace(/NOTE/g, "\u63D0\u9192").replace(/TIP/g, "\u5EFA\u8BAE").replace(/IMPORTANT/g, "\u91CD\u8981").replace(/WARNING/g, "\u8B66\u544A").replace(/CAUTION/g, "\u6CE8\u610F");
          } else if (currentLang === "ko") {
            defaultContent = defaultContent.replace(/NOTE/g, "\uC54C\uB9BC").replace(/TIP/g, "\uD301").replace(/IMPORTANT/g, "\uC911\uC694").replace(/WARNING/g, "\uACBD\uACE0").replace(/CAUTION/g, "\uC8FC\uC758");
          }
          return defaultContent;
        };
        const defaultFence = md2.renderer.rules.fence?.bind(md2.renderer.rules) ?? ((...args) => args[0][args[1]].content);
        md2.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();
          if (info.includes("md:img")) {
            return `<div class="rendered-md">${md2.render(token.content)}</div>`;
          }
          return defaultFence(tokens, idx, options, env, self);
        };
      });
      md.use(groupIconMdPlugin);
      md.use(markdownItTaskCheckbox);
      md.use(MermaidMarkdown);
      md.use(markdownItKatex);
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(__vite_injected_original_import_meta_url, "../public/svg/typescript.svg"),
          //本地ts图标导入
          md: localIconLoader(__vite_injected_original_import_meta_url, "../public/svg/md.svg"),
          //markdown图标
          css: localIconLoader(__vite_injected_original_import_meta_url, "../public/svg/css.svg"),
          //css图标
          js: "logos:javascript"
          //js图标
        }
      }),
      [MermaidPlugin()]
    ],
    optimizeDeps: {
      include: ["mermaid"]
    },
    ssr: {
      noExternal: ["mermaid"]
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  },
  lastUpdated: true,
  //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释
  //主题配置
  themeConfig: {
    //左上角logo
    logo: "/logo.png",
    //logo: 'https://vitejs.cn/vite3-cn/logo-with-shadow.png', //远程引用
    //siteTitle: false, //标题隐藏
    //设置站点标题 会覆盖title
    //siteTitle: 'Hello World',
    //编辑本页
    editLink: {
      pattern: "https://github.com/nwt-q/nwt-q.github.io/tree/main/docs/:path",
      // 改成自己的仓库
      text: "\u5728GitHub\u7F16\u8F91\u672C\u9875"
    },
    //上次更新时间
    lastUpdated: {
      text: "\u4E0A\u6B21\u66F4\u65B0\u65F6\u95F4",
      formatOptions: {
        dateStyle: "short",
        // 可选值full、long、medium、short
        timeStyle: "medium"
        // 可选值full、long、medium、short
      }
    },
    //导航栏
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u5BFC\u822A\u7F51\u7AD9", link: "/nav/mao" },
      {
        text: "\u{1F349}\u6307\u5357",
        items: [
          {
            // 分组标题1
            text: "\u4ECB\u7ECD",
            items: [
              { text: "\u524D\u8A00", link: "/preface" }
            ]
          },
          {
            // 分组标题2
            text: "\u57FA\u7840\u8BBE\u7F6E",
            items: [
              { text: "\u5FEB\u901F\u4E0A\u624B", link: "/getting-started" },
              { text: "\u914D\u7F6E", link: "/configuration" },
              { text: "\u9875\u9762", link: "/page" },
              { text: "Frontmatter", link: "/frontmatter" }
            ]
          },
          {
            // 分组标题3
            text: "\u8FDB\u9636\u73A9\u6CD5",
            items: [
              { text: "Markdown", link: "/markdown" },
              { text: "\u56E2\u961F", link: "/team" },
              { text: "\u591A\u8BED\u8A00", link: "/multi-language" },
              { text: "DocSearch", link: "/docsearch" },
              { text: "\u9759\u6001\u90E8\u7F72", link: "/assets" },
              { text: "\u6837\u5F0F\u7F8E\u5316", link: "/style" },
              { text: "\u7EC4\u4EF6", link: "/components" },
              { text: "\u5E03\u5C40\u63D2\u69FD", link: "/layout" },
              { text: "\u63D2\u4EF6", link: "/plugin" },
              { text: "\u66F4\u65B0\u53CA\u5378\u8F7D", link: "/update" },
              { text: "\u642D\u5EFA\u5BFC\u822A", link: "/nav/" },
              { text: "\u6C38\u4E45\u94FE\u63A5", link: "/permalink/" }
            ]
          }
        ]
      },
      { text: "\u66F4\u65B0\u65E5\u5FD7", link: "/changelog" }
    ],
    //侧边栏
    sidebar: [
      {
        text: "\u{1F349}\u6307\u5357",
        collapsed: true,
        items: [
          {
            //分组标题1
            text: "\u4ECB\u7ECD",
            collapsed: true,
            items: [
              { text: "\u524D\u8A00", link: "/preface" }
            ]
          },
          {
            //分组标题2
            text: "\u57FA\u7840\u914D\u7F6E",
            collapsed: true,
            items: [
              { text: "\u5FEB\u901F\u4E0A\u624B", link: "/getting-started" },
              { text: "\u914D\u7F6E", link: "/configuration" },
              { text: "\u9875\u9762", link: "/page" },
              { text: "Frontmatter", link: "/frontmatter" }
            ]
          },
          {
            //分组标题3
            text: "\u8FDB\u9636\u73A9\u6CD5",
            collapsed: true,
            items: [
              { text: "Markdown", link: "/markdown" },
              { text: "\u56E2\u961F", link: "/team" },
              { text: "\u591A\u8BED\u8A00", link: "/multi-language" },
              { text: "DocSearch", link: "/docsearch" },
              { text: "\u9759\u6001\u90E8\u7F72", link: "/assets" },
              { text: "\u6837\u5F0F\u7F8E\u5316", link: "/style" },
              { text: "\u7EC4\u4EF6", link: "/components" },
              { text: "\u5E03\u5C40\u63D2\u69FD", link: "/layout" },
              { text: "\u63D2\u4EF6", link: "/plugin" },
              { text: "\u66F4\u65B0\u53CA\u5378\u8F7D", link: "/update" },
              { text: "\u642D\u5EFA\u5BFC\u822A", link: "/nav/" },
              { text: "\u6C38\u4E45\u94FE\u63A5", link: "/permalink/" }
            ]
          },
          {
            //分组标题3
            text: "\u5176\u4ED6\u7AD9\u70B9",
            collapsed: true,
            items: [
              { text: "VuePress", link: "https://vuepress.yiov.top/" },
              { text: "\u529D\u5B66\u5F55\u6559\u7A0B", link: "https://yiov.top/" },
              { text: "\u4E2A\u4EBA\u4E3B\u9875", link: "https://yingyayi.com/" }
            ]
          }
        ]
      },
      {
        text: "\u6570\u5B66\u7B14\u8BB0",
        collapsed: true,
        items: [
          {
            text: "\u9AD8\u7B49\u6570\u5B66",
            collapsed: false,
            items: [
              { text: "\u5C0F\u7ED3", link: "/math/AdvancedMathematics/AdvancedMathematics" },
              { text: "\u6781\u9650\u4E0E\u8FDE\u7EED", link: "/math/AdvancedMathematics/Limit" },
              { text: "\u5BFC\u6570", link: "/math/AdvancedMathematics/Derivatives" }
            ]
          },
          { text: "\u7EBF\u6027\u4EE3\u6570", link: "/math/LinearAlgebra/LinearAlgebra" }
        ]
      },
      {
        text: "\u7EC4\u4EF6",
        collapsed: false,
        items: [
          {
            text: "Redis\u7B14\u8BB0",
            collapsed: true,
            items: [
              { text: "\u4E3B\u4ECE\u6A21\u5F0F\u539F\u7406\u4E0E\u5B9E\u64CD", link: "/Redis/MasterSlave" }
            ]
          },
          {
            text: "RabbitMQ\u7B14\u8BB0",
            collapsed: true,
            items: [
              { text: "RabitMQ\u7684\u5B89\u88C5", link: "/RabbitMQ/index" }
            ]
          },
          {
            text: "PostgreSQL\u7B14\u8BB0",
            collapsed: true,
            items: [
              { text: "PostgreSQL\u4ECB\u7ECD", link: "/PostgreSQL/index" }
            ]
          },
          {
            text: "Docker\u7B14\u8BB0",
            collapsed: true,
            items: [
              { text: "docker\u7684\u5B89\u88C5\u4E0E\u4F7F\u7528", link: "/docker" },
              { text: "Docker\u6570\u636E\u5377\u8BBF\u95EE\u5931\u8D25", link: "/docker/FindVolumes" }
            ]
          },
          {
            text: "Git\u7B14\u8BB0",
            collapsed: true,
            items: [
              { text: "\u5185\u7F51\u4ED3\u5E93\u95F4\u7684\u4E92\u76F8\u62F7\u8D1D", link: "/Git/GitForLocal" },
              { text: "\u4EE3\u7801\u63D0\u4EA4\u89C4\u8303\u7EC4\u4EF6", link: "/Git/gitcz.md" }
            ]
          },
          {
            text: "Nginx\u7B14\u8BB0",
            collapsed: true,
            items: [
              { text: "Nginx\u53CD\u5411\u4EE3\u7406", link: "/nginx/ReverseProxy" }
            ]
          }
        ]
      },
      {
        text: "\u5FAE\u4FE1\u7B14\u8BB0",
        collapsed: false,
        items: [
          { text: "\u5FAE\u4FE1\u8F6C\u7801\u63A5\u53E3\u6587\u6863", link: "/wchat/wxcode" },
          { text: "\u5FAE\u4FE1\u77ED\u94FE\u63A5\u53E3\u6587\u6863", link: "/wchat/miniprogramlink" }
        ]
      },
      {
        text: "Java\u62A5\u9519\u89E3\u51B3\u65B9\u6848",
        collapsed: false,
        items: [
          { text: "Java\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u4FE1\u606F", link: "/Java/configuration" },
          { text: "Java\u4E2D\u53D1\u9001\u5BF9\u5E94\u7684Http\u8BF7\u6C42", link: "/Java/HttpClient" },
          { text: "Jankins", link: "/Java/JenKins" }
        ]
      },
      {
        text: "\u8BA1\u7B97\u673A\u7F51\u7EDC\u89E3\u51B3\u65B9\u6848",
        collapsed: false,
        items: [
          { text: "Linux\u5982\u4F55\u767B\u5F55\u8BA4\u8BC1\u7F51\u7EDC", link: "/Internet/CampusNetWork" }
        ]
      },
      {
        text: "\u8BBA\u6587\u7B14\u8BB0",
        collapsed: false,
        items: [
          { text: "\u8BBA\u6587\u5199\u4F5C\u5E38\u89C1\u683C\u5F0F", link: "/thesis/index" }
        ]
      },
      {
        text: "Linux\u7B14\u8BB0",
        collapsed: false,
        items: [
          { text: "wsl\u672C\u5730\u5B50\u7CFB\u7EDF", link: "/Linux/wsluse" }
        ]
      }
    ],
    //Algolia搜索
    search: {
      provider: "algolia",
      options: {
        appId: "JVJEBWQD37",
        apiKey: "1b6a44deb590789b3b1bb02d6bd5db1b",
        indexName: "doc",
        locales: {
          root: {
            placeholder: "\u641C\u7D22\u6587\u6863",
            translations: {
              button: {
                buttonText: "\u641C\u7D22\u6587\u6863",
                buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  cancelButtonText: "\u53D6\u6D88",
                  cancelButtonAriaLabel: "\u53D6\u6D88"
                },
                startScreen: {
                  recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
                  noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
                  saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2",
                  removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
                  favoriteSearchesTitle: "\u6536\u85CF",
                  removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664"
                },
                errorScreen: {
                  titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C",
                  helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5"
                },
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362",
                  closeText: "\u5173\u95ED",
                  searchByText: "\u641C\u7D22\u63D0\u4F9B\u8005"
                },
                noResultsScreen: {
                  noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                  suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2",
                  reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
                  reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988"
                }
              }
            }
          }
        }
      }
    },
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/Yiov/vitepress-doc" },
      { icon: "twitter", link: "https://twitter.com/" },
      { icon: "discord", link: "https://chat.vitejs.dev/" },
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: "https://weixin.qq.com/",
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: "wechat"
      }
    ],
    //手机端深浅模式文字修改
    darkModeSwitchLabel: "\u6DF1\u6D45\u6A21\u5F0F",
    //页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright \xA9 2023-${(/* @__PURE__ */ new Date()).getFullYear()} \u5907\u6848\u53F7\uFF1A<a href="https://beian.miit.gov.cn/" target="_blank">\u4EAC****\u53F7</a>`
    },
    //侧边栏文字更改(移动端)
    sidebarMenuLabel: "\u76EE\u5F55",
    //返回顶部文字修改(移动端)
    returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: "\u5F53\u524D\u9875\u5927\u7EB2"
    },
    //自定义上下页名
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3RoZW1lL3VudGlscy9wZXJtYWxpbmsudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlSHViXFxcXExvY2FsXFxcXGJsb2dfZnJvbnRcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlSHViXFxcXExvY2FsXFxcXGJsb2dfZnJvbnRcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NvZGVIdWIvTG9jYWwvYmxvZ19mcm9udC9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcclxuXHJcbmltcG9ydCB7IGRldkRlcGVuZGVuY2llcyB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbidcclxuaW1wb3J0IG1hcmtkb3duSXRUYXNrQ2hlY2tib3ggZnJvbSAnbWFya2Rvd24taXQtdGFzay1jaGVja2JveCdcclxuaW1wb3J0IHsgZ3JvdXBJY29uTWRQbHVnaW4sIGdyb3VwSWNvblZpdGVQbHVnaW4sIGxvY2FsSWNvbkxvYWRlciB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnMnXHJcbmltcG9ydCB7IE1lcm1haWRNYXJrZG93biwgTWVybWFpZFBsdWdpbiB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tbWVybWFpZCc7XHJcbmltcG9ydCBtYXJrZG93bkl0S2F0ZXggZnJvbSAnbWFya2Rvd24taXQta2F0ZXgnXHJcblxyXG5cclxuaW1wb3J0IHsgdXNlUG9zdHMgfSBmcm9tICcuL3RoZW1lL3VudGlscy9wZXJtYWxpbmsnO1xyXG5jb25zdCB7IHJld3JpdGVzIH0gPSBhd2FpdCB1c2VQb3N0cygpO1xyXG5cclxuY29uc3QgY3VzdG9tRWxlbWVudHMgPSBbXHJcbiAgJ21hdGgnLFxyXG4gICdtYWN0aW9uJyxcclxuICAnbWFsaWduZ3JvdXAnLFxyXG4gICdtYWxpZ25tYXJrJyxcclxuICAnbWVuY2xvc2UnLFxyXG4gICdtZXJyb3InLFxyXG4gICdtZmVuY2VkJyxcclxuICAnbWZyYWMnLFxyXG4gICdtaScsXHJcbiAgJ21sb25nZGl2JyxcclxuICAnbW11bHRpc2NyaXB0cycsXHJcbiAgJ21uJyxcclxuICAnbW8nLFxyXG4gICdtb3ZlcicsXHJcbiAgJ21wYWRkZWQnLFxyXG4gICdtcGhhbnRvbScsXHJcbiAgJ21yb290JyxcclxuICAnbXJvdycsXHJcbiAgJ21zJyxcclxuICAnbXNjYXJyaWVzJyxcclxuICAnbXNjYXJyeScsXHJcbiAgJ21zY2FycmllcycsXHJcbiAgJ21zZ3JvdXAnLFxyXG4gICdtc3RhY2snLFxyXG4gICdtbG9uZ2RpdicsXHJcbiAgJ21zbGluZScsXHJcbiAgJ21zdGFjaycsXHJcbiAgJ21zcGFjZScsXHJcbiAgJ21zcXJ0JyxcclxuICAnbXNyb3cnLFxyXG4gICdtc3RhY2snLFxyXG4gICdtc3RhY2snLFxyXG4gICdtc3R5bGUnLFxyXG4gICdtc3ViJyxcclxuICAnbXN1cCcsXHJcbiAgJ21zdWJzdXAnLFxyXG4gICdtdGFibGUnLFxyXG4gICdtdGQnLFxyXG4gICdtdGV4dCcsXHJcbiAgJ210cicsXHJcbiAgJ211bmRlcicsXHJcbiAgJ211bmRlcm92ZXInLFxyXG4gICdzZW1hbnRpY3MnLFxyXG4gICdtYXRoJyxcclxuICAnbWknLFxyXG4gICdtbicsXHJcbiAgJ21vJyxcclxuICAnbXMnLFxyXG4gICdtc3BhY2UnLFxyXG4gICdtdGV4dCcsXHJcbiAgJ21lbmNsb3NlJyxcclxuICAnbWVycm9yJyxcclxuICAnbWZlbmNlZCcsXHJcbiAgJ21mcmFjJyxcclxuICAnbXBhZGRlZCcsXHJcbiAgJ21waGFudG9tJyxcclxuICAnbXJvb3QnLFxyXG4gICdtcm93JyxcclxuICAnbXNxcnQnLFxyXG4gICdtc3R5bGUnLFxyXG4gICdtbXVsdGlzY3JpcHRzJyxcclxuICAnbW92ZXInLFxyXG4gICdtcHJlc2NyaXB0cycsXHJcbiAgJ21zdWInLFxyXG4gICdtc3Vic3VwJyxcclxuICAnbXN1cCcsXHJcbiAgJ211bmRlcicsXHJcbiAgJ211bmRlcm92ZXInLFxyXG4gICdub25lJyxcclxuICAnbWFsaWduZ3JvdXAnLFxyXG4gICdtYWxpZ25tYXJrJyxcclxuICAnbXRhYmxlJyxcclxuICAnbXRkJyxcclxuICAnbXRyJyxcclxuICAnbWxvbmdkaXYnLFxyXG4gICdtc2NhcnJpZXMnLFxyXG4gICdtc2NhcnJ5JyxcclxuICAnbXNncm91cCcsXHJcbiAgJ21zbGluZScsXHJcbiAgJ21zcm93JyxcclxuICAnbXN0YWNrJyxcclxuICAnbWFjdGlvbicsXHJcbiAgJ3NlbWFudGljcycsXHJcbiAgJ2Fubm90YXRpb24nLFxyXG4gICdhbm5vdGF0aW9uLXhtbCdcclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBsYW5nOiAnemgtQ04nLFxyXG4gIHRpdGxlOiBcIkVOTEJcIixcclxuICBkZXNjcmlwdGlvbjogXCJcdTYyMTFcdTc2ODR2aXRwcmVzc1x1NjU4N1x1Njg2M1x1NjU1OVx1N0EwQlwiLFxyXG4gIHJld3JpdGVzLFxyXG5cclxuICAvLyAjcmVnaW9uIGZhdlxyXG4gICAgaGVhZDogW1xyXG4gICAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2xvZ28ucG5nJyB9XSxcclxuICAgIC8vIC0tLSBHb29nbGUgQW5hbHl0aWNzIEdBNCAtLS1cclxuICAgIC8vIFtcclxuICAgIC8vICAgJ3NjcmlwdCcsXHJcbiAgICAvLyAgIHsgYXN5bmM6ICcnLCBzcmM6ICdodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPUctWFhYWFhYWCcgfVxyXG4gICAgLy8gXSxcclxuICAgIC8vIFtcclxuICAgIC8vICAgJ3NjcmlwdCcsXHJcbiAgICAvLyAgIHt9LFxyXG4gICAgLy8gICBgXHJcbiAgICAvLyAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xyXG4gICAgLy8gICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XHJcbiAgICAvLyAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XHJcbiAgICAvLyAgIGd0YWcoJ2NvbmZpZycsICdHLVhYWFhYWFgnKTtcclxuICAgIC8vICAgYFxyXG4gICAgLy8gXSxcclxuXHJcbiAgICAvLyAvLyAtLS0gQmFpZHUgVG9uZ2ppIC0tLVxyXG4gICAgLy8gW1xyXG4gICAgLy8gICAnc2NyaXB0JyxcclxuICAgIC8vICAge30sXHJcbiAgICAvLyAgIGBcclxuICAgIC8vICAgdmFyIF9obXQgPSBfaG10IHx8IFtdO1xyXG4gICAgLy8gICAoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgdmFyIGhtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgIC8vICAgICBobS5zcmMgPSBcImh0dHBzOi8vaG0uYmFpZHUuY29tL2htLmpzP1lPVVJfQkFJRFVfVFJBQ0tJTkdfSURcIjtcclxuICAgIC8vICAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdOyBcclxuICAgIC8vICAgICBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGhtLCBzKTtcclxuICAgIC8vICAgfSkoKTtcclxuICAgIC8vICAgYFxyXG4gICAgLy8gXVxyXG4gIF0sXHJcbiAgLy8gI2VuZHJlZ2lvbiBmYXZcclxuXHJcbiAgYmFzZTogJy8nLCAvL1x1N0Y1MVx1N0FEOVx1OTBFOFx1N0Y3Mlx1NTIzMGdpdGh1Ylx1NzY4NHZpdGVwcmVzc1x1OEZEOVx1NEUyQVx1NEVEM1x1NUU5M1x1OTFDQ1xyXG5cclxuICAvLyBjbGVhblVybHM6dHJ1ZSwgLy9cdTVGMDBcdTU0MkZcdTdFQUZcdTUxQzBcdTk0RkVcdTYzQTVcdTY1RTBodG1sXHJcblxyXG4gIC8vXHU1NDJGXHU3NTI4XHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHJcbiAgYXBwZWFyYW5jZTogJ2RhcmsnLFxyXG5cclxuICAvL1x1NTkxQVx1OEJFRFx1OEEwMFxyXG4gIGxvY2FsZXM6IHtcclxuICAgIHJvb3Q6IHtcclxuICAgICAgbGFiZWw6ICdcdTdCODBcdTRGNTNcdTRFMkRcdTY1ODcnLFxyXG4gICAgICBsYW5nOiAnWmhfQ04nLFxyXG4gICAgfSxcclxuICAgIGVuOiB7XHJcbiAgICAgIGxhYmVsOiAnRW5nbGlzaCcsXHJcbiAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgIGxpbms6ICcvZW4vJyxcclxuICAgIH0sXHJcbiAgICBmcjoge1xyXG4gICAgICBsYWJlbDogJ0ZyZW5jaCcsXHJcbiAgICAgIGxhbmc6ICdmcicsXHJcbiAgICAgIGxpbms6ICcvZnIvJyxcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvL21hcmtkb3duXHU5MTREXHU3RjZFXHJcbiAgbWFya2Rvd246IHtcclxuICAgIC8vXHU4ODRDXHU1M0Y3XHU2NjNFXHU3OTNBXHJcbiAgICBsaW5lTnVtYmVyczogdHJ1ZSxcclxuXHJcbiAgICAvLyB0b2NcdTY2M0VcdTc5M0FcdTRFMDBcdTdFQTdcdTY4MDdcdTk4OThcclxuICAgIHRvYzogeyBsZXZlbDogWzEsIDIsIDNdIH0sXHJcblxyXG4gICAgLy8gXHU0RjdGXHU3NTI4IGAhIWNvZGVgIFx1OTYzMlx1NkI2Mlx1OEY2Q1x1NjM2MlxyXG4gICAgY29kZVRyYW5zZm9ybWVyczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcG9zdHByb2Nlc3MoY29kZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvZGUucmVwbGFjZSgvXFxbXFwhXFwhY29kZS9nLCAnWyFjb2RlJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF0sXHJcblxyXG4gICAgLy8gXHU1RjAwXHU1NDJGXHU1NkZFXHU3MjQ3XHU2MUQyXHU1MkEwXHU4RjdEXHJcbiAgICBpbWFnZToge1xyXG4gICAgICBsYXp5TG9hZGluZzogdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICBjb25maWc6IChtZCkgPT4ge1xyXG4gICAgICAvLyBcdTdFQzRcdTRFRjZcdTYzRDJcdTUxNjVoMVx1NjgwN1x1OTg5OFx1NEUwQlxyXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy5oZWFkaW5nX2Nsb3NlID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZikgPT4ge1xyXG4gICAgICAgIGxldCBodG1sUmVzdWx0ID0gc2xmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKVxyXG4gICAgICAgIGlmICh0b2tlbnNbaWR4XS50YWcgPT09ICdoMScpIGh0bWxSZXN1bHQgKz0gYDxBcnRpY2xlTWV0YWRhdGEgLz5gXHJcbiAgICAgICAgcmV0dXJuIGh0bWxSZXN1bHRcclxuICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gXHU0RUUzXHU3ODAxXHU3RUM0XHU0RTJEXHU2REZCXHU1MkEwXHU1NkZFXHU3MjQ3XHJcbiAgICAgICAgbWQudXNlKChtZCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZGVmYXVsdFJlbmRlciA9IG1kLnJlbmRlclxyXG4gICAgICAgICAgbWQucmVuZGVyID0gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgW2NvbnRlbnQsIGVudl0gPSBhcmdzXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMYW5nID0gZW52Py5sb2NhbGVJbmRleCB8fCAncm9vdCdcclxuICAgICAgICAgICAgY29uc3QgaXNIb21lUGFnZSA9IGVudj8ucGF0aCA9PT0gJy8nIHx8IGVudj8ucmVsYXRpdmVQYXRoID09PSAnaW5kZXgubWQnICAvLyBcdTUyMjRcdTY1QURcdTY2MkZcdTU0MjZcdTY2MkZcdTk5OTZcdTk4NzVcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0hvbWVQYWdlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRSZW5kZXIuYXBwbHkobWQsIGFyZ3MpIC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRlx1OTk5Nlx1OTg3NVx1RkYwQ1x1NzZGNFx1NjNBNVx1NkUzMlx1NjdEM1x1NTE4NVx1NUJCOVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFx1OEMwM1x1NzUyOFx1NTM5Rlx1NTlDQlx1NkUzMlx1NjdEM1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdENvbnRlbnQgPSBkZWZhdWx0UmVuZGVyLmFwcGx5KG1kLCBhcmdzKVxyXG4gICAgICAgICAgICAvLyBcdTY2RkZcdTYzNjJcdTUxODVcdTVCQjlcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRMYW5nID09PSAncm9vdCcpIHtcclxuICAgICAgICAgICAgICBkZWZhdWx0Q29udGVudCA9IGRlZmF1bHRDb250ZW50LnJlcGxhY2UoL05PVEUvZywgJ1x1NjNEMFx1OTE5MicpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvVElQL2csICdcdTVFRkFcdThCQUUnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0lNUE9SVEFOVC9nLCAnXHU5MUNEXHU4OTgxJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9XQVJOSU5HL2csICdcdThCNjZcdTU0NEEnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0NBVVRJT04vZywgJ1x1NkNFOFx1NjEwRicpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudExhbmcgPT09ICdrbycpIHtcclxuICAgICAgICAgICAgICAvLyBcdTk3RTlcdTY1ODdcdTY2RkZcdTYzNjJcclxuICAgICAgICAgICAgICBkZWZhdWx0Q29udGVudCA9IGRlZmF1bHRDb250ZW50LnJlcGxhY2UoL05PVEUvZywgJ1x1QzU0Q1x1QjlCQycpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvVElQL2csICdcdUQzMDEnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0lNUE9SVEFOVC9nLCAnXHVDOTExXHVDNjk0JylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9XQVJOSU5HL2csICdcdUFDQkRcdUFDRTAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0NBVVRJT04vZywgJ1x1QzhGQ1x1Qzc1OCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gXHU4RkQ0XHU1NkRFXHU2RTMyXHU2N0QzXHU3Njg0XHU1MTg1XHU1QkI5XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0Q29udGVudFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFx1ODNCN1x1NTNENlx1NTM5Rlx1NTlDQlx1NzY4NCBmZW5jZSBcdTZFMzJcdTY3RDNcdTg5QzRcdTUyMTlcclxuICAgICAgICAgIGNvbnN0IGRlZmF1bHRGZW5jZSA9IG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlPy5iaW5kKG1kLnJlbmRlcmVyLnJ1bGVzKSA/PyAoKC4uLmFyZ3MpID0+IGFyZ3NbMF1bYXJnc1sxXV0uY29udGVudCk7XHJcblxyXG4gICAgICAgICAgLy8gXHU5MUNEXHU1MTk5IGZlbmNlIFx1NkUzMlx1NjdEM1x1ODlDNFx1NTIxOVxyXG4gICAgICAgICAgbWQucmVuZGVyZXIucnVsZXMuZmVuY2UgPSAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdO1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdG9rZW4uaW5mby50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBcdTUyMjRcdTY1QURcdTY2MkZcdTU0MjZcdTRFM0EgbWQ6aW1nIFx1N0M3Qlx1NTc4Qlx1NzY4NFx1NEVFM1x1NzgwMVx1NTc1N1xyXG4gICAgICAgICAgICBpZiAoaW5mby5pbmNsdWRlcygnbWQ6aW1nJykpIHtcclxuICAgICAgICAgICAgICAvLyBcdTUzRUFcdTZFMzJcdTY3RDNcdTU2RkVcdTcyNDdcdUZGMENcdTRFMERcdTUxOERcdTZFMzJcdTY3RDNcdTRFM0FcdTRFRTNcdTc4MDFcdTU3NTdcclxuICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJyZW5kZXJlZC1tZFwiPiR7bWQucmVuZGVyKHRva2VuLmNvbnRlbnQpfTwvZGl2PmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFx1NTE3Nlx1NEVENlx1NEVFM1x1NzgwMVx1NTc1N1x1NjMwOVx1OUVEOFx1OEJBNFx1ODlDNFx1NTIxOVx1NkUzMlx1NjdEM1x1RkYwOFx1NTk4MiBqYXZhLCBqcyBcdTdCNDlcdUZGMDlcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRGZW5jZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbikgLy9cdTRFRTNcdTc4MDFcdTdFQzRcdTU2RkVcdTY4MDdcclxuICAgICAgbWQudXNlKG1hcmtkb3duSXRUYXNrQ2hlY2tib3gpIC8vdG9kb1xyXG4gICAgICBtZC51c2UoTWVybWFpZE1hcmtkb3duKTtcclxuICAgICAgbWQudXNlKG1hcmtkb3duSXRLYXRleCkgIC8vXHU2NTcwXHU1QjY2XHU1MTZDXHU1RjBGXHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICB2aXRlOiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIGdyb3VwSWNvblZpdGVQbHVnaW4oe1xyXG4gICAgICAgIGN1c3RvbUljb246IHtcclxuICAgICAgICAgIHRzOiBsb2NhbEljb25Mb2FkZXIoaW1wb3J0Lm1ldGEudXJsLCAnLi4vcHVibGljL3N2Zy90eXBlc2NyaXB0LnN2ZycpLCAvL1x1NjcyQ1x1NTczMHRzXHU1NkZFXHU2ODA3XHU1QkZDXHU1MTY1XHJcbiAgICAgICAgICBtZDogbG9jYWxJY29uTG9hZGVyKGltcG9ydC5tZXRhLnVybCwgJy4uL3B1YmxpYy9zdmcvbWQuc3ZnJyksIC8vbWFya2Rvd25cdTU2RkVcdTY4MDdcclxuICAgICAgICAgIGNzczogbG9jYWxJY29uTG9hZGVyKGltcG9ydC5tZXRhLnVybCwgJy4uL3B1YmxpYy9zdmcvY3NzLnN2ZycpLCAvL2Nzc1x1NTZGRVx1NjgwN1xyXG4gICAgICAgICAganM6ICdsb2dvczpqYXZhc2NyaXB0JywgLy9qc1x1NTZGRVx1NjgwN1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBbTWVybWFpZFBsdWdpbigpXVxyXG4gICAgXSBhcyBhbnksXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogWydtZXJtYWlkJ10sXHJcbiAgICB9LFxyXG4gICAgc3NyOiB7XHJcbiAgICAgIG5vRXh0ZXJuYWw6IFsnbWVybWFpZCddLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHZ1ZToge1xyXG4gICAgdGVtcGxhdGU6IHtcclxuICAgICAgY29tcGlsZXJPcHRpb25zOiB7XHJcbiAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiBjdXN0b21FbGVtZW50cy5pbmNsdWRlcyh0YWcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBsYXN0VXBkYXRlZDogdHJ1ZSwgLy9cdTZCNjRcdTkxNERcdTdGNkVcdTRFMERcdTRGMUFcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdUZGMENcdTk3MDBnaXRcdTYzRDBcdTRFQTRcdTU0MEVcdTcyMkNcdTUzRDZcdTY1RjZcdTk1RjRcdTYyMzNcdUZGMENcdTZDQTFcdTY3MDlcdTVCODlcdTg4QzVnaXRcdTY3MkNcdTU3MzBcdTYyQTVcdTk1MTlcdTUzRUZcdTRFRTVcdTUxNDhcdTZDRThcdTkxQ0FcclxuXHJcbiAgLy9cdTRFM0JcdTk4OThcdTkxNERcdTdGNkVcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgLy9cdTVERTZcdTRFMEFcdTg5RDJsb2dvXHJcbiAgICBsb2dvOiAnL2xvZ28ucG5nJyxcclxuICAgIC8vbG9nbzogJ2h0dHBzOi8vdml0ZWpzLmNuL3ZpdGUzLWNuL2xvZ28td2l0aC1zaGFkb3cucG5nJywgLy9cdThGRENcdTdBMEJcdTVGMTVcdTc1MjhcclxuICAgIC8vc2l0ZVRpdGxlOiBmYWxzZSwgLy9cdTY4MDdcdTk4OThcdTk2OTBcdTg1Q0ZcclxuXHJcbiAgICAvL1x1OEJCRVx1N0Y2RVx1N0FEOVx1NzBCOVx1NjgwN1x1OTg5OCBcdTRGMUFcdTg5ODZcdTc2RDZ0aXRsZVxyXG4gICAgLy9zaXRlVGl0bGU6ICdIZWxsbyBXb3JsZCcsXHJcblxyXG4gICAgLy9cdTdGMTZcdThGOTFcdTY3MkNcdTk4NzVcclxuICAgIGVkaXRMaW5rOiB7XHJcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vbnd0LXEvbnd0LXEuZ2l0aHViLmlvL3RyZWUvbWFpbi9kb2NzLzpwYXRoJywgLy8gXHU2NTM5XHU2MjEwXHU4MUVBXHU1REYxXHU3Njg0XHU0RUQzXHU1RTkzXHJcbiAgICAgIHRleHQ6ICdcdTU3MjhHaXRIdWJcdTdGMTZcdThGOTFcdTY3MkNcdTk4NzUnXHJcbiAgICB9LFxyXG5cclxuICAgIC8vXHU0RTBBXHU2QjIxXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XHJcbiAgICBsYXN0VXBkYXRlZDoge1xyXG4gICAgICB0ZXh0OiAnXHU0RTBBXHU2QjIxXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcclxuICAgICAgZm9ybWF0T3B0aW9uczoge1xyXG4gICAgICAgIGRhdGVTdHlsZTogJ3Nob3J0JywgLy8gXHU1M0VGXHU5MDA5XHU1MDNDZnVsbFx1MzAwMWxvbmdcdTMwMDFtZWRpdW1cdTMwMDFzaG9ydFxyXG4gICAgICAgIHRpbWVTdHlsZTogJ21lZGl1bScgLy8gXHU1M0VGXHU5MDA5XHU1MDNDZnVsbFx1MzAwMWxvbmdcdTMwMDFtZWRpdW1cdTMwMDFzaG9ydFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvL1x1NUJGQ1x1ODIyQVx1NjgwRlxyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogJ1x1OTk5Nlx1OTg3NScsIGxpbms6ICcvJyB9LFxyXG4gICAgICB7IHRleHQ6ICdcdTVCRkNcdTgyMkFcdTdGNTFcdTdBRDknLCBsaW5rOiAnL25hdi9tYW8nIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHVEODNDXHVERjQ5XHU2MzA3XHU1MzU3JyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBcdTUyMDZcdTdFQzRcdTY4MDdcdTk4OTgxXHJcbiAgICAgICAgICAgIHRleHQ6ICdcdTRFQ0JcdTdFQ0QnLFxyXG4gICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTI0RFx1OEEwMCcsIGxpbms6ICcvcHJlZmFjZScgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFx1NTIwNlx1N0VDNFx1NjgwN1x1OTg5ODJcclxuICAgICAgICAgICAgdGV4dDogJ1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RScsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU0RTBBXHU2MjRCJywgbGluazogJy9nZXR0aW5nLXN0YXJ0ZWQnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU5MTREXHU3RjZFJywgbGluazogJy9jb25maWd1cmF0aW9uJyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1OTg3NVx1OTc2MicsIGxpbms6ICcvcGFnZScgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdGcm9udG1hdHRlcicsIGxpbms6ICcvZnJvbnRtYXR0ZXInIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBcdTUyMDZcdTdFQzRcdTY4MDdcdTk4OTgzXHJcbiAgICAgICAgICAgIHRleHQ6ICdcdThGREJcdTk2MzZcdTczQTlcdTZDRDUnLFxyXG4gICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ01hcmtkb3duJywgbGluazogJy9tYXJrZG93bicgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTU2RTJcdTk2MUYnLCBsaW5rOiAnL3RlYW0nIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1OTFBXHU4QkVEXHU4QTAwJywgbGluazogJy9tdWx0aS1sYW5ndWFnZScgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdEb2NTZWFyY2gnLCBsaW5rOiAnL2RvY3NlYXJjaCcgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTk3NTlcdTYwMDFcdTkwRThcdTdGNzInLCBsaW5rOiAnL2Fzc2V0cycgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTY4MzdcdTVGMEZcdTdGOEVcdTUzMTYnLCBsaW5rOiAnL3N0eWxlJyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1N0VDNFx1NEVGNicsIGxpbms6ICcvY29tcG9uZW50cycgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTVFMDNcdTVDNDBcdTYzRDJcdTY5RkQnLCBsaW5rOiAnL2xheW91dCcgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTYzRDJcdTRFRjYnLCBsaW5rOiAnL3BsdWdpbicgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTY2RjRcdTY1QjBcdTUzQ0FcdTUzNzhcdThGN0QnLCBsaW5rOiAnL3VwZGF0ZScgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTY0MkRcdTVFRkFcdTVCRkNcdTgyMkEnLCBsaW5rOiAnL25hdi8nIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2QzM4XHU0RTQ1XHU5NEZFXHU2M0E1JywgbGluazogJy9wZXJtYWxpbmsvJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHRleHQ6ICdcdTY2RjRcdTY1QjBcdTY1RTVcdTVGRDcnLCBsaW5rOiAnL2NoYW5nZWxvZycgfSxcclxuICAgIF0sXHJcblxyXG5cclxuICAgIC8vXHU0RkE3XHU4RkI5XHU2ODBGXHJcbiAgICBzaWRlYmFyOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHVEODNDXHVERjQ5XHU2MzA3XHU1MzU3JyxcclxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy9cdTUyMDZcdTdFQzRcdTY4MDdcdTk4OTgxXHJcbiAgICAgICAgICAgIHRleHQ6ICdcdTRFQ0JcdTdFQ0QnLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MjREXHU4QTAwJywgbGluazogJy9wcmVmYWNlJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy9cdTUyMDZcdTdFQzRcdTY4MDdcdTk4OTgyXHJcbiAgICAgICAgICAgIHRleHQ6ICdcdTU3RkFcdTc4NDBcdTkxNERcdTdGNkUnLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU0RTBBXHU2MjRCJywgbGluazogJy9nZXR0aW5nLXN0YXJ0ZWQnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU5MTREXHU3RjZFJywgbGluazogJy9jb25maWd1cmF0aW9uJyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1OTg3NVx1OTc2MicsIGxpbms6ICcvcGFnZScgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdGcm9udG1hdHRlcicsIGxpbms6ICcvZnJvbnRtYXR0ZXInIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvL1x1NTIwNlx1N0VDNFx1NjgwN1x1OTg5ODNcclxuICAgICAgICAgICAgdGV4dDogJ1x1OEZEQlx1OTYzNlx1NzNBOVx1NkNENScsXHJcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdNYXJrZG93bicsIGxpbms6ICcvbWFya2Rvd24nIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1NkUyXHU5NjFGJywgbGluazogJy90ZWFtJyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTkxQVx1OEJFRFx1OEEwMCcsIGxpbms6ICcvbXVsdGktbGFuZ3VhZ2UnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRG9jU2VhcmNoJywgbGluazogJy9kb2NzZWFyY2gnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU5NzU5XHU2MDAxXHU5MEU4XHU3RjcyJywgbGluazogJy9hc3NldHMnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2ODM3XHU1RjBGXHU3RjhFXHU1MzE2JywgbGluazogJy9zdHlsZScgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTdFQzRcdTRFRjYnLCBsaW5rOiAnL2NvbXBvbmVudHMnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RTAzXHU1QzQwXHU2M0QyXHU2OUZEJywgbGluazogJy9sYXlvdXQnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2M0QyXHU0RUY2JywgbGluazogJy9wbHVnaW4nIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2NkY0XHU2NUIwXHU1M0NBXHU1Mzc4XHU4RjdEJywgbGluazogJy91cGRhdGUnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2NDJEXHU1RUZBXHU1QkZDXHU4MjJBJywgbGluazogJy9uYXYvJyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NkMzOFx1NEU0NVx1OTRGRVx1NjNBNScsIGxpbms6ICcvcGVybWFsaW5rLycgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vXHU1MjA2XHU3RUM0XHU2ODA3XHU5ODk4M1xyXG4gICAgICAgICAgICB0ZXh0OiAnXHU1MTc2XHU0RUQ2XHU3QUQ5XHU3MEI5JyxcclxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1Z1ZVByZXNzJywgbGluazogJ2h0dHBzOi8vdnVlcHJlc3MueWlvdi50b3AvJyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTI5RFx1NUI2Nlx1NUY1NVx1NjU1OVx1N0EwQicsIGxpbms6ICdodHRwczovL3lpb3YudG9wLycgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTRFMkFcdTRFQkFcdTRFM0JcdTk4NzUnLCBsaW5rOiAnaHR0cHM6Ly95aW5neWF5aS5jb20vJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU2NTcwXHU1QjY2XHU3QjE0XHU4QkIwJyxcclxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRleHQ6ICdcdTlBRDhcdTdCNDlcdTY1NzBcdTVCNjYnLCBcclxuICAgICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTVDMEZcdTdFRDMnLCBsaW5rOiAnL21hdGgvQWR2YW5jZWRNYXRoZW1hdGljcy9BZHZhbmNlZE1hdGhlbWF0aWNzJyB9LFxyXG4gICAgICAgICAgICAgICB7IHRleHQ6ICdcdTY3ODFcdTk2NTBcdTRFMEVcdThGREVcdTdFRUQnLCBsaW5rOiAnL21hdGgvQWR2YW5jZWRNYXRoZW1hdGljcy9MaW1pdCcgfSxcclxuICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1QkZDXHU2NTcwJywgbGluazogJy9tYXRoL0FkdmFuY2VkTWF0aGVtYXRpY3MvRGVyaXZhdGl2ZXMnIH0sXHJcbiAgICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU3RUJGXHU2MDI3XHU0RUUzXHU2NTcwJywgbGluazogJy9tYXRoL0xpbmVhckFsZ2VicmEvTGluZWFyQWxnZWJyYScgfSxcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU3RUM0XHU0RUY2JyxcclxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdSZWRpc1x1N0IxNFx1OEJCMCcsXHJcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTRFM0JcdTRFQ0VcdTZBMjFcdTVGMEZcdTUzOUZcdTc0MDZcdTRFMEVcdTVCOUVcdTY0Q0QnLCBsaW5rOiAnL1JlZGlzL01hc3RlclNsYXZlJyB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnUmFiYml0TVFcdTdCMTRcdThCQjAnLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnUmFiaXRNUVx1NzY4NFx1NUI4OVx1ODhDNScsIGxpbms6ICcvUmFiYml0TVEvaW5kZXgnIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdQb3N0Z3JlU1FMXHU3QjE0XHU4QkIwJyxcclxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1Bvc3RncmVTUUxcdTRFQ0JcdTdFQ0QnLCBsaW5rOiAnL1Bvc3RncmVTUUwvaW5kZXgnIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdEb2NrZXJcdTdCMTRcdThCQjAnLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnZG9ja2VyXHU3Njg0XHU1Qjg5XHU4OEM1XHU0RTBFXHU0RjdGXHU3NTI4JywgbGluazogJy9kb2NrZXInIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRG9ja2VyXHU2NTcwXHU2MzZFXHU1Mzc3XHU4QkJGXHU5NUVFXHU1OTMxXHU4RDI1JywgbGluazogJy9kb2NrZXIvRmluZFZvbHVtZXMnIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdHaXRcdTdCMTRcdThCQjAnLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTg1XHU3RjUxXHU0RUQzXHU1RTkzXHU5NUY0XHU3Njg0XHU0RTkyXHU3NkY4XHU2MkY3XHU4RDFEJywgbGluazogJy9HaXQvR2l0Rm9yTG9jYWwnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU0RUUzXHU3ODAxXHU2M0QwXHU0RUE0XHU4OUM0XHU4MzAzXHU3RUM0XHU0RUY2JywgbGluazogJy9HaXQvZ2l0Y3oubWQnIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdOZ2lueFx1N0IxNFx1OEJCMCcsXHJcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdOZ2lueFx1NTNDRFx1NTQxMVx1NEVFM1x1NzQwNicsIGxpbms6ICcvbmdpbngvUmV2ZXJzZVByb3h5JyB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTVGQUVcdTRGRTFcdTdCMTRcdThCQjAnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NUZBRVx1NEZFMVx1OEY2Q1x1NzgwMVx1NjNBNVx1NTNFM1x1NjU4N1x1Njg2MycsIGxpbms6ICcvd2NoYXQvd3hjb2RlJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1RkFFXHU0RkUxXHU3N0VEXHU5NEZFXHU2M0E1XHU1M0UzXHU2NTg3XHU2ODYzJywgbGluazogJy93Y2hhdC9taW5pcHJvZ3JhbWxpbmsnIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnSmF2YVx1NjJBNVx1OTUxOVx1ODlFM1x1NTFCM1x1NjVCOVx1Njg0OCcsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnSmF2YVx1OEJGQlx1NTNENlx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NFx1NEZFMVx1NjA2RicsIGxpbms6ICcvSmF2YS9jb25maWd1cmF0aW9uJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnSmF2YVx1NEUyRFx1NTNEMVx1OTAwMVx1NUJGOVx1NUU5NFx1NzY4NEh0dHBcdThCRjdcdTZDNDInLCBsaW5rOiAnL0phdmEvSHR0cENsaWVudCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0phbmtpbnMnLCBsaW5rOiAnL0phdmEvSmVuS2lucycgfSxcclxuICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1OEJBMVx1N0I5N1x1NjczQVx1N0Y1MVx1N0VEQ1x1ODlFM1x1NTFCM1x1NjVCOVx1Njg0OCcsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnTGludXhcdTU5ODJcdTRGNTVcdTc2N0JcdTVGNTVcdThCQTRcdThCQzFcdTdGNTFcdTdFREMnLCBsaW5rOiAnL0ludGVybmV0L0NhbXB1c05ldFdvcmsnIH0sXHJcbiAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdThCQkFcdTY1ODdcdTdCMTRcdThCQjAnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OEJCQVx1NjU4N1x1NTE5OVx1NEY1Q1x1NUUzOFx1ODlDMVx1NjgzQ1x1NUYwRicsIGxpbms6ICcvdGhlc2lzL2luZGV4JyB9LFxyXG4gICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAge1xyXG4gICAgICAgIHRleHQ6ICdMaW51eFx1N0IxNFx1OEJCMCcsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnd3NsXHU2NzJDXHU1NzMwXHU1QjUwXHU3Q0ZCXHU3RURGJywgbGluazogJy9MaW51eC93c2x1c2UnIH0sXHJcbiAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgIF0sXHJcblxyXG5cclxuXHJcbiAgICAvL0FsZ29saWFcdTY0MUNcdTdEMjJcclxuICAgIHNlYXJjaDoge1xyXG4gICAgICBwcm92aWRlcjogJ2FsZ29saWEnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgYXBwSWQ6ICdKVkpFQldRRDM3JyxcclxuICAgICAgICBhcGlLZXk6ICcxYjZhNDRkZWI1OTA3ODliM2IxYmIwMmQ2YmQ1ZGIxYicsXHJcbiAgICAgICAgaW5kZXhOYW1lOiAnZG9jJyxcclxuICAgICAgICBsb2NhbGVzOiB7XHJcbiAgICAgICAgICByb290OiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgYnV0dG9uOiB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG1vZGFsOiB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hCb3g6IHtcclxuICAgICAgICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNicsXHJcbiAgICAgICAgICAgICAgICAgIHJlc2V0QnV0dG9uQXJpYUxhYmVsOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcclxuICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkFyaWFMYWJlbDogJ1x1NTNENlx1NkQ4OCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydFNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICByZWNlbnRTZWFyY2hlc1RpdGxlOiAnXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyJyxcclxuICAgICAgICAgICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxyXG4gICAgICAgICAgICAgICAgICBzYXZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRGRERcdTVCNThcdTgxRjNcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxyXG4gICAgICAgICAgICAgICAgICByZW1vdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEVDRVx1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMlx1NEUyRFx1NzlGQlx1OTY2NCcsXHJcbiAgICAgICAgICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXHJcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUZhdm9yaXRlU2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY1MzZcdTg1Q0ZcdTRFMkRcdTc5RkJcdTk2NjQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JTY3JlZW46IHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGVUZXh0OiAnXHU2NUUwXHU2Q0Q1XHU4M0I3XHU1M0Q2XHU3RUQzXHU2NzlDJyxcclxuICAgICAgICAgICAgICAgICAgaGVscFRleHQ6ICdcdTRGNjBcdTUzRUZcdTgwRkRcdTk3MDBcdTg5ODFcdTY4QzBcdTY3RTVcdTRGNjBcdTc2ODRcdTdGNTFcdTdFRENcdThGREVcdTYzQTUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTkwMDlcdTYyRTknLFxyXG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxyXG4gICAgICAgICAgICAgICAgICBjbG9zZVRleHQ6ICdcdTUxNzNcdTk1RUQnLFxyXG4gICAgICAgICAgICAgICAgICBzZWFyY2hCeVRleHQ6ICdcdTY0MUNcdTdEMjJcdTYzRDBcdTRGOUJcdTgwMDUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzU2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxyXG4gICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRRdWVyeVRleHQ6ICdcdTRGNjBcdTUzRUZcdTRFRTVcdTVDMURcdThCRDVcdTY3RTVcdThCRTInLFxyXG4gICAgICAgICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c1RleHQ6ICdcdTRGNjBcdThCQTRcdTRFM0FcdThCRTVcdTY3RTVcdThCRTJcdTVFOTRcdThCRTVcdTY3MDlcdTdFRDNcdTY3OUNcdUZGMUYnLFxyXG4gICAgICAgICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c0xpbmtUZXh0OiAnXHU3MEI5XHU1MUZCXHU1M0NEXHU5OTg4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8vXHU3OTNFXHU0RUE0XHU5NEZFXHU2M0E1XHJcbiAgICBzb2NpYWxMaW5rczogW1xyXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL1lpb3Yvdml0ZXByZXNzLWRvYycgfSxcclxuICAgICAgeyBpY29uOiAndHdpdHRlcicsIGxpbms6ICdodHRwczovL3R3aXR0ZXIuY29tLycgfSxcclxuICAgICAgeyBpY29uOiAnZGlzY29yZCcsIGxpbms6ICdodHRwczovL2NoYXQudml0ZWpzLmRldi8nIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uOiB7XHJcbiAgICAgICAgICBzdmc6ICc8c3ZnIHQ9XCIxNzAzNDgzNTQyODcyXCIgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCAxMzA5IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHAtaWQ9XCI2Mjc0XCIgd2lkdGg9XCIyMDBcIiBoZWlnaHQ9XCIyMDBcIj48cGF0aCBkPVwiTTExNDcuMjY4OTYgOTEyLjY4MTQxN2wzNC45MDE2NSAxMTEuMzE4NTgzLTEyNy4xNjUxMTEtNjYuODIzODkxYTYwNC43ODczMTMgNjA0Ljc4NzMxMyAwIDAgMS0xMzkuMDgyNzQ3IDIyLjI2MzcxN2MtMjIwLjYwNzIzOSAwLTM5NC4yOTY5NjktMTQ0LjYxNTkzNi0zOTQuMjk2OTY5LTMyMi43NTg0MDlzMTczLjUyNjAyNi0zMjIuODg5MzcyIDM5NC4yOTY5NjktMzIyLjg4OTM3MkMxMTI0LjIxOTQ2NSAzMzMuNjYxMDgyIDEzMDkuNjMwMzg4IDQ3OC42Njk5MDcgMTMwOS42MzAzODggNjU2LjU1MDQ1NGMwIDEwMC4yODQ5NDctNjkuMzQ0OTI5IDE4OS4xNDMzNjktMTYyLjM2MTQyOCAyNTYuMTMwOTYzek03ODguMDcwMDg2IDUxMS44NjkwMzdhNDkuMTExMTQgNDkuMTExMTQgMCAwIDAtNDYuMzYwOTE2IDQ0LjQ5NDY5MiA0OC43ODM3MzIgNDguNzgzNzMyIDAgMCAwIDQ2LjM2MDkxNiA0NC40OTQ2OTMgNTIuMDkwNTQ5IDUyLjA5MDU0OSAwIDAgMCA1Ny45ODM4ODUtNDQuNDk0NjkzIDUyLjM4NTIxNiA1Mi4zODUyMTYgMCAwIDAtNTcuOTgzODg1LTQ0LjQ5NDY5MnogbTI1NC45ODUwMzYgMGE0OC44ODE5NTQgNDguODgxOTU0IDAgMCAwLTQ2LjA5ODk5IDQ0LjQ5NDY5MiA0OC42MjAwMjggNDguNjIwMDI4IDAgMCAwIDQ2LjA5ODk5IDQ0LjQ5NDY5MyA1Mi4zODUyMTYgNTIuMzg1MjE2IDAgMCAwIDU3Ljk4Mzg4Ni00NC40OTQ2OTMgNTIuNTgxNjYgNTIuNTgxNjYgMCAwIDAtNTcuOTUxMTQ1LTQ0LjQ5NDY5MnogbS01NTAuNTY4NjE1IDE1MC4wMTgxNjFhMzE4LjU2NzU5MiAzMTguNTY3NTkyIDAgMCAwIDE0LjMwNzcxMiA5My4yMTI5NDNjLTE0LjMwNzcxMiAxLjA4MDQ0NS0yOC43NDYzODcgMS43NjgwMDEtNDMuMjgzMjg0IDEuNzY4MDAxYTgyNy4yOTM1MTYgODI3LjI5MzUxNiAwIDAgMS0xNjIuMzk0MTY4LTIyLjI5NjQ1OGwtMTYyLjAwMTI3OSA3Ny45NTU3NDkgNDYuMzI4MTc1LTEzMy44MTE0ODVDNjkuNDEwNDExIDYwMC44NTg0MjIgMCA1MDAuNTA3OTkzIDAgMzc4LjM4NDk2IDAgMTY2LjY4MzIwOCAyMDguNjg5NjAyIDAgNDYzLjUxMDkzNSAwYzIyNy45MDg0MjggMCA0MjcuNTk0MzIyIDEzMy4xODk0MSA0NjcuNzAxNzUyIDMxMi4zNzk1ODhhNDI3LjQ2MzM1OCA0MjcuNDYzMzU4IDAgMCAwLTQ0LjYyNTY1NS0yLjYxOTI2MWMtMjIwLjI0NzA5IDAtMzk0LjEwMDUyNCAxNTcuNzQ0OTgtMzk0LjEwMDUyNSAzNTIuMTI2ODcxek0zMTIuOTAzNDQgMTg5LjE0MzM2OWE2NC4yNzAxMTEgNjQuMjcwMTExIDAgMCAwLTY5LjgwMzI5OSA1NS42NTkyOTEgNjQuNTMyMDM3IDY0LjUzMjAzNyAwIDAgMCA2OS44MDMyOTkgNTUuNjU5MjkyIDUzLjY5NDg0NiA1My42OTQ4NDYgMCAwIDAgNTcuODUyOTIzLTU1LjY1OTI5MiA1My40NjU2NjEgNTMuNDY1NjYxIDAgMCAwLTU3Ljg1MjkyMy01NS42NTkyOTF6IG0zMjQuNDI4MTg4IDBhNjQuMDQwOTI2IDY0LjA0MDkyNiAwIDAgMC02OS41NzQxMTQgNTUuNjU5MjkxIDY0LjMwMjg1MiA2NC4zMDI4NTIgMCAwIDAgNjkuNTc0MTE0IDU1LjY1OTI5MiA1My42OTQ4NDYgNTMuNjk0ODQ2IDAgMCAwIDU3Ljk1MTE0NS01NS42NTkyOTIgNTMuNDY1NjYxIDUzLjQ2NTY2MSAwIDAgMC01Ny45NTExNDUtNTUuNjU5MjkxelwiIHAtaWQ9XCI2Mjc1XCI+PC9wYXRoPjwvc3ZnPidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6ICdodHRwczovL3dlaXhpbi5xcS5jb20vJyxcclxuICAgICAgICAvLyBZb3UgY2FuIGluY2x1ZGUgYSBjdXN0b20gbGFiZWwgZm9yIGFjY2Vzc2liaWxpdHkgdG9vIChvcHRpb25hbCBidXQgcmVjb21tZW5kZWQpOlxyXG4gICAgICAgIGFyaWFMYWJlbDogJ3dlY2hhdCdcclxuICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICAvL1x1NjI0Qlx1NjczQVx1N0FFRlx1NkRGMVx1NkQ0NVx1NkEyMVx1NUYwRlx1NjU4N1x1NUI1N1x1NEZFRVx1NjUzOVxyXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1NkRGMVx1NkQ0NVx1NkEyMVx1NUYwRicsXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy9cdTk4NzVcdTgxMUFcclxuICAgIGZvb3Rlcjoge1xyXG4gICAgICBtZXNzYWdlOiAnUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLicsXHJcbiAgICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkgMjAyMy0ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gXHU1OTA3XHU2ODQ4XHU1M0Y3XHVGRjFBPGEgaHJlZj1cImh0dHBzOi8vYmVpYW4ubWlpdC5nb3YuY24vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XHU0RUFDKioqKlx1NTNGNzwvYT5gLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy9cdTRGQTdcdThGQjlcdTY4MEZcdTY1ODdcdTVCNTdcdTY2RjRcdTY1MzkoXHU3OUZCXHU1MkE4XHU3QUVGKVxyXG4gICAgc2lkZWJhck1lbnVMYWJlbDogJ1x1NzZFRVx1NUY1NScsXHJcblxyXG4gICAgLy9cdThGRDRcdTU2REVcdTk4NzZcdTkwRThcdTY1ODdcdTVCNTdcdTRGRUVcdTY1MzkoXHU3OUZCXHU1MkE4XHU3QUVGKVxyXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1x1OEZENFx1NTZERVx1OTg3Nlx1OTBFOCcsXHJcblxyXG5cclxuICAgIC8vXHU1OTI3XHU3RUIyXHU2NjNFXHU3OTNBMi0zXHU3RUE3XHU2ODA3XHU5ODk4XHJcbiAgICBvdXRsaW5lOiB7XHJcbiAgICAgIGxldmVsOiBbMiwgM10sXHJcbiAgICAgIGxhYmVsOiAnXHU1RjUzXHU1MjREXHU5ODc1XHU1OTI3XHU3RUIyJ1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy9cdTgxRUFcdTVCOUFcdTRFNDlcdTRFMEFcdTRFMEJcdTk4NzVcdTU0MERcclxuICAgIGRvY0Zvb3Rlcjoge1xyXG4gICAgICBwcmV2OiAnXHU0RTBBXHU0RTAwXHU5ODc1JyxcclxuICAgICAgbmV4dDogJ1x1NEUwQlx1NEUwMFx1OTg3NScsXHJcbiAgICB9LFxyXG5cclxuICB9LFxyXG5cclxuXHJcblxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcQ29kZUh1YlxcXFxMb2NhbFxcXFxibG9nX2Zyb250XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFx0aGVtZVxcXFx1bnRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGVIdWJcXFxcTG9jYWxcXFxcYmxvZ19mcm9udFxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdW50aWxzXFxcXHBlcm1hbGluay50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZUh1Yi9Mb2NhbC9ibG9nX2Zyb250L2RvY3MvLnZpdGVwcmVzcy90aGVtZS91bnRpbHMvcGVybWFsaW5rLnRzXCI7Ly8gXHU1QkZDXHU1MTY1XHU1RkM1XHU4OTgxXHU3Njg0XHU1RTkzXHJcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInOyAvLyBcdTc1MjhcdTRFOEVcdTg5RTNcdTY3OTBcdTU0OENcdTY0Q0RcdTRGNUNNYXJrZG93blx1NjU4N1x1NEVGNlx1NzY4NGZyb250bWF0dGVyXHJcbmltcG9ydCBmZyBmcm9tICdmYXN0LWdsb2InOyAgICAgIC8vIFx1NUZFQlx1OTAxRlx1NjU4N1x1NEVGNlx1N0NGQlx1N0VERlx1NTMzOVx1OTE0RFx1NUU5M1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnOyAgICAvLyBOb2RlLmpzXHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGUHJvbWlzZSBBUElcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7ICAgICAgICAgLy8gXHU4REVGXHU1Rjg0XHU1OTA0XHU3NDA2XHU1RTkzXHJcblxyXG4vKipcclxuICogXHU3NTFGXHU2MjEwXHU2MzA3XHU1QjlBXHU5NTdGXHU1RUE2XHU3Njg0XHU5NjhGXHU2NzNBXHU1QjU3XHU3QjI2XHU0RTMyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBcdTk3MDBcdTg5ODFcdTc1MUZcdTYyMTBcdTc2ODRcdTVCNTdcdTdCMjZcdTRFMzJcdTk1N0ZcdTVFQTZcclxuICogQHJldHVybnMge3N0cmluZ30gXHU3NTMxMC05XHU1NDhDYS1mXHU3RUM0XHU2MjEwXHU3Njg0XHU5NjhGXHU2NzNBXHU1QjU3XHU3QjI2XHU0RTMyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTdHJpbmcgPSAobGVuZ3RoOiBudW1iZXIpID0+IHtcclxuICBjb25zdCBjaGFyc2V0ID0gJzAxMjM0NTY3ODlhYmNkZWYnOyAvLyBcdTUzRUZcdTc1MjhcdTc2ODRcdTVCNTdcdTdCMjZcdTk2QzZcclxuICBsZXQgcmFuZG9tQ29kZSA9ICcnOyAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTdFRDNcdTY3OUNcdTVCNTdcdTdCMjZcdTRFMzJcclxuXHJcbiAgLy8gXHU1RkFBXHU3M0FGXHU3NTFGXHU2MjEwXHU2MzA3XHU1QjlBXHU5NTdGXHU1RUE2XHU3Njg0XHU5NjhGXHU2NzNBXHU1QjU3XHU3QjI2XHU0RTMyXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyc2V0Lmxlbmd0aCk7IC8vIFx1OTY4Rlx1NjczQVx1OTAwOVx1NTNENlx1NUI1N1x1N0IyNlx1N0QyMlx1NUYxNVxyXG4gICAgcmFuZG9tQ29kZSArPSBjaGFyc2V0W3JhbmRvbUluZGV4XTsgLy8gXHU1QzA2XHU5NjhGXHU2NzNBXHU1QjU3XHU3QjI2XHU2REZCXHU1MkEwXHU1MjMwXHU3RUQzXHU2NzlDXHU0RTJEXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmFuZG9tQ29kZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTRFQ0VNYXJrZG93blx1NTE4NVx1NUJCOVx1NEUyRFx1NjNEMFx1NTNENlx1NEUwMFx1N0VBN1x1NjgwN1x1OTg5OFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIE1hcmtkb3duXHU1MTg1XHU1QkI5XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFx1NjNEMFx1NTNENlx1NzY4NFx1NjgwN1x1OTg5OFx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NkNBMVx1NjcwOVx1NjI3RVx1NTIzMFx1NTIxOVx1OEZENFx1NTZERVx1N0E3QVx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gKi9cclxuY29uc3QgZXh0cmFjdFRpdGxlRnJvbUNvbnRlbnQgPSAoY29udGVudDogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAvLyBcdTUzMzlcdTkxNERcdTRFMDBcdTdFQTdcdTY4MDdcdTk4OThcdTc2ODRcdTZCNjNcdTUyMTlcdTg4NjhcdThGQkVcdTVGMEYgKFx1NjUyRlx1NjMwMSNcdTUyNERcdTU0MEVcdTUzRUZcdTgwRkRcdTY3MDlcdTdBN0FcdTY4M0NcdTc2ODRcdTYwQzVcdTUxQjUpXHJcbiAgY29uc3QgaDFSZWdleCA9IC9eXFxzKiNcXHMrKC4rPylcXHMqJC9tO1xyXG4gIGNvbnN0IG1hdGNoID0gY29udGVudC5tYXRjaChoMVJlZ2V4KTtcclxuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXS50cmltKCkgOiAnJztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTU5MDRcdTc0MDZcdTY1ODdcdTdBRTBNYXJrZG93blx1NjU4N1x1NEVGNlx1RkYwQ1x1NzUxRlx1NjIxMFx1NkMzOFx1NEU0NVx1OTRGRVx1NjNBNVx1NTQ4Q1x1OTFDRFx1NTE5OVx1ODlDNFx1NTIxOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFx1OTE0RFx1N0Y2RVx1OTAwOVx1OTg3OVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zcmNEaXIgLSBcdTZFOTBcdTc2RUVcdTVGNTVcdUZGMENcdTlFRDhcdThCQTRcdTRFM0EncGVybWFsaW5rJ1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5iYXNlRGlyIC0gXHU1N0ZBXHU3ODQwXHU3NkVFXHU1RjU1XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNBJ2RvY3MnXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFx1NTMwNVx1NTQyQlx1OTFDRFx1NTE5OVx1ODlDNFx1NTIxOVx1NzY4NFx1NUJGOVx1OEM2MVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHVzZVBvc3RzID0gYXN5bmMgKHtcclxuICBzcmNEaXIgPSAncGVybWFsaW5rJywgIC8vIFx1OUVEOFx1OEJBNFx1NkU5MFx1NzZFRVx1NUY1NVx1NEUzQSdwZXJtYWxpbmsnXHJcbiAgYmFzZURpciA9ICdkb2NzJyAgIC8vIFx1OUVEOFx1OEJBNFx1NTdGQVx1Nzg0MFx1NzZFRVx1NUY1NVx1NEUzQSdkb2NzJ1xyXG59ID0ge30pID0+IHtcclxuICBjb25zdCByZXdyaXRlcyA9IHt9OyAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTkxQ0RcdTUxOTlcdTg5QzRcdTUyMTlcdTVCRjlcdThDNjFcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIFx1NEY3Rlx1NzUyOGZhc3QtZ2xvYlx1NjdFNVx1NjI3RVx1NjI0MFx1NjcwOVx1NTMzOVx1OTE0RFx1NzY4NE1hcmtkb3duXHU2NTg3XHU0RUY2XHVGRjBDXHU0RjQ2XHU1RkZEXHU3NTY1aW5kZXgubWRcdTY1ODdcdTRFRjZcclxuICAgIGNvbnN0IHBhdGhzID0gKGF3YWl0IGZnKGAke2Jhc2VEaXJ9LyR7c3JjRGlyfS8qKi8qLm1kYCwge1xyXG4gICAgICBpZ25vcmU6IFsnKiovaW5kZXgubWQnXSAgLy8gXHU1RkZEXHU3NTY1XHU2MjQwXHU2NzA5aW5kZXgubWRcdTY1ODdcdTRFRjZcclxuICAgIH0pKS5zb3J0KCk7IC8vIFx1NjMwOVx1NUI1N1x1NkJDRFx1OTg3QVx1NUU4Rlx1NjM5Mlx1NUU4RlxyXG5cclxuICAgIC8vIFx1NTIxQlx1NUVGQVx1NEUwMFx1NEUyQVx1NjYyMFx1NUMwNFx1RkYwQ1x1NUI1OFx1NTBBOFx1NjI0MFx1NjcwOVx1NjU4N1x1NEVGNlx1NzY4NHBlcm1hbGlua1x1NTQ4Q3RpdGxlXHJcbiAgICBjb25zdCBwb3N0c01hcDogUmVjb3JkPHN0cmluZywgeyBwZXJtYWxpbms6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PiA9IHt9O1xyXG5cclxuICAgIC8vIFx1N0IyQ1x1NEUwMFx1OTA0RFx1RkYxQVx1NjUzNlx1OTZDNlx1NjI0MFx1NjcwOVx1NjU4N1x1NEVGNlx1NzY4NFx1NTdGQVx1NjcyQ1x1NEZFMVx1NjA2RlxyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICAgIHBhdGhzLm1hcChhc3luYyAocG9zdFBhdGgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGRhdGEsIGNvbnRlbnQgfSA9IG1hdHRlci5yZWFkKHBvc3RQYXRoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBcdTYzRDBcdTUzRDZcdTYyMTZcdThCQkVcdTdGNkV0aXRsZVxyXG4gICAgICAgIGlmICghZGF0YS50aXRsZSkge1xyXG4gICAgICAgICAgY29uc3QgZXh0cmFjdGVkVGl0bGUgPSBleHRyYWN0VGl0bGVGcm9tQ29udGVudChjb250ZW50KTtcclxuICAgICAgICAgIGlmIChleHRyYWN0ZWRUaXRsZSkge1xyXG4gICAgICAgICAgICBkYXRhLnRpdGxlID0gZXh0cmFjdGVkVGl0bGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBcdTc1MUZcdTYyMTBcdTYyMTZcdTRGN0ZcdTc1MjhcdTczQjBcdTY3MDlcdTc2ODRwZXJtYWxpbmtcclxuICAgICAgICBpZiAoIWRhdGEucGVybWFsaW5rKSB7XHJcbiAgICAgICAgICBkYXRhLnBlcm1hbGluayA9IGAvJHtzcmNEaXJ9LyR7Z2VuZXJhdGVTdHJpbmcoNil9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFx1NUI1OFx1NTBBOFx1NTIzMFx1NjYyMFx1NUMwNFx1NEUyRFxyXG4gICAgICAgIHBvc3RzTWFwW3Bvc3RQYXRoXSA9IHtcclxuICAgICAgICAgIHBlcm1hbGluazogZGF0YS5wZXJtYWxpbmssXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS50aXRsZSB8fCBwYXRoLmJhc2VuYW1lKHBvc3RQYXRoLCAnLm1kJylcclxuICAgICAgICB9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBcdTdCMkNcdTRFOENcdTkwNERcdUZGMUFcdThCQkVcdTdGNkVwcmV2L25leHRcdTVCRkNcdTgyMkFcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICBwYXRocy5tYXAoYXN5bmMgKHBvc3RQYXRoLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSwgY29udGVudCB9ID0gbWF0dGVyLnJlYWQocG9zdFBhdGgpO1xyXG4gICAgICAgIGNvbnN0IHByZXZQb3N0ID0gaW5kZXggPiAwID8gcG9zdHNNYXBbcGF0aHNbaW5kZXggLSAxXV0gOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5leHRQb3N0ID0gaW5kZXggPCBwYXRocy5sZW5ndGggLSAxID8gcG9zdHNNYXBbcGF0aHNbaW5kZXggKyAxXV0gOiBudWxsO1xyXG5cclxuICAgICAgICAvLyBcdThCQkVcdTdGNkVwcmV2XHU1QkZDXHU4MjJBXHJcbiAgICAgICAgaWYgKHByZXZQb3N0ICYmICFkYXRhLnByZXYpIHtcclxuICAgICAgICAgIGRhdGEucHJldiA9IHtcclxuICAgICAgICAgICAgdGV4dDogcHJldlBvc3QudGl0bGUsXHJcbiAgICAgICAgICAgIGxpbms6IHByZXZQb3N0LnBlcm1hbGlua1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFx1OEJCRVx1N0Y2RW5leHRcdTVCRkNcdTgyMkFcclxuICAgICAgICBpZiAobmV4dFBvc3QgJiYgIWRhdGEubmV4dCkge1xyXG4gICAgICAgICAgZGF0YS5uZXh0ID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiBuZXh0UG9zdC50aXRsZSxcclxuICAgICAgICAgICAgbGluazogbmV4dFBvc3QucGVybWFsaW5rXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gXHU1QzA2XHU2NkY0XHU2NUIwXHU1NDBFXHU3Njg0ZnJvbnRtYXR0ZXJcdTUxOTlcdTU2REVcdTY1ODdcdTRFRjZcclxuICAgICAgICBhd2FpdCBmcy53cml0ZUZpbGUoXHJcbiAgICAgICAgICBwb3N0UGF0aCxcclxuICAgICAgICAgIG1hdHRlci5zdHJpbmdpZnkoY29udGVudCwgZGF0YSksXHJcbiAgICAgICAgICAndXRmOCdcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBcdThCQTFcdTdCOTdcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdTVFNzZcdTZERkJcdTUyQTBcdTUyMzBcdTkxQ0RcdTUxOTlcdTg5QzRcdTUyMTlcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwb3N0UGF0aC5yZXBsYWNlKGAke2Jhc2VEaXJ9L2AsICcnKTtcclxuICAgICAgICByZXdyaXRlc1tyZWxhdGl2ZVBhdGgucmVwbGFjZSgvWysoKV0vZywgJ1xcXFwkJicpXSA9XHJcbiAgICAgICAgICBgJHtkYXRhLnBlcm1hbGlua30ubWRgLnNsaWNlKDEpLnJlcGxhY2UoL1srKCldL2csICdcXFxcJCYnKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHsgcmV3cml0ZXMgfTsgLy8gXHU4RkQ0XHU1NkRFXHU3NTFGXHU2MjEwXHU3Njg0XHU5MUNEXHU1MTk5XHU4OUM0XHU1MjE5XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTsgLy8gXHU2MzU1XHU4M0I3XHU1RTc2XHU2MjUzXHU1MzcwXHU5NTE5XHU4QkVGXHJcbiAgICByZXR1cm4geyByZXdyaXRlcyB9OyAvLyBcdTUzNzNcdTRGN0ZcdTUxRkFcdTk1MTlcdTRFNUZcdThGRDRcdTU2REVcdTUzRUZcdTgwRkRcdTkwRThcdTUyMDZcdTVCOENcdTYyMTBcdTc2ODRcdTkxQ0RcdTUxOTlcdTg5QzRcdTUyMTlcclxuICB9XHJcbn07Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VCxTQUFTLG9CQUFvQjtBQUdwVixPQUFPLDRCQUE0QjtBQUNuQyxTQUFTLG1CQUFtQixxQkFBcUIsdUJBQXVCO0FBQ3hFLFNBQVMsaUJBQWlCLHFCQUFxQjtBQUMvQyxPQUFPLHFCQUFxQjs7O0FDTDVCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFFBQVE7QUFDZixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFPVixJQUFNLGlCQUFpQixDQUFDLFdBQW1CO0FBQ2hELFFBQU0sVUFBVTtBQUNoQixNQUFJLGFBQWE7QUFHakIsV0FBUyxJQUFJ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RUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYjtBQUFBO0FBQUEsRUFH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
