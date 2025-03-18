<template lang="pug">
	form(@submit.prevent="addToCart").product-info__form
		UiButtonPrimary(title="Купить на сайте" type="submit")
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const props = defineProps({
  options: {
    type: Object,
    required: true,
    default: () => {},
  },
  cartData: {
    type: Object,
    required: true,
    default: () => {},
  },
});

// eslint-disable-next-line
const addToCart = async () => {
  await cartStore.addToCart(props.options, props.cartData);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.product-info {
  &__form {
    @include bp-md {
      width: 100%;
    }
  }
}
</style>
