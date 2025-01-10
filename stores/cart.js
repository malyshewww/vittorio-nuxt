const token = useToken();

export const useCartStore = defineStore("cart", () => {
   const URL = useRuntimeConfig().public.apiBase;
   const isOpenCart = ref(false);
   const cart = ref([]);
   const cartToken = ref("");
   const orderItems = ref([]);
   const totalPrice = ref([]);
   const cartTotalPrice = ref(0);
   const ORDER_ID = ref("");
   const productInfo = reactive({
      image: "",
      title: "",
      volume: "",
   });
   const isActiveCartPopup = ref(false);
   const isPromocodeValid = ref(false);
   const isPromocodeChecked = ref(false);
   const discount = ref("");
   const orderTotal = ref(0);
   const promocodeValue = ref("");
   const promocodeMessage = ref("");
   const couponCode = ref("");
   const count = ref(0);
   const totalCount = ref(0);
   const isLoading = ref(true);
   const openCart = () => {
      isOpenCart.value = true;
   };
   const closeCart = () => {
      isOpenCart.value = false;
   };
   const setCartToken = (token) => {
      cartToken.value = token;
   };
   async function addToCart(options, cartData) {
      const URL = useRuntimeConfig().public.apiBase;
      try {
         const response = await fetch(`${URL}/jsonapi/cart/add`, {
            method: "POST",
            body: JSON.stringify(options),
            headers: {
               Accept: "application/vnd.api+json",
               "Content-Type": "application/vnd.api+json",
               "Commerce-Cart-Token": token,
            },
         });
         if (response.ok) {
            const { data } = await response.json();
            const { attributes } = data[0];
            const { title } = attributes;
            productInfo.image = cartData.image;
            productInfo.volume = cartData.volume;
            productInfo.title = title;
            isActiveCartPopup.value = true;
            getCartItems();
            setTimeout(() => {
               isActiveCartPopup.value = false;
            }, 2000);
            console.log(productInfo);
         }
      } catch (e) {
         console.log("error", e);
      }
   }
   async function getCartItems() {
      isLoading.value = true;
      try {
         const response = await fetch(
            `${URL}/jsonapi/carts?include=order_items,coupons&jsonapi_include=1`,
            {
               headers: {
                  Accept: "application/vnd.api+json",
                  "Content-Type": "application/vnd.api+json",
                  "Commerce-Cart-Token": token,
               },
            }
         );
         const { data } = await response.json();
         if (data[0]) {
            console.log("Корзина", data);
            ORDER_ID.value = data[0].order_id;
            orderItems.value = data[0].order_items;
            if (orderItems.value.length) {
               orderItems.value = orderItems.value.map((item) => {
                  return {
                     ...item,
                     // Преобразуем в число количество товара
                     quantity: parseInt(item.quantity),
                  };
               });
               getCartTotal();
               getTotalCount();
               cartTotalPrice.value = data[0].total_price.number;
               orderTotal.value = data[0].order_total.subtotal.number;
            }
         }
         if (data[0] && data[0].order_total.adjustments.length) {
            discount.value = data[0].order_total.adjustments[0].total.formatted;
            promocodeValue.value =
               data[0].order_total.adjustments[0].coupon_code;
            // promocodeMessage.value = "Промокод применён";
            // isPromocodeValid.value = true;
         }
         isLoading.value = false;
      } catch (error) {
         console.log("error", error);
         isLoading.value = false;
      } finally {
         isLoading.value = false;
      }
   }
   function getCartTotal() {
      if (orderItems.value.length) {
         // Вычисляем общую сумму заказа
         totalPrice.value = orderItems.value.reduce(
            (currentSum, currentNumber) => {
               return currentSum + parseInt(currentNumber.total_price.number);
            },
            0
         );
      }
   }
   function getTotalCount() {
      if (orderItems.value.length) {
         // Вычисляем общую сумму заказа
         totalCount.value = orderItems.value.reduce(
            (currentSum, currentNumber) => {
               return currentSum + parseInt(currentNumber.quantity);
            },
            0
         );
         console.log("totala count", totalCount.value);
      }
   }
   function calcCartQuantity(num, action) {
      if (action === "plus") {
         count.value += num;
         // totalCount.value++;
      } else {
         count.value -= num;
         // totalCount.value--;
      }
      totalCount.value = count;
   }
   function decreaseCartSum(product, quantity) {
      changeQuantity(product, quantity, "minus");
   }
   function increaseCartSum(product, quantity) {
      changeQuantity(product, quantity, "plus");
   }
   async function changeQuantity(product, quantity, type) {
      try {
         const opts = {
            data: {
               type: "order-items--default",
               id: product.uuid,
               attributes: {
                  quantity: quantity,
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
                  "Commerce-Cart-Token": token,
               },
               body: JSON.stringify(opts),
            }
         );
         if (response.ok) {
            // const result = await response.json();
            // Обновить корзину
            getCartItems();
            if (type === "plus") {
               calcCartQuantity(totalCount.value, "plus");
            } else {
               calcCartQuantity(totalCount.value, "minus");
            }
         } else {
            throw new Error("error occured");
         }
      } catch (error) {
         console.log(error);
      }
   }
   // Увеличение либо уменьшение количества товара (не подходит, т.к. изменяются только локальные данные)
   // function checkTypeActionButton(product, type) {
   //    const item = orderItems.value.find((item) => item.id === product.id);
   //    if (type === "plus") {
   //       if (item) {
   //          if (item.quantity) {
   //             return item.quantity++;
   //          }
   //       } else {
   //          orderItems.value.push({ ...product, quantity: 1 });
   //       }
   //    } else {
   //       if (item) {
   //          if (item.quantity && item.quantity > 1) {
   //             return item.quantity--;
   //          } else {
   //             orderItems.value = orderItems.value.filter(
   //                (item) => item.id !== product.id
   //             );
   //          }
   //       }
   //    }
   // }
   async function deleteProduct(product) {
      console.log(product);
      try {
         const options = {
            data: [
               {
                  type: "order-item--default",
                  id: product.uuid,
               },
            ],
         };
         const response = await fetch(
            `${URL}/jsonapi/carts/${ORDER_ID.value}/items`,
            {
               method: "DELETE",
               headers: {
                  Accept: "application/vnd.api+json",
                  "Commerce-Cart-Token": token,
               },
               body: JSON.stringify(options),
            }
         );
         const result = await response.json();
         console.log(result);
         if (response.ok) {
            // Обновить корзину
            getCartItems();
            calcCartQuantity(product.quanity, "minus");
         } else {
            throw new Error(`${response.status} ${response.statusText}`);
         }
      } catch (error) {
         console.log(`Error from delete item: ${error}`);
      }
   }
   async function checkPromocode(inputValue) {
      try {
         const options = {
            data: [
               {
                  type: "promotion-coupon",
                  id: inputValue,
               },
            ],
         };
         const response = await fetch(
            `${URL}/jsonapi/carts/${ORDER_ID.value}/coupons`,
            {
               method: "PATCH",
               headers: {
                  Accept: "application/vnd.api+json",
                  "Content-Type": "application/vnd.api+json",
                  "Commerce-Cart-Token": token,
               },
               body: JSON.stringify(options),
            }
         );
         const result = await response.json();
         console.log(result);
         if (response.ok) {
            isPromocodeValid.value = true;
            promocodeMessage.value = "Промокод применён";
            promocodeValue.value = inputValue;
            console.log("value", promocodeValue.value);
         } else {
            isPromocodeValid.value = false;
            promocodeMessage.value = "Промокод не найден";
            throw new Error(`${response.status}, ${response.statusText}`);
         }
      } catch (error) {
         console.log(error);
         isPromocodeValid.value = false;
         promocodeValue.value = "";
         promocodeMessage.value = "Промокод не найден";
      } finally {
         getCartItems();
      }
      isPromocodeChecked.value = true;
   }
   async function deletePromocode() {
      try {
         const options = {
            data: [
               {
                  type: "promotion-coupon",
               },
            ],
         };
         const response = await fetch(
            `${URL}/jsonapi/carts/${ORDER_ID.value}/coupons`,
            {
               method: "DELETE",
               headers: {
                  Accept: "application/vnd.api+json",
                  "Content-Type": "application/vnd.api+json",
                  "Commerce-Cart-Token": token,
               },
               body: JSON.stringify(options),
            }
         );
         if (response.ok) {
            isPromocodeValid.value = false;
            promocodeMessage.value = "";
            discount.value = 0;
         } else {
            throw new Error(`${response.status} ${response.statusText}`);
         }
      } catch (error) {
         console.log("Error from delete promocode", error);
      } finally {
         getCartItems();
      }
      isPromocodeChecked.value = false;
   }
   return {
      cart,
      isOpenCart,
      openCart,
      closeCart,
      getCartItems,
      setCartToken,
      totalPrice,
      cartTotalPrice,
      orderItems,
      ORDER_ID,
      changeQuantity,
      addToCart,
      productInfo,
      isActiveCartPopup,
      deleteProduct,
      decreaseCartSum,
      increaseCartSum,
      getCartTotal,
      isPromocodeValid,
      isPromocodeChecked,
      promocodeValue,
      promocodeMessage,
      checkPromocode,
      deletePromocode,
      discount,
      orderTotal,
      couponCode,
      totalCount,
      getTotalCount,
      count,
      isLoading,
   };
});
