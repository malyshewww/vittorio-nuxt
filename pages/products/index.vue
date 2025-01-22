<template lang="pug">
	div
		AppBreadCrumbs(:list="catalog.breadcrumb")
		main.main.catalog
			.container
				PageTop(title="Коллекция ароматов")
				.catalog__body
					.catalog__content
						ContentBlock(:content="catalog.text")
					ProductPreviewCard(v-for="(item, index) in catalog.products" :key="index" :card="item")
</template>

<script setup>
import { useAppStore } from "~/stores/app.js";
const appStore = useAppStore();

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/products?_format=json`;

const { data: catalog } = await useAsyncData("catalog", () => $fetch(url, {}), {
  transform: (res) => {
    const { data, breadcrumb, metatag, text } = res;
    const metadata = useMetatags(metatag.html_head);
    return {
      breadcrumb,
      products: data,
      text,
      metadata,
    };
  },
});
useHead({ ...catalog.value.metadata, bodyAttrs: { class: `page--catalog` } });

onMounted(() => {
  appStore.isHeaderVisible = true;
});
</script>

<style lang="scss" scoped>
.catalog {
  &__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 80px 40px;
    @include bp-xxxl {
      grid-template-columns: repeat(3, 1fr);
    }
    @include bp-xxl {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
    }
    @include bp-md {
      grid-template-columns: 100%;
      gap: 20px;
    }
  }
  &__content {
    grid-column: span 2;
    max-width: 730px;
    font-size: 16px;
    line-height: 22px;
    @include bp-xxxl {
      grid-column: span 1;
    }
    @include bp-xxl {
      grid-column: span 2;
      max-width: 100%;
    }
    @include bp-md {
      grid-column: 1 / -1;
      margin-bottom: 20px;
    }
  }
}
</style>
