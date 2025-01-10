<template lang="pug">
	div
		AppBreadCrumbs(:list="pageText.breadcrumb")
		main.main
			.container
				PageTop(:title="pageText.title")
				ContentBlock(:content="pageText.content")
				//- .content.content-table(v-if="contentTable.rows.length")
				//- 	h3 Static Таблица
				//- 	table
				//- 		thead
				//- 			tr
				//- 				th(v-for="(item, index) in contentTable.header" :key="index") {{item}}
				//- 		tbody
				//- 			tr(v-for="(item, index) in contentTable.rows")
				//- 				td {{item.name}}
				//- 				td {{item.price}}
				//- 				td {{item.salePrice}}
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

// async function sendEmail() {
//    const template = await useFetch("http://localhost:3000/api/send-email", {
//       method: "POST",
//    });
//    console.log(template);
// }
const contentTable = {
   header: [
      "Наименование товара",
      "Стоимость товара без скидки",
      "Стоимость товара с максимальной скидкой",
   ],
   rows: [
      {
         name: "Парфюмерная вода “Legend № 11.01”",
         price: "8 200 руб.",
         salePrice: "8 100 руб.",
      },
      {
         name: "Парфюмерная вода “Santal & Leather”",
         price: "9 300 руб.",
         salePrice: "9 250 руб.",
      },
      {
         name: "Парфюмерная вода “Legend № 11.01” Парфюмерная вода “Legend № 11.01”",
         price: "8 200 руб.",
         salePrice: "8 100 руб.",
      },
      {
         name: "Парфюмерная вода “Santal & Leather”",
         price: "9 300 руб.",
         salePrice: "9 250 руб.",
      },
   ],
};
</script>

<style lang="scss" scoped>
.page--text {
   overflow: clip;
}
</style>
