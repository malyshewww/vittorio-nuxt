<template lang="pug">
	SectionMainFragrances(:countries="front.countries")
	SectionMainNotes(:products="front.products" :half="front.halfProducts")
	SectionMainWelcome(:text="front.text")
</template>

<script setup>
definePageMeta({
   layout: "main",
   bodyAttrs: {
      class: "page--home",
   },
});

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/wsapi/packs/front?_format=json`;

const {
   data: front,
   status,
   error,
} = await useAsyncData("front", () => $fetch(url, {}), {
   transform: (res) => {
      const { data, links, meta, metatag } = res;
      const countries = computed(() => {
         return data.country_front.map((item) => {
            const arrTitle = item.title.split(" ");
            return {
               ...item,
               key: arrTitle[0].trim().toLowerCase(),
            };
         });
      });
      const products = computed(() => {
         return data.product_front.map((item) => {
            const arrTitle = item.title.split(" ");
            return {
               ...item,
               key: arrTitle[0].trim().toLowerCase(),
            };
         });
      });
      const halfProducts = computed(() => {
         // return products.value.shift();
         return data.product_front
            .map((item, index) => {
               const arrTitle = item.title.split(" ");
               return {
                  ...item,
                  key: arrTitle[0].trim().toLowerCase(),
               };
            })
            .filter((el, idx) => idx !== 0);
      });
      return {
         countries,
         products,
         halfProducts,
         text: data.text_front[0],
      };
   },
});

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
