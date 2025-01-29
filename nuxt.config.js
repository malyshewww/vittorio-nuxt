// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import autoprefixer from "autoprefixer";
import postCssSortMediaQueries from "postcss-sort-media-queries";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt", "@nuxtjs/device", "@nuxt/image"],
  components: [
    // импорт компонентов, основываясь только на их имени, а не на пути (pathPrefix: false)
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  // content: {
  //    watch: {
  //       ws: {
  //          hostname: "dev.localhost", // 0.0.0.0
  //          port: "8002", // 8000
  //          showURL: true,
  //       },
  //    },
  // },
  ssr: true,
  app: {
    // pageTransition: {
    //   mode: "out-in",
    //   name: "fade",
    // },
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "apple-mobile-web-app-title",
          name: "apple-mobile-web-app-title",
          content: "Vittorio",
        },
        {
          hid: "apple-mobile-web-app-capable",
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "telephone=no",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "address=no",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "email=no",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "date=no",
        },
      ],
    },
  },
  devServer: {
    host: "localhost",
    port: 3000,
  },
  image: {
    format: ["webp", "png", "jpg"],
  },
  nitro: {
    publicAssets: [
      {
        dir: "public",
      },
    ],
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          postCssSortMediaQueries({ sort: "desktop-first" }),
          autoprefixer({
            overrideBrowserslist: ["last 3 versions", "ie >= 10"],
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@use "assets/scss/mixins" as *;',
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
  compatibilityDate: "2024-12-11",
});
