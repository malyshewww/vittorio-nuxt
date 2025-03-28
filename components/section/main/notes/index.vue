<template lang="pug">
	.notes
		#panels
			.note-cards
				NoteCard(v-for="item in products" :key="item.uuid" :product="item")
</template>

<script setup>
import { useAppStore } from "~/stores/app";
const appStore = useAppStore();

// eslint-disable-next-line
const scrollY = ref(appStore.scrollY);

const newScrollPos = ref(0);

watch(
  () => appStore.scrollY,
  (val) => {
    newScrollPos.value = val;
  }
);

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

defineProps({
  products: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  // Gsap Code
  if (window.innerWidth > 1024) {
    const noteCardsContainer = document.querySelector(".note-cards");
    const sections = noteCardsContainer?.querySelectorAll(".note-sections");
    const noteCardLegend = document.querySelector(".main-note--legend");
    if (sections?.length) {
      const sectionHeight = sections[0].clientHeight;
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: ".note-cards",
          start: "bottom bottom",
          end: () => `${sectionHeight * sections.length - 1}px`,
          pinSpacing: true,
          pin: true,
          scrub: true,
        },
      });
      gsap.utils.toArray(sections).forEach((slide, index) => {
        if (index !== 0) {
          tl.from(slide, { yPercent: 100, stagger: 0.05 });
        }
      });
    }
    if (noteCardLegend) {
      gsap.fromTo(
        noteCardLegend,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            // Секция, от которой начинается анимация
            trigger: ".fragrances",
            start: "bottom bottom",
            // Когда нижняя граница секции достигнет верхней границы окна
            end: "bottom top",
            scrub: 1,
            ease: "Power0.easeNone",
            toggleActions: "play none none reverse", // Включаем действия при прокрутке
          },
        }
      );
    }
  }
});
</script>

<style lang="scss">
.sections {
  position: relative;
  overflow: hidden;
}
.note-cards {
  position: relative;
  height: 200vh;
  overflow: hidden;
  @include bp-xl {
    height: auto;
    overflow: visible;
  }
}
@for $i from 1 through 100 {
  .note-cards .note-sections:nth-child(#{$i}) {
    z-index: #{$i};
  }
}

.note-cards-first {
  position: relative;
  & .note-card {
    position: relative;
  }
  & .note-sections {
    position: relative;
  }
}
</style>
