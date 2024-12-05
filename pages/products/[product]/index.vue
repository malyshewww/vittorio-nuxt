<template lang="pug">
	div
		main.main.product-card
			.container
				.product-card__wrapper
					ProductMainCardSlider(:images="productData.images")
					ProductMainCardInfo(:info="productData.info")
				ProductMainCardContent
</template>

<script setup>
useHead({
   bodyAttrs: {
      class: "page--card",
   },
});
const productData = {
   images: ["legend", "legend", "protagonist", "musk-melody"],
   info: {
      title: "Legend № 11.01",
      capacity: "100",
      characteristics: [
         {
            label: "группа аромата",
            value: "фужерный-фруктовый",
         },
         {
            label: "верхние ноты",
            value: "цитрон, абрикос, апельсин, мята",
         },
         {
            label: "ноты сердца",
            value: "чёрная смородина, инжир, базилик, роза, чёрная смородина, инжир",
         },
         {
            label: "базовые ноты",
            value: "финики, кориандр, амбретта",
         },
      ],
      price: {
         new: "7890",
         old: "9560",
      },
   },
};
</script>

<style lang="scss" scoped>
.product-card {
   &__wrapper {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      padding-right: 150px;
   }
}
</style>
