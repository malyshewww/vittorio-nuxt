<template lang="pug">
	div
		SectionMainHero
		.page-sections
			SectionMainFragrances(:countries="front.countries")
			SectionMainNotes(:products="front.products")
			SectionMainWelcome(:text="front.text")
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/wsapi/packs/front?_format=json`;

const { data: front } = await useAsyncData("front", () => $fetch(url, {}), {
  transform: (res) => {
    const { data, metatag } = res;
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
    const metadata = useMetatags(metatag.html_head);
    return {
      countries,
      products,
      metadata,
      text: data.text_front[0],
    };
  },
});

useHead({
  ...front.value.metadata,
  bodyAttrs: {
    class: "page--home",
  },
  meta: [
    { name: "yandex-verification", content: "34de1046d444580b" },
    {
      name: "google-site-verification",
      content: "O6dzXcg83zo52OxcVgjhULfDtpLLbDv22dmZq2ANPF4",
    },
  ],
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
.page-sections {
  background-color: var(--bg-milk);
  position: relative;
  z-index: 2;
  overflow: hidden;
  isolation: isolate;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: transparent url("/images/main-noise.png") repeat-y 0 0;
    background-repeat: repeat;
    background-blend-mode: soft-light;
    pointer-events: none;
    z-index: 0;
  }
}
</style>
