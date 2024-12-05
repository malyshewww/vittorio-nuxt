import LocomotiveScroll from "locomotive-scroll";

export default defineNuxtPlugin((nuxtApp) => {
   return {
      provide: {
         LocomotiveScroll,
      },
   };
});
