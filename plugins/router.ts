import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(({ $router }) => {
  $router.options.scrollBehavior = (savedPosition: any, to: { hash: any }) => {
    // if (to.hash) {
    //   return {
    //     el: to.hash,
    //     top: 64,
    //     behaviour: "smooth",
    //   };
    // }
  };
});
