<template lang="pug">
	div
		main.main.product-card
			.container
				.product-card__wrapper
					ProductMainCardSlider(:images="productData.info.field_images")
					ProductMainCardInfo(:info="productData.info" :images="productData.info.field_images" :options="productData.options")
				.product-card__content
					.content
						h3 История создания аромата
						div(v-html="productData.info.body[0]")
</template>

<script setup>
useHead({
   bodyAttrs: {
      class: "page--card",
   },
});

const { product } = useRoute().params;
const runtimeConfig = useRuntimeConfig();

const url = `${runtimeConfig.public.apiBase}/products/${product}?_format=json`;

const {
   data: productData,
   status,
   error,
} = await useAsyncData("productData", () => $fetch(url, {}), {
   transform: (res) => {
      const { breadcrumb, data } = res;
      console.log(data);
      const arrOptions = computed(() => {
         const options = [];
         const top = data.field_top_notes;
         const base = data.field_base_notes || "";
         const heart = data.field_heart_notes;
         const fragrance = data.field_fragrance_group;
         fragrance && options.push(fragrance);
         top && options.push(top);
         heart && options.push(heart);
         base && options.push(base);
         return options;
      });
      const optionsTitle = [
         "группа аромата",
         "верхние ноты",
         "ноты сердца",
         "базовые ноты",
      ];
      return {
         breadcrumb,
         info: data,
         options: arrOptions,
      };
   },
});

// const productData = {
//    images: ["legend", "legend", "protagonist", "musk-melody"],
//    info: {
//       title: "Legend № 11.01",
//       capacity: "100",
//       characteristics: [
//          {
//             label: "группа аромата",
//             value: "фужерный-фруктовый",
//          },
//          {
//             label: "верхние ноты",
//             value: "цитрон, абрикос, апельсин, мята",
//          },
//          {
//             label: "ноты сердца",
//             value: "чёрная смородина, инжир, базилик, роза, чёрная смородина, инжир",
//          },
//          {
//             label: "базовые ноты",
//             value: "финики, кориандр, амбретта",
//          },
//       ],
//       price: {
//          new: "7890",
//          old: "9560",
//       },
//    },
// };
</script>

<style lang="scss" scoped>
.product-card {
   &__wrapper {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      padding-right: 150px;
      position: relative;
      &::before {
         content: "";
         position: absolute;
         top: -80px;
         left: 0;
         width: 100%;
         height: 1px;
         background: var(--bg-smoke);
      }
   }
   &__content {
      display: flex;
      justify-content: center;
      margin-top: 104px;
   }
   & .content {
      max-width: 890px;
      & h3 {
         margin-bottom: 30px;
      }
   }
}
</style>
