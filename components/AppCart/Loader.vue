<template lang="pug">
	.app-cart-loader-container(v-if="cartStore.isLoading")
		UiLoader
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
// eslint-disable-next-line
const cartStore = useCartStore();
</script>

<style lang="scss">
.app-cart-loader-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#f8f5f1, 0.8);
  display: grid;
  place-items: center;
  z-index: 10;
}
</style>
