export const useAppStore = defineStore("app", () => {
  const isHeaderVisible = ref(true);
  const scrollY = ref(0);
  const isNavigationVisible = ref(false);
  const isMobile = ref(false);
  const isDisabledBurger = ref(false);
  const isDisabledButtonCart = ref(false);
  const currentHash = ref("");
  const isBackWithAroma = ref(false);
  const isButtonUpVisible = ref(false);
  const isButtonUpMode = ref(false);
  const removeHash = () => {
    currentHash.value = null;
    isBackWithAroma.value = false;
  };
  return {
    isHeaderVisible,
    scrollY,
    isNavigationVisible,
    isMobile,
    isDisabledBurger,
    isDisabledButtonCart,
    currentHash,
    isButtonUpVisible,
    isButtonUpMode,
    isBackWithAroma,
    removeHash,
  };
});
