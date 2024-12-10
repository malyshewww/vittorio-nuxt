<template lang="pug">
	SectionMainHeroVideo
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
const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const scroller = ref(null);

onMounted(() => {
   setTimeout(() => {
      ScrollTrigger.refresh();
   }, 1000);
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
   // gsap.from(".line", {
   //    scrollTrigger: {
   //       trigger: ".line-1",
   //       scroller: scroller.value,
   //       scrub: true,
   //       start: "top bottom",
   //       end: "top top",
   //    },
   //    scaleX: 0,
   //    transformOrigin: "left center",
   //    ease: "none",
   // });
   // const trigger = document.querySelector("button[data-href='#welcome']");
   // const target = document.querySelector("#welcome");
   // trigger?.addEventListener("click", () => {
   //    scrollInstance.value.scrollTo(target);
   // });
   // new ResizeObserver(() => scrollInstance.value.update()).observe(
   //    document.querySelector("[data-scroll-container]")
   // );
});
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
