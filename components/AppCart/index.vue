<template lang="pug">
	.app-cart(:class="{active: cartStore.isOpenCart}" @click="closeCart")
		.app-cart__wrapper
			div(v-if="orderItems.length > 0")
				.app-cart__body(@click.stop)
					UiButtonLine(text="Скрыть" @click="closeCart")
					.app-cart__products
						.app-cart__caption.cart-caption Корзина
						.app-cart__items
							AppCartItem(v-for="(item, index) in orderItems" :key="item.id" :item="item")
						AppCartPromocode
					AppCartOrder
					AppCartTotal(:total-price="totalPrice")
				UiButtonPrimary(title="Оформить заказ" class-names="app-cart-button")
			div(v-else)
				.app-cart__body(@click.stop)
					UiButtonLine(text="Скрыть" @click="closeCart")
					AppCartEmpty
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const closeCart = () => {
   cartStore.closeCart();
};

const token = useToken();
const totalPrice = ref([]);

const orderItems = ref([]);

const state = reactive({
   items: [
      {
         img: "1",
         title: "Velvet Peony",
         volume: "100 мл",
         price: "7 890 ₽",
         oldPrice: "9 560 ₽",
      },
      {
         img: "2",
         title: "Legend № 11.01",
         volume: "100 мл",
         price: "7 890 ₽",
      },
   ],
});

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/jsonapi/carts?include=order_items,coupons&jsonapi_include=1`;

async function getCartItems() {
   try {
      const cartResponse = await fetch(url, {
         headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Commerce-Cart-Token": token,
         },
      });
      const cart = await cartResponse.json();
      orderItems.value = cart.data[0].order_items;
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
   } catch (error) {
      console.log("error", error);
   }
}

onMounted(() => {
   getCartItems();
});
</script>

<style lang="scss">
@use "assets/scss/vars.scss" as *;
.app-cart {
   position: fixed;
   z-index: 30;
   top: 0;
   right: 0;
   height: 100dvh;
   width: 100%;
   display: flex;
   justify-content: flex-end;
   background: rgba(#24221f, 0.2);
   opacity: 0;
   pointer-events: none;
   transition: opacity $time $ttm;
   &.active {
      opacity: 1;
      pointer-events: all;
      & .app-cart__wrapper {
         transform: translateX(0%);
      }
   }
   &__wrapper {
      background: var(--bg-milk);
      width: 36.823vw;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      transform: translateX(100%);
      transition: transform $time * 2 $ttm;
      &::-webkit-scrollbar {
         display: none;
      }
   }
   &__body {
      display: grid;
      grid-template-columns: 100%;
      gap: 80px;
      padding: 30px 50px 60px;
   }
   &__bottom {
      display: flex;
      flex-direction: column;
      gap: 60px;
   }
   &__items {
      padding-top: 8px;
      border-top: 1px solid var(--bg-smoke);
      display: grid;
      grid-template-columns: 100%;
      align-items: start;
      gap: 7px;
   }
   & .btn-line {
      justify-self: end;
      position: sticky;
      top: 20px;
   }
}
.cart-caption {
   font-family: var(--second-family);
   font-weight: 500;
   font-size: 36px;
   line-height: 44px;
   text-transform: uppercase;
   margin-bottom: 40px;
   .app-cart__order & {
      margin-bottom: 24px;
   }
}
.app-cart-button.btn {
   position: sticky;
   z-index: 5;
   width: 100%;
   bottom: 0;
   right: 0;
   border-radius: 0;
   min-height: 56px;
}
</style>
