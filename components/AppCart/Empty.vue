<template lang="pug">
	.app-cart-empty.empty-cart
		.empty-cart__heading
			.empty-cart__title Корзина пока пуста
			.empty-cart__sub-title Наполните её ароматами Vittorio 
		UiButtonPrimary(title="Перейти в каталог")
</template>

<style lang="scss">
.app-cart-empty {
}
.empty-cart {
   // .empty-cart__heading
   display: grid;
   grid-template-columns: 100%;
   justify-items: start;
   gap: 32px;
   &__heading {
      display: grid;
      grid-template-columns: 100%;
      gap: 16px;
   }
   // .empty-cart__title
   &__title {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 36px;
      line-height: 44px;
      text-transform: uppercase;
      color: var(--bg-smoke);
   }
   // .empty-cart__sub-title
   &__sub-title {
      font-size: 18px;
      line-height: 26px;
   }
}
</style>
