<template lang="pug">
	div.wrapper
		AppHeader
		.page
			slot
		//- AppFooter
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

onMounted(() => {
   let initialPosition = window.scrollY;
   let currentPosition = window.scrollY;
   window.addEventListener("scroll", (e) => {
      currentPosition = window.scrollY;
      appStore.isHeaderVisible =
         initialPosition <= currentPosition ? false : true;
      initialPosition = currentPosition;
   });
});
</script>

<style lang="scss">
.wrapper {
   display: flex;
   flex-direction: column;
}
.page {
   flex: 1 1 auto;
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
