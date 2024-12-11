<template lang="pug">
	.app-cart
		.app-cart__wrapper
			UiButtonLine(text="Скрыть")
			.app-cart__products
				.app-cart__caption.cart-caption Корзина
				.app-cart__items
					AppCartItem(v-for="(item, index) in items" :key="index" :item="item")
			AppCartOrder
			AppCartTotal
		UiButtonPrimary(title="Оформить заказ" class-names="app-cart-button")
</template>

<script setup>
const items = [
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
];
</script>

<style lang="scss">
.app-cart {
   position: fixed;
   z-index: 30;
   background: var(--bg-milk);
   top: 0;
   right: 0;
   height: 100dvh;
   width: 36.823vw;
   overflow-y: auto;
   overflow-x: hidden;
   &::-webkit-scrollbar {
      display: none;
   }
   &__wrapper {
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
   width: 100%;
   bottom: 0;
   right: 0;
   border-radius: 0;
   min-height: 56px;
}
</style>
