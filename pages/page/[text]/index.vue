<template lang="pug">
	div
		AppBreadCrumbs(:list="pageText.breadcrumb")
		main.main
			.container
				PageTop(:title="pageText.title")
				ContentBlock(:content="pageText.content")
				PhotoGallery(v-if="pageText.gallery && pageText.gallery.length" :gallery="pageText.gallery")
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const { text } = useRoute().params;

const url = `${runtimeConfig.public.apiBase}/page/${text}?_format=json`;

const { data: pageText } = await useAsyncData("front", () => $fetch(url, {}), {
  transform: (res) => {
    const { breadcrumb, data, metatag } = res;
    const metadata = useMetatags(metatag.html_head);
    return {
      breadcrumb,
      title: data.title,
      content: data.body[0],
      gallery: data.field_images,
      metadata,
    };
  },
});
useHead({
  ...pageText.value.metadata,
  bodyAttrs: {
    class: "page--text",
  },
});
</script>

<style lang="scss" scoped>
.page--text {
  overflow: clip;
}
</style>
