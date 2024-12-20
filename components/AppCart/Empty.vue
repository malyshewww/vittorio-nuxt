<template lang="pug">
	.app-cart-empty.empty-cart
		.empty-cart__heading
			.empty-cart__title Корзина пока пуста
			.empty-cart__sub-title Наполните её ароматами Vittorio 
		UiButtonPrimary(title="Перейти в каталог" @button-action="changeRoute")
</template>

<script setup>
const changeRoute = () => {
   navigateTo("/products");
};
</script>

<style lang="scss">
.app-cart-empty {
}
.empty-cart {
   // .empty-cart__heading
   display: grid;
   grid-template-columns: 100%;
   justify-items: start;
   gap: 34px;
   @include bp-md {
      gap: 20px;
   }
   &__heading {
      display: grid;
      grid-template-columns: 100%;
      gap: 18px;
   }
   // .empty-cart__title
   &__title {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 36px;
      line-height: 44px;
      text-transform: uppercase;
      color: var(--bg-smoke);
      @include bp-md {
         font-size: 22px;
         line-height: 28px;
      }
   }
   // .empty-cart__sub-title
   &__sub-title {
      font-size: 18px;
      line-height: 26px;
   }
}
</style>
