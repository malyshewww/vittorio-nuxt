<template lang="pug">
	form(@submit.prevent).app-cart__promocode
		FormInput(type="text" name="promo" placeholder="Введите промокод" :is-valid="true" :is-promocode="true")
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
</script>

<style lang="scss">
.app-cart {
   // .app-cart__promocode
   &__promocode {
      margin-top: 34px;
      @include bp-md {
         margin-top: 20px;
      }
   }
}
</style>
