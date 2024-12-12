<template lang="pug">
	div
		BreadCrumbs(:list="catalog.breadcrumb")
		main.main.catalog
			.container
				PageTop(title="Коллекция ароматов")
				.catalog__body
					.catalog__content
						ContentBlock(:content="catalog.text")
					ProductPreviewCard(v-for="(item, index) in catalog.products" :key="index" :card="item")
</template>

<script setup>
useHead({
   bodyAttrs: { class: `page--catalog` },
});

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/products?_format=json`;

const {
   data: catalog,
   status,
   error,
} = await useAsyncData("catalog", () => $fetch(url, {}), {
   transform: (res) => {
      const { data, breadcrumb, links, meta, metatag, text } = res;
      return {
         breadcrumb,
         products: data,
         text,
         metatag,
      };
   },
});
</script>

<style lang="scss" scoped>
.catalog {
   &__body {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 80px 40px;
      // @media screen and (max-width: $xxxl) {
      //    grid-template-columns: repeat(3, 1fr);
      // }
      // @media screen and (max-width: $xxl) {
      //    grid-template-columns: repeat(2, 1fr);
      //    gap: 40px;
      // }
      // @media screen and (max-width: $md) {
      //    grid-template-columns: 100%;
      //    gap: 20px;
      // }
   }
   &__content {
      grid-column: span 2;
      max-width: 730px;
      font-size: 16px;
      line-height: 22px;
      // @media screen and (max-width: $xxl) {
      //    grid-column: span 1;
      // }
      // @media screen and (max-width: $xl) {
      //    grid-column: span 2;
      //    max-width: 100%;
      // }
      // @media screen and (max-width: $md) {
      //    grid-column: 1 / -1;
      // }
   }
}
</style>
