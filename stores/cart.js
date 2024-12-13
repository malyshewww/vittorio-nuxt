export const useCartStore = defineStore("cart", () => {
   const isOpenCart = ref(true);
   const cart = ref([]);
   const cartToken = ref("");
   const openCart = () => {
      isOpenCart.value = true;
   };
   const closeCart = () => {
      isOpenCart.value = false;
   };
   const setCartToken = (token) => {
      cartToken.value = token;
   };
   async function getCartItems(response) {
      const { data } = response;
      try {
         cart.value = data;
      } catch (error) {
         console.log("Error", error);
      }
   }
   const addProductToCart = (product) => {
      console.log(product);
   };
   return {
      cart,
      isOpenCart,
      openCart,
      closeCart,
      getCartItems,
      setCartToken,
   };
});
