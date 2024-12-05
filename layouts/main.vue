<template lang="pug">
	div(ref="scroller" data-scroll-container)
		.page
			slot
		AppFooter
</template>

<script setup>
// import { LocomotiveScroll } from "locomotive-scroll";
// import { useLocomotiveScroll } from "@/composables/useLocomotiveScroll";
// useLocomotiveScroll();
const {
   $LocomotiveScroll: LocomotiveScroll,
   $gsap: gsap,
   $ScrollTrigger: ScrollTrigger,
} = useNuxtApp();

const scroller = ref("");
const scrollInstance = ref(null);

const isLock = ref(false);
console.log("for commit");

onMounted(() => {
   scrollInstance.value = new LocomotiveScroll({
      el: scroller.value, // Убедитесь, что у вас есть контейнер с этим атрибутом
      smooth: true,
      // for tablet smooth
      tablet: { smooth: true },
      // for mobile
      smartphone: { smooth: true },
   });
   scrollInstance.value.on("scroll", ScrollTrigger.update);
   ScrollTrigger.scrollerProxy(scroller.value, {
      scrollTop(value) {
         return arguments.length
            ? scrollInstance.value.scrollTo(value, 0, 0)
            : scrollInstance.value.scroll.instance.scroll.y;
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

   // console.log(locoScroll.value);
   // const { scrollInstance: locoScroll } = useLocomotiveScroll(scroller.value);
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
   const trigger = document.querySelector("button[data-href='#welcome']");
   const target = document.querySelector("#welcome");
   trigger?.addEventListener("click", () => {
      scrollInstance.value.scrollTo(target);
      // isLock.value = !isLock.value;
      // isLock.value ? locoScroll.stop() : locoScroll.start();
   });
   new ResizeObserver(() => scrollInstance.value.update()).observe(
      document.querySelector("[data-scroll-container]")
   );
});
</script>

<style lang="scss" scoped>
.page {
   padding: 0px 0 180px;
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
