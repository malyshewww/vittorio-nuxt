<template lang="pug">
	.app-cart(:class="{active: cartStore.isOpenCart}" @click="closeCart")
		.app-cart__wrapper
			div(v-if="state.items.length")
				.app-cart__body(@click.stop)
					UiButtonLine(text="Скрыть" @click="closeCart")
					.app-cart__products
						.app-cart__caption.cart-caption Корзина
						.app-cart__items
							AppCartItem(v-for="(item, index) in state.items" :key="index" :item="item")
						AppCartPromocode
					AppCartOrder
					AppCartTotal
				UiButtonPrimary(title="Оформить заказ" class-names="app-cart-button")
			div(v-else)
				.app-cart__body(@click.stop)
					UiButtonLine(text="Скрыть" @click="closeCart")
					AppCartEmpty
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const isOpen = ref(cartStore.isOpenCart);

const closeCart = () => {
   cartStore.closeCart();
};

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
