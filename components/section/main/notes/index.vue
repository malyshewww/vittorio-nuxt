<template lang="pug">
	.note-cards
		NoteCard(v-for="(item, index) in products" :key="item.uuid" :product="item")
</template>

<script setup>
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const props = defineProps({
   products: {
      type: Object,
      required: true,
   },
});

onMounted(() => {
   gsap.registerPlugin(ScrollTrigger);
   const tl = gsap.timeline({
      defaults: {
         ease: "none",
         duration: 1,
      },
      scrollTrigger: {
         trigger: ".note-cards",
         start: "top top",
         end: "top+=3000px top",
         pin: true,
         pinSpacing: true,
         scrub: true,
         onUpdate: (self) => {
            const slides = document.querySelectorAll(".note-card");
            const activeIndex = Math.round(self.progress * (slides.length - 1));
            console.log(activeIndex);
         },
      },
   });
   // Loop trough all the slides
   // document.querySelectorAll(".note-card").forEach((slide, index) => {
   //    console.log(slide, index);
   //    if (index === 0) return;
   //    tl.from(slide, {
   //       yPercent: 100,
   //       stagger: 0.5,
   //    });
   // });
});
</script>

<style lang="scss">
.note-cards {
   overflow: hidden;
}
</style>
