// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import autoprefixer from "autoprefixer";
import postCssSortMediaQueries from "postcss-sort-media-queries";

export default defineNuxtConfig({
   compatibilityDate: "2024-04-03",
   devtools: { enabled: true },
   modules: ["@pinia/nuxt"],
   runtimeConfig: {
      public: {
         apiBase: process.env.NUXT_PUBLIC_API_BASE_URL,
      },
   },
   app: {
      head: {
         htmlAttrs: {
            lang: "ru",
         },
         link: [
            { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
            { rel: "shortcut icon", href: "/favicon.ico" },
            // {
            //    rel: "apple-touch-icon",
            //    type: "image/png",
            //    sizes: "180x180",
            //    href: "/apple-touch-icon.png",
            // },
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
               content: "width=device-width, initial-scale=1, user-scalable=no",
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
   vite: {
      server: {
         port: 3001,
         host: "0.0.0.0",
         strictPort: true,
         hmr: {
            port: 3001,
         },
      },
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
               // api: "modern",
               // silenceDeprecations: ["import"],
               additionalData:
                  '@use "sass:math"; @use "~/assets/scss/mixins.scss" as *; @import "~/assets/scss/vars.scss";',
               silenceDeprecations: ["legacy-js-api"],
            },
         },
      },
   },
});
