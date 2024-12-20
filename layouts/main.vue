<template lang="pug">
	SectionMainHeroVideo(v-if="route.name === 'index'")
	AppHeader
	div(ref="scroller").scroller
		.page
			slot
		//- AppFooter
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

<style lang="scss">
.scroller {
   height: 100vh;
   overflow: hidden;
}
.scrollbar-track-x {
   display: none !important;
}
.scrollbar-track-y {
   z-index: 30 !important;
}
.scrollbar-track {
   z-index: 30 !important;
}
</style>
