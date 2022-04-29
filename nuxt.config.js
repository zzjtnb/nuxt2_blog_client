const axios = require("axios");
const CopyWebpackPlugin = require("copy-webpack-plugin");
import path from "path";
export default {
  // buildDir: 'nuxtDist',
  /*必须
   * Nuxt rendering mode
   * See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*必须
   * Nuxt target
   * See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  server: {
    port: 4000, // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: "zh-Hans-CN",
    },
    title: "争逐",
    titleTemplate: "%s - 争逐",
    meta: [
      {
        charset: "utf-8",
      },
      {
        hid: "Author",
        name: "Author",
        content: "争逐",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "Java,Vue,HTML,CSS,编程,博客,知识,系统,争逐,政治,经济,军事,历史,天文,地理,人文,哲学",
      },
      {
        hid: "description",
        name: "description",
        content: "纵观天下之势,发展强国之道",
      },
      {
        hid: "Copyright",
        name: "Copyright",
        content: "争逐版权所有",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style ",
        content: "black",
      },
      {
        name: "apple-mobile-web-app-title",
        content: "争逐",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
    script: [
      {
        src: "https://hm.baidu.com/hm.js?a057b05461e29d48424082ddb0cc2109",
      },
    ],
  },
  router: {
    linkActiveClass: "",
    linkExactActiveClass: "text-white",
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/common.css", "@/assets/css/transition.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios",
    {
      src: "~plugins/baidu.js",
    },
    "~plugins/checkBeforeEach.js", // 全局路由守卫插件
    {
      src: "~/plugins/vue-plyr",
      ssr: false,
    },
    {
      src: "@/plugins/vue-mavon-editor",
      ssr: false,
    },
    {
      src: "~/plugins/vue-google-adsense",
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    //https://www.npmjs.com/package/@nuxtjs/sitemap
    "@nuxtjs/sitemap",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // debug: true, //开发模式下开启debug
    proxy: true,
  },
  proxy: {
    "/api": {
      // target: "http://localhost:5000", // 代理地址
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api", //将 /api 替换掉
      },
    },
  },
  sitemap: {
    path: "/sitemap.xml", // sitemap名稱，不用改
    hostname: "http://localhost:5000", // 網址
    // hostname: process.env.BASE_URL, // 網址
    cacheTime: 1000 * 60 * 60 * 24, // 站點路由更新頻率，(24小时),只在 generate: false有用
    gzip: true, // 生成 .xml.gz 檔的 sitemap
    // 排除不要的頁面路由
    exclude: ["/test/**", "/blog/common/**", "/user/account"],
    sitemaps: [
      {
        path: "/sitemap-blog.xml",
        defaults: {
          changefreq: "daily", // 页面内容更新频率。
          priority: 1, // 網頁的重要程度，0.1 - 1
          lastmod: new Date(), //页面最后修改时间
          mobile: "mobile type=pc,mobile", //自适应网页
        },
        exclude: ["/test/**", "/blog/common/**", "/user/**"],
        // 靜態頁面路徑
        routes: async () => {
          const { data } = await axios.get(
            "http://localhost:5000/api/v1/blog/sitemap"
          );
          return data.rows.map((v) => {
            return {
              url: `/blog/details/${v.path}`, //相对于前4个标签的父标签
              lastmod: v.updated,
            };
          });
        },
      },
      {
        path: "/sitemap-video.xml",
        defaults: {
          changefreq: "daily", // 页面内容更新频率。
          priority: 1, // 網頁的重要程度，0.1 - 1
          lastmod: new Date(), //页面最后修改时间
          mobile: "mobile type=pc,mobile", //自适应网页
        },
        exclude: ["/test/**", "/blog/common/**", "/user/**"],
        // 靜態頁面路徑
        routes: async () => {
          const { data } = await axios.get(
            "http://localhost:5000/api/v1/video/sitemap"
          );
          return data.rows.map((v) => {
            return {
              url: `/video/details/${v.path}`, //相对于前4个标签的父标签
              lastmod: v.updated,
            };
          });
        },
      },
    ],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "争逐",
      short_name: "争逐",
      description: "恭喜你发现了世界上99%的人还没有发现的宝藏",
      background_color: "#0064d2",
      theme_color: "#2d3748",
      icon: [
        {
          src: "/icons/android-chrome-512x512.png",
          size: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-192x192.png",
          size: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/apple-touch-icon-152x152.png",
          size: "152x152",
          type: "image/png",
        },
        {
          src: "/icons/msapplication-icon-144x144.png",
          size: "144x144",
          type: "image/png",
        },
        {
          src: "/icons/apple-touch-icon-120x120.png",
          size: "120x120",
          type: "image/png",
        },
        {
          src: "/icons/favicon-16x16.png",
          size: "16x16",
          type: "image/png",
        },
      ],
    },
    meta: {
      lang: "zh-Hans-CN",
      mobileAppIOS: true,
    },
    workbox: {
      /* workbox options */
      workboxURL:
        "https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js",
      enabled: true,
      workboxVersion: "1.0.0",
      cacheNames: {
        prefix: "zzjtnb",
        suffix: "v1",
        precache: "precache",
        runtime: "runtime",
      },
      cacheOptions: {
        cacheId: "zzjtnb",
        directoryIndex: "/",
      },
      runtimeCaching: [
        {
          urlPattern: "https://fonts.googleapis.com/.*",
          strategyOptions: {
            cacheName: "fonts",
            cacheableResponse: { statuses: [0, 200] },
          },
          strategyPlugins: [
            {
              use: "Expiration",
              config: {
                // 最多保留60个条目
                maxEntries: 60,
                // 请勿将任何条目保留超过30天
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // 如果超过浏览器配额，则自动清除
                purgeOnQuotaError: true,
              },
            },
          ],
        },
        {
          urlPattern: "http://pagead2.googlesyndication.com/.*",
          strategyOptions: {
            cacheName: "adsense",
            cacheableResponse: { statuses: [0, 200] },
          },
          strategyPlugins: [
            {
              use: "Expiration",
              config: {
                // 最多保留60个条目
                maxEntries: 60,
                // 请勿将任何条目保留超过30天
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // 如果超过浏览器配额，则自动清除
                purgeOnQuotaError: true,
              },
            },
          ],
        },
      ],
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //提取css到单独link文件
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    extend(config, ctx) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "node_modules/mavon-editor/dist/highlightjs",
              to: path.resolve(__dirname, "../dist/highlightjs"), // 插件将会把文件导出于/dist/highlightjs之下
            },
            {
              from: "node_modules/mavon-editor/dist/markdown",
              to: path.resolve(__dirname, "../dist/markdown"), // 插件将会把文件导出于/dist/markdown之下
            },
            {
              from: "node_modules/mavon-editor/dist/katex", // 插件将会把文件导出
              to: path.resolve(__dirname, "../dist/katex"),
            },
          ],
        })
      );
      return config;
    },

    postcss: {
      plugins: {
        "postcss-custom-properties": false,
      },
    },

    // 开启打包分析
    // analyze: true,
  },
};
