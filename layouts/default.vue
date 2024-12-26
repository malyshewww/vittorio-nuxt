<template lang="pug">
	div.wrapper
		AppHeader
		.page
			.page__body
				slot
		AppFooter
	UiButtonScrollUp
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const route = useRoute();

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:loading:end", () => {
   if (!route.hash) {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }
});

onMounted(() => {
   let initialPosition = window.scrollY;
   let currentPosition = window.scrollY;
   window.addEventListener("scroll", (e) => {
      if (route.name !== "index") {
         currentPosition = window.scrollY;
         appStore.isHeaderVisible =
            initialPosition <= currentPosition ? false : true;
         initialPosition = currentPosition;
      }
   });
   watch(
      () => route.path,
      () => {
         if (!route.hash) {
            window.scrollTo({
               top: 0,
               behavior: "smooth",
            });
         }
      }
   );
});
</script>

<style lang="scss">
.wrapper {
   display: flex;
   flex-direction: column;
   overflow: clip;
}
.page {
   flex: 1 1 auto;
}
body.lock {
   overflow: hidden;
}
// .scroller {
//    height: 100vh;
//    overflow: hidden;
// }
// .scrollbar-track-x {
//    display: none !important;
// }
// .scrollbar-track {
//    z-index: 30 !important;
// }
</style>
