<template lang="pug">
	div(ref="scroller" data-scroll-container)
		AppHeader
		.page
			slot
		AppFooter
</template>

<script setup>
const {
   $LocomotiveScroll: LocomotiveScroll,
   $gsap: gsap,
   $ScrollTrigger: ScrollTrigger,
} = useNuxtApp();

const scroller = ref("");

const isLock = ref(false);

onMounted(() => {
   const locoScroll = new LocomotiveScroll({
      el: scroller.value,
      smooth: true,
      // for tablet smooth
      tablet: { smooth: true },
      // for mobile
      smartphone: { smooth: true },
   });
   locoScroll.on("scroll", ScrollTrigger.update);

   ScrollTrigger.scrollerProxy(scroller.value, {
      scrollTop(value) {
         return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
         return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
         };
      },
   });

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

   // const trigger = document.querySelector(".trigger");
   // const target = document.querySelector("#js-target");
   // trigger.addEventListener("click", () => {
   //    //   scroll.scrollTo(target);
   //    isLock.value = !isLock.value;
   //    isLock.value ? locoScroll.stop() : locoScroll.start();
   // });
});
</script>

<style lang="scss" scoped>
.page {
   padding: 80px 0 180px;
   .page--contacts & {
      padding-bottom: 0;
   }
}
.section {
   height: 100vh;
   background-color: gray;
   font-size: 80px;
   &-one {
      opacity: 0.8;
   }
   &-two {
      opacity: 0.6;
   }
}
.trigger {
   width: 200px;
   height: 40px;
   font-size: 20px;
   color: white;
   position: fixed;
   top: 0;
   left: 0;
   z-index: 20;
}
.line {
   width: 100%;
   max-width: 800px;
   height: 8px;
   margin: 0 0 10px 0;
   position: relative;
   display: inline-block;
   background-color: rgba(255, 255, 255, 1);
}
</style>
