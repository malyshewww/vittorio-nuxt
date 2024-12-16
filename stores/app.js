export const useAppStore = defineStore("app", () => {
   const isHeaderVisible = ref(true);
   return {
      isHeaderVisible,
   };
});
