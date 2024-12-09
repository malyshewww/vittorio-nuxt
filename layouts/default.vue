<template lang="pug">
	AppHeader(:class="{hidden: isHeaderVisible}")
	div(ref="scroller").scroller
		.page
			slot
		AppFooter
</template>

<script setup>
const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const scroller = ref("");
const isHeaderVisible = ref(false);

onMounted(() => {
   const { bodyScrollBar } = useScrollbar();
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
   let currentPosition = bodyScrollBar.offset.y;

   // sticky, fixed elements
   bodyScrollBar.addListener(({ offset }) => {
      currentPosition = offset.y;
      isHeaderVisible.value = initialPosition <= currentPosition ? true : false;
      initialPosition = currentPosition;
   });
});
</script>

<style lang="scss">
.page {
   padding: calc(var(--header-height) + 80px) 0 180px;
   .page--contacts & {
      padding-bottom: 0;
   }
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
