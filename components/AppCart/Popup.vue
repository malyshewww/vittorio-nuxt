<template lang="pug">
	.app-cart-popup(ref="popup" :class="{active: cartStore.isActiveCartPopup}")
		.app-cart-popup__body
			.app-cart-popup__image(v-html="image")
			.app-cart-popup__content
				.app-cart-popup__caption Добавлен в корзину
				.app-cart-popup__title {{title}}
				.app-cart-popup__volume {{volume}}
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

// eslint-disable-next-line
const cartStore = useCartStore();
// eslint-disable-next-line
const popup = ref("");

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.app-cart-popup {
  // position: fixed;
  // top: var(--header-height);
  // right: 50px;
  width: 300px;
  min-height: 112px;
  color: var(--bg-white);
  background-color: var(--bg-smoke);
  // opacity: 0;
  // pointer-events: none;
  // z-index: 30;
  // transition: opacity var(--time) ease-in-out 0s;
  &.active {
    opacity: 1;
  }
  @include bp-xl {
    right: 30px;
  }
  @include bp-md {
    right: 16px;
    min-height: fit-content;
    width: 250px;
  }
  // .app-cart-popup__body
  &__body {
    display: grid;
    grid-template-columns: 68px 1fr;
    align-items: center;
    gap: 20px;
    grid-template-areas: "img content";
    padding: 16px;
    @include bp-md {
      padding: 8px;
      grid-template-columns: 60px 1fr;
      align-items: start;
      gap: 10px;
    }
  }
  // .app-cart-popup__image
  &__image {
    grid-area: img;
    height: 80px;
    width: 100%;
    & img {
      width: 100%;
      height: 100%;
      @include bp-md {
        position: absolute;
        inset: 0;
      }
    }
    @include bp-md {
      height: 100%;
      position: relative;
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
