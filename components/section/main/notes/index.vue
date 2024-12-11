<template lang="pug">
	.notes
		.note-cards-first
			NoteCard(:product="products[0]")
		.note-cards
			NoteCard(v-for="(item, index) in half" :key="item.uuid" :product="item")
</template>

<script setup>
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const props = defineProps({
   products: {
      type: Object,
      required: true,
   },
   half: {
      type: Object,
      required: true,
   },
});

onMounted(() => {
   const { bodyScrollBar } = useScrollbar();
   // const tl = gsap.timeline({
   //    defaults: {
   //       ease: "none",
   //       duration: 1,
   //    },
   //    scrollTrigger: {
   //       trigger: ".note-cards",
   //       start: "top top",
   //       end: "top+=5000px top",
   //       pinSpacing: true,
   //       pin: true,
   //       markers: true,
   //       scrub: true,
   //       onUpdate: (self) => {
   //          const slides = document.querySelectorAll(".note-cards .note-card");
   //          const activeIndex = Math.round(self.progress * (slides.length - 1));
   //          console.log(activeIndex);
   //       },
   //    },
   // });
   // document
   //    .querySelectorAll(".note-cards .note-card")
   //    .forEach((slide, index) => {
   //       tl.from(slide, {
   //          yPercent: 100,
   //          stagger: 0.05,
   //       });
   //    });
});
</script>

<style lang="scss">
// .note-card {
//    position: absolute;
//    inset: 0;
//    width: 100%;
//    height: 100%;
// }
.sections {
   position: relative;
   overflow: hidden;
}
.note-cards {
   position: relative;
   // height: 980px;
   overflow: hidden;
}
.note-sections {
   position: relative;
}
// .note-card {
//    position: absolute;
//    inset: 0;
//    width: 100%;
//    height: 980px;
// }
// .note-cards-first {
//    position: relative;
//    & .note-card {
//       position: relative;
//    }
// }
</style>
