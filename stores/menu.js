export const useMenuStore = defineStore("menu", () => {
  const isOpen = ref(false);
  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };
  const openMenu = () => {
    isOpen.value = true;
  };
  const closeMenu = () => {
    isOpen.value = false;
  };
  return {
    isOpen,
    toggleMenu,
    openMenu,
    closeMenu,
  };
});
