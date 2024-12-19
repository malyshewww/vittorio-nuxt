<template lang="pug">
	.app-cart__total.cart-total
		ul.cart-total__list
			li.cart-total__item
				div.cart-total__caption
					span Стоимость товаров
				div.cart-total__value {{formatNumber(cartStore.orderTotal)}}
			li.cart-total__item(v-if="cartStore.discount")
				div.cart-total__caption 
					span Скидка
				div.cart-total__value {{cartStore.discount}}
		.cart-total__result.cart-result
			.cart-result__caption Итого
			.cart-result__value {{formatNumber(cartStore.cartTotalPrice)}}
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();
const { orderTotal, cartTotalPrice } = cartStore;
</script>

<style lang="scss">
@use "assets/scss/mixins" as m;
.app-cart {
   // .app-cart__total
   &__total {
      display: grid;
      grid-template-columns: 100%;
      gap: 16px;
   }
}
.cart-total {
   // .cart-total__list
   &__list {
      @include m.reset-list;
      display: flex;
      flex-direction: column;
      gap: 8px;
   }
   // .cart-total__item
   &__item {
      display: flex;
      justify-content: space-between;
   }
   // .cart-total__caption
   &__caption {
      position: relative;
      flex-grow: 1;
      &::before {
         content: "";
         border-bottom: 1px dashed rgba(#3c3a37, 0.3);
         bottom: 2px;
         display: block;
         left: 0;
         position: absolute;
         width: 100%;
      }
      & span {
         background-color: var(--bg-milk);
         display: inline-block;
         line-height: 22px;
         padding-right: 4px;
         position: relative;
         z-index: 2;
      }
   }
   // .cart-total__value
   &__value {
      font-weight: 700;
      line-height: 22px;
      padding-left: 4px;
   }
   // .cart-total__result
   &__result {
   }
}
.cart-result {
   display: flex;
   justify-content: space-between;
   gap: 20px;
   font-weight: 700;
   font-size: 18px;
   line-height: 26px;
   // .cart-result__caption
   &__caption {
   }
   // .cart-result__value
   &__value {
      text-align: right;
   }
}
</style>
