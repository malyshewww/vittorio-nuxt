export const useCartStore = defineStore("cart", () => {
   const isOpenCart = ref(false);
   const openCart = () => {
      isOpenCart.value = true;
   };
   const closeCart = () => {
      isOpenCart.value = false;
   };
   return {
      isOpenCart,
      openCart,
      closeCart,
   };
});
