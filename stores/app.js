export const useAppStore = defineStore("app", () => {
   const isHeaderVisible = ref(true);
   const scrollY = ref(0);
   return {
      isHeaderVisible,
      scrollY,
   };
});
