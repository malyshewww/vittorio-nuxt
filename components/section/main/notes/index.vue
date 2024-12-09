<template lang="pug">
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
   const { bodyScrollBar } = useScrollbar();
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
});
</script>

<style lang="scss">
// .note-card {
//    position: absolute;
//    inset: 0;
//    width: 100%;
//    height: 100%;
// }
.panels {
   width: 50%;
   /*   height: 100vh; */
   background: lime;
   overflow: hidden;
   position: relative;
}
.panel {
   height: 100vh;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   &.red {
      background-color: red;
   }
   &.orange {
      background-color: orange;
   }
   &.purple {
      background-color: purple;
   }
}
.sections {
   position: relative;
   overflow: hidden;
}
.note-cards {
   position: relative;
   overflow: hidden;
}
</style>
