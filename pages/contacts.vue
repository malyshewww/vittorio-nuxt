<template lang="pug">
	div
		BreadCrumbs(:list="breadcrumb")
		main.main.contacts
			.container
				PageTop(title="Контакты")
				.contacts__body
					SectionContactsActions
					SectionContactsForm
				.contacts__image.ibg
					img(:src="`/images/contacts/preview.jpg`" alt="image")
</template>

<script setup>
useHead({
   bodyAttrs: { class: `page--contacts` },
});
const breadcrumb = [
   {
      title: "Главная",
      path: "/",
   },
   {
      title: "Контакты",
      path: "/",
   },
];
onMounted(() => {});
</script>

<style lang="scss" scoped>
.page--contacts {
   & .top-page {
      margin-bottom: 0;
   }
}
.contacts {
   &__body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: start;
      gap: 40px;
      padding: 80px 100px 80px 100px;
      margin-right: 50px;
      position: relative;
      margin-bottom: 40px;
      &::before {
         content: "";
         position: absolute;
         left: calc(50% - 1px);
         width: 1px;
         height: 100%;
         background: var(--bg-smoke);
      }
   }
   &__image {
      padding-bottom: math.div(520, 1820) * 100%;
   }
}
</style>
