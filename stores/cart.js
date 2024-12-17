const token = useToken();

export const useCartStore = defineStore("cart", () => {
   const URL = useRuntimeConfig().public.apiBase;
   const isOpenCart = ref(true);
   const cart = ref([]);
   const cartToken = ref("");
   const orderItems = ref([]);
   const totalPrice = ref([]);
   const priceWithoutDiscount = ref(0);
   const sale = ref(0);
   const ORDER_ID = ref("");
   const productInfo = reactive({
      image: "",
      title: "",
      volume: "",
   });
   const isActiveCartPopup = ref(false);
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
         console.log("Корзина", data);
         if (response.ok) {
            orderItems.value = data[0].order_items;
            ORDER_ID.value = data[0].order_id;
         } else {
            if (response.status === 404) {
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
            getCartTotal();
            getPriceWithoutDiscount();
            getSale();
         }
      } catch (error) {
         console.log("error", error);
      }
   }
   function getSale() {
      if (orderItems.value.length) {
         sale.value = priceWithoutDiscount.value - totalPrice.value;
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
   function decreaseCartSum(product, type) {
      console.log(product, type);
      // changeQuantity(product, type).then(() => {
      //    getCartItems();
      //    getCartTotal();
      // });
   }
   function increaseCurtSum(product, type) {
      console.log(product, type);
   }
   async function changeQuantity(product, type) {
      console.log("order id", ORDER_ID.value);
      const { uuid, id } = product;
      try {
         const opts = {
            data: {
               type: "order-items--default",
               id: uuid,
               attributes: {
                  quantity: product.quantity,
               },
            },
         };
         const response = await fetch(
            `${URL}/jsonapi/carts/${ORDER_ID.value}/items/${id}`,
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
         const result = await response.json();
         const { data } = result;
         if (response.ok) {
            checkTypeActionButton(product, type);
         }
      } catch (error) {
         console.log(error);
      } finally {
      }
   }
   function checkTypeActionButton(product, type) {
      const item = orderItems.value.find((item) => item.id === product.id);
      if (type === "plus") {
         if (item) {
            if (item.quantity) {
               return item.quantity++;
            }
         } else {
            orderItems.value.push({ ...product, quantity: 1 });
         }
      } else {
         if (item) {
            if (item.quantity && item.quantity > 1) {
               return item.quantity--;
            } else {
               orderItems.value = orderItems.value.filter(
                  (item) => item.id !== product.id
               );
            }
         }
      }
   }
   function getPriceWithoutDiscount() {
      // Подсчет цены без скидки
      if (orderItems.value.length) {
         // Вычисляем общую сумму заказа
         priceWithoutDiscount.value = orderItems.value.reduce(
            (currentSum, currentNumber) => {
               return (
                  currentSum + parseInt(currentNumber.list_price_total.number)
               );
            },
            0
         );
         return priceWithoutDiscount.value;
      }
   }
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
         } else {
            throw new Error(`${response.status} ${response.statusText}`);
         }
      } catch (error) {
         console.log(`Error from delete item: ${error}`);
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
      addToCart,
      productInfo,
      isActiveCartPopup,
      deleteProduct,
      decreaseCartSum,
      increaseCurtSum,
      getCartTotal,
      sale,
      priceWithoutDiscount,
   };
});
