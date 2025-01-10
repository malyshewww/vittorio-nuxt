export const useAppStore = defineStore("app", () => {
   const isHeaderVisible = ref(true);
   const scrollY = ref(0);
   const isNavigationVisible = ref(false);
   const isMobile = ref(false);
   const isDisabledBurger = ref(false);
   return {
      isHeaderVisible,
      scrollY,
      isNavigationVisible,
      isMobile,
      isDisabledBurger,
   };
});
