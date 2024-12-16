const token = useToken();

export const useCartStore = defineStore("cart", () => {
   const URL = useRuntimeConfig().public.apiBase;
   const isOpenCart = ref(true);
   const cart = ref([]);
   const cartToken = ref("");
   const orderItems = ref([]);
   const totalPrice = ref([]);
   const ORDER_ID = ref("");
   // const productInfo = reactive({
   //    image: "",
   //    title: "",
   //    volume: "",
   // });
   const openCart = () => {
      isOpenCart.value = true;
   };
   const closeCart = () => {
      isOpenCart.value = false;
   };
   const setCartToken = (token) => {
      cartToken.value = token;
   };
   async function addToCart(options) {
      // const URL = useRuntimeConfig().public.apiBase;
      // try {
      //    const response = await fetch(`${URL}/jsonapi/cart/add`, {
      //       method: "POST",
      //       body: JSON.stringify(options),
      //       headers: {
      //          Accept: "application/vnd.api+json",
      //          "Content-Type": "application/vnd.api+json",
      //          "Commerce-Cart-Token": token,
      //       },
      //    });
      //    if (response.ok) {
      //       const { data } = await response.json();
      //       console.log(data);
      //       const { attributes } = data[0];
      //       const { locked, quantity, title, total_price, unit_price } =
      //          attributes;
      //       productInfo.volume = parseInt(quantity);
      //       productInfo.title = title;
      //    }
      // } catch (e) {
      //    console.log("error", e);
      // }
   }
   async function getCartItems() {
      try {
         const cartResponse = await fetch(
            `${URL}/jsonapi/carts?include=order_items,coupons&jsonapi_include=1`,
            {
               headers: {
                  Accept: "application/vnd.api+json",
                  "Content-Type": "application/vnd.api+json",
                  "Commerce-Cart-Token": token,
               },
            }
         );
         const { data } = await cartResponse.json();
         console.log(data);
         if (cartResponse.ok) {
            orderItems.value = data[0].order_items;
            ORDER_ID.value = data[0].id;
         } else {
            if (cartResponse.status === 404) {
               console.log("res");
            }
            throw new Error();
         }
         if (orderItems.value.length) {
            orderItems.value = orderItems.value.map((item) => {
               return {
                  ...item,
                  // Преобразуем в число количество товара
                  quantity: parseInt(item.quantity),
               };
            });
            // Вычисляем общую сумму заказа
            totalPrice.value = orderItems.value.reduce(function (
               currentSum,
               currentNumber
            ) {
               return currentSum + parseInt(currentNumber.total_price.number);
            },
            0);
         }
      } catch (error) {
         console.log("error", error);
      }
   }
   async function changeQuantity(product, type) {
      console.log("order", ORDER_ID.value);
      try {
         const options = {
            data: {
               type: "order-items--default",
               id: product.id,
               attributes: {
                  quantity: product.quantity,
               },
            },
         };
         const response = await fetch(
            `${URL}/jsonapi/carts/${ORDER_ID.value}/items/${product.id}`,
            {
               method: "PATCH",
               headers: {
                  Accept: "application/vnd.api+json",
                  "Content-Type": "application/vnd.api+json",
               },
               body: JSON.stringify(options),
            }
         );
         const result = await response.json();
         if (result.ok) {
            console.log("ok", result);
         }
      } catch (error) {
         console.log(error);
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
      totalPrice,
      orderItems,
      ORDER_ID,
      changeQuantity,
   };
});
