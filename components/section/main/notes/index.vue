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
   // bodyScrollBar.addListener(ScrollTrigger.update);
   // ScrollTrigger.defaults({ scroller: ".scroller" });
   // bodyScrollBar.addListener(({ offset }) => {
   //    const noteSections = document.querySelectorAll(".note-sections");
   //    noteSections.forEach((section) => {
   //       const infoNote = section.querySelector(".info-note");
   //       section.style.top = `${offset.y}px`;
   //    });
   // });
   // const legendCard = document.querySelector(".main-note--legend");
   // gsap.to(legendCard, {
   //    opacity: 0,
   //    ease: "none",
   //    scrollTrigger: {
   //       trigger: ".note-cards",
   //       start: "top top",
   //       end: () => "+=" + legendCard.clientHeight + "px",
   //       // toggleActions: "play reverse play reverse",
   //       markers: true,
   //    },
   // });
   // const panels = gsap.utils.toArray(".panel");
   // gsap.set(panels, {
   //    yPercent: (i) => (i ? 100 : 0),
   // });
   // console.log(panels);
   // const tl = gsap.timeline({
   //    scrollTrigger: {
   //       trigger: ".panels",
   //       start: "top top",
   //       end: () => "+=" + 100 * panels.length + "%",
   //       pin: true,
   //       pinSpacing: true,
   //       scrub: 1,
   //       markers: true,
   //    },
   // });
   // panels.forEach((panel, index) => {
   //    if (index) {
   //       tl.to(
   //          panel,
   //          {
   //             yPercent: 0,
   //             ease: "none",
   //          },
   //          "+=0.25"
   //       );
   //    }
   // });
   // const productCards = document.querySelectorAll(".note-cards");
   // if (productCards.length) {
   //    productCards.forEach((item, i) => {
   //       const card = item.querySelectorAll(".note-card");
   //       const productCardHeight = productCards[0].clientHeight;
   //       const animation = gsap.timeline({
   //          scrollTrigger: {
   //             trigger: item,
   //             pinSpacing: true,
   //             pin: true,
   //             scrub: true,
   //             start: `top top`,
   //             end: "+=100%",
   //          },
   //       });
   //       animation.to(card[1], {
   //          opacity: 0,
   //          y: -productCardHeight + "px",
   //       });
   //    });
   // }
   // const tl = gsap.timeline({
   //    defaults: {
   //       ease: "none",
   //       duration: 1,
   //    },
   //    scrollTrigger: {
   //       trigger: ".note-cards",
   //       start: "top top",
   //       end: "top+=3000px top",
   //       pin: true,
   //       pinSpacing: true,
   //       scrub: true,
   //       onUpdate: (self) => {
   //          const slides = document.querySelectorAll(".note-card");
   //          const activeIndex = Math.round(self.progress * (slides.length - 1));
   //          console.log(activeIndex);
   //       },
   //    },
   // });
   // Loop trough all the slides
   // document.querySelectorAll(".note-card").forEach((slide, index) => {
   //    console.log(slide, index);
   //    if (index === 0) return;
   //    tl.from(slide, {
   //       yPercent: 100,
   //       stagger: 0.5,
   //    });
   // });
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
