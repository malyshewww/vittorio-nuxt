<template lang="pug">
	form(@submit.prevent="addToCart").product-info__form
		UiButtonPrimary(title="Купить на сайте" type="submit")
</template>

<script setup>
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
         const cartResponse = await response.json();
         const { attributes } = cartResponse.data[0];
         const { locked, quantity, title, total_price, unit_price } =
            attributes;
         productInfo.volume = Number(quantity).toFixed(0);
         productInfo.title = title;
         console.log(attributes);
         console.log("total_price", total_price);
         console.log("unit_price", unit_price);
      }
   } catch (e) {
      console.log("error", e);
   }
};

onMounted(() => {});
</script>
