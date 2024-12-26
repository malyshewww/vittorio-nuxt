export const useAppStore = defineStore("app", () => {
   const isHeaderVisible = ref(true);
   const scrollY = ref(0);
   const isNavigationVisible = ref(false);
   return {
      isHeaderVisible,
      scrollY,
      isNavigationVisible,
   };
});
