<template lang="pug">
	.app-cart-popup(ref="popup" :class="{active: cartStore.isActiveCartPopup}")
		.app-cart-popup__body
			.app-cart-popup__image(v-html="cartStore.productInfo.image")
			.app-cart-popup__content
				.app-cart-popup__caption Добавлен в корзину
				.app-cart-popup__title {{cartStore.productInfo.title}}
				.app-cart-popup__volume {{cartStore.productInfo.volume}}
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const popup = ref("");

onMounted(() => {
   const header = document.querySelector(".header");
   const headerHeight = header.getBoundingClientRect().height;
   const { bodyScrollBar } = useScrollbar();
   popup.value.style.top = `${
      bodyScrollBar.offset.y + parseInt(headerHeight)
   }px`;
   bodyScrollBar.addListener(({ offset }) => {
      popup.value.style.top = `${offset.y + parseInt(headerHeight)}px`;
   });
});
</script>

<style lang="scss">
@use "assets/scss/vars" as *;
.app-cart-popup {
   position: fixed;
   top: 80px;
   right: 50px;
   width: 300px;
   min-height: 112px;
   color: var(--bg-white);
   background-color: var(--bg-smoke);
   opacity: 0;
   z-index: 30;
   transition: opacity $time ease-in-out 0s;
   &.active {
      opacity: 1;
   }
   // .app-cart-popup__body
   &__body {
      display: grid;
      grid-template-columns: 68px 1fr;
      align-items: center;
      gap: 20px;
      grid-template-areas: "img content";
      padding: 16px;
   }
   // .app-cart-popup__image
   &__image {
      grid-area: img;
      height: 80px;
      width: 100%;
      & img {
         width: 100%;
         height: 100%;
      }
   }
   // .app-cart-popup__content
   &__content {
      grid-area: content;
      display: flex;
      flex-direction: column;
      gap: 2px;
   }
   // .app-cart-popup__caption
   &__caption {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 6px;
   }
   // .app-cart-popup__title
   &__title {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
   }
   // .app-cart-popup__volume
   &__volume {
      font-size: 14px;
      line-height: 18px;
   }
}
</style>
