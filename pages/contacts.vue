<template lang="pug">
	div
		AppBreadCrumbs(:list="contacts.breadcrumb")
		main.main.contacts
			.container
				PageTop(:title="contacts.title")
				.contacts__wrapper
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

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/contacts?_format=json`;

const {
   data: contacts,
   status,
   error,
} = await useAsyncData("contacts", () => $fetch(url, {}), {
   transform: (res) => {
      console.log(res);
      const { breadcrumb, data, metatag } = res;
      return {
         breadcrumb,
         metatag,
         title: data.title,
      };
   },
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
@use "sass:math";
.page--contacts {
   & .top-page {
      margin-bottom: 0;
   }
}
.contacts {
   &__wrapper {
      position: relative;
      &::before {
         content: "";
         position: absolute;
         left: calc(50% - 1px);
         width: 1px;
         height: 100%;
         background: var(--bg-smoke);
      }
   }
   &__body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: start;
      gap: 40px;
      padding: 80px 100px 80px 100px;
      margin-right: 50px;
      position: relative;
      margin-bottom: 40px;
   }
   &__image {
      padding-bottom: math.div(520, 1820) * 100%;
   }
}
</style>
