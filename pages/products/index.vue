<template lang="pug">
	div
		BreadCrumbs(:list="breadcrumbs")
		main.main.catalog
			.container
				PageTop(title="Коллекция ароматов")
				.catalog__body
					.catalog__content
						p Долгое время ароматы Витторио были доступны лишь избранным. Сегодня бренд Vittorio рад представить свою новую линейку уникальных ароматов для ценителей парфюмерного искусства в России. Мы понимаем, что настоящая магия ароматов должна быть доступна каждому, кто ценит подлинную красоту и элегантность. Вдохновлённый богатством культур и природы, Витторио создал коллекцию, которая объединяет в себе его непревзойдённое мастерство и доступность для широкой аудитории.
					ProductPreviewCard(v-for="(item, index) in products" :key="index" :card="item")
</template>

<script setup>
useHead({
   bodyAttrs: { class: `page--catalog` },
});

const breadcrumbs = [
   {
      title: "Главная",
      path: "/",
   },
   {
      title: "Коллекция ароматов",
      path: "/",
   },
];

const products = [
   {
      images: ["erato", "essay"],
      title: "Legend № 11.01",
      group: "фужерный, фруктовый",
      capacity: "100 мл",
      oldPrice: "9560",
      price: "7890",
   },
   {
      images: ["erato", "essay"],
      title: "Musk Melody",
      group: "древесные, цветочные, мускусные",
      capacity: "100 мл",
      oldPrice: "10100",
      price: "9999",
   },
   {
      images: ["erato", "essay"],
      title: "Legend № 11.01",
      group: "фужерный, фруктовый",
      capacity: "100 мл",
      oldPrice: "9560",
      price: "7890",
   },
   {
      images: ["erato", "essay"],
      title: "Musk Melody",
      group: "древесные, цветочные, мускусные",
      capacity: "100 мл",
      oldPrice: "10100",
      price: "9999",
   },
   {
      images: ["erato", "essay"],
      title: "Musk Melody",
      group: "древесные, цветочные, мускусные",
      capacity: "100 мл",
      oldPrice: "10100",
      price: "9999",
   },
   {
      images: ["erato", "essay"],
      title: "Musk Melody",
      group: "древесные, цветочные, мускусные",
      capacity: "100 мл",
      oldPrice: "10100",
      price: "9999",
   },
   {
      images: ["erato", "essay"],
      title: "Legend № 11.01",
      group: "фужерный, фруктовый",
      capacity: "100 мл",
      oldPrice: "9560",
      price: "7890",
   },
   {
      images: ["erato", "essay"],
      title: "Musk Melody",
      group: "древесные, цветочные, мускусные",
      capacity: "100 мл",
      oldPrice: "10100",
      price: "9999",
   },
   {
      images: ["erato", "essay"],
      title: "Musk Melody",
      group: "древесные, цветочные, мускусные",
      capacity: "100 мл",
      oldPrice: "10100",
      price: "9999",
   },
];
</script>

<style lang="scss" scoped>
.catalog {
   &__body {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 80px 40px;
      @media screen and (max-width: $xxxl) {
         grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (max-width: $xxl) {
         grid-template-columns: repeat(2, 1fr);
         gap: 40px;
      }
      @media screen and (max-width: $md) {
         grid-template-columns: 100%;
         gap: 20px;
      }
   }
   &__content {
      grid-column: span 2;
      max-width: 730px;
      font-size: 16px;
      line-height: 22px;
      @media screen and (max-width: $xxl) {
         grid-column: span 1;
      }
      @media screen and (max-width: $xl) {
         grid-column: span 2;
         max-width: 100%;
      }
      @media screen and (max-width: $md) {
         grid-column: 1 / -1;
      }
   }
}
</style>
