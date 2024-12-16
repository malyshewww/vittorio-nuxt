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
      default: {},
   },
   images: {
      type: Array,
      required: true,
   },
});

const productInfo = reactive({
   image: props.images[0].markup,
   title: "",
   volume: "",
});

const runtimeConfig = useRuntimeConfig();

const token = useToken();

const addToCart = async () => {
   try {
      const response = await fetch(
         `${runtimeConfig.public.apiBase}/jsonapi/cart/add`,
         {
            method: "POST",
            body: JSON.stringify(props.options),
            headers: {
               Accept: "application/vnd.api+json",
               "Content-Type": "application/vnd.api+json",
               "Commerce-Cart-Token": token,
            },
         }
      );
      if (response.ok) {
         const { data } = await response.json();
         const { attributes } = data[0];
         console.log(attributes);
         const { locked, quantity, title, total_price, unit_price } =
            attributes;
         console.log(quantity);
         productInfo.volume = Number(quantity).toFixed(0);
         productInfo.title = title;
      }
   } catch (e) {
      console.log("error", e);
   }
};

onMounted(() => {});
</script>
