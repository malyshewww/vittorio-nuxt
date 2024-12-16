<template lang="pug">
	SectionMainHeroVideo
	AppHeader
	div(ref="scroller").scroller
		.page
			SectionMainHero
			.page-sections
				slot
		AppFooter
	UiButtonScrollUp
	NotesNavigation
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const { $Scrollbar: Scrollbar, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const scroller = ref(null);

const route = useRoute();

onMounted(() => {
   const { bodyScrollBar } = useScrollbar();
   setTimeout(() => {
      ScrollTrigger.refresh();
   }, 1000);
   ScrollTrigger.scrollerProxy(scroller.value, {
      scrollTop(value) {
         if (arguments.length > 0) {
            bodyScrollBar.scrollTop = value;
         }
         return bodyScrollBar.scrollTop;
      },
   });
   bodyScrollBar.addListener(ScrollTrigger.update);
   ScrollTrigger.defaults({ scroller: scroller.value });

   let initialPosition = bodyScrollBar.offset.y;

   bodyScrollBar.addListener(({ offset }) => {
      if (route.name !== "index") {
         let currentPosition = offset.y;
         appStore.isHeaderVisible =
            initialPosition <= currentPosition ? false : true;
         initialPosition = currentPosition;
      }
   });
});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.page {
   padding: 0px 0 0px;
}
.page-sections {
   background-color: var(--bg-milk);
   position: relative;
   z-index: 2;
   overflow: hidden;
}
.scroller {
   height: 100vh;
   overflow: hidden;
}
.scrollbar-track-x {
   display: none !important;
}
.scrollbar-track {
   z-index: 30 !important;
}
</style>
