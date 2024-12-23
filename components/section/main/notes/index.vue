<template lang="pug">
	.notes
		.note-cards-first
			NoteCard(:product="products[0]")
		.note-cards
			NoteCard(v-for="(item, index) in half" :key="item.uuid" :product="item")
</template>

<script setup>
import { useAppStore } from "~/stores/app";
const appStore = useAppStore();

console.log(appStore.scrollY);

const scrollY = ref(appStore.scrollY);

const newScrollPos = ref(0);
watch(
   () => appStore.scrollY,
   (val) => {
      newScrollPos.value = val;
   }
);

const {
   $gsap: gsap,
   $ScrollTrigger: ScrollTrigger,
   $ScrollToPlugin: ScrollToPlugin,
} = useNuxtApp();

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
   gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
   const sections = document.querySelectorAll(".note-cards .note-card");
   const sectionHeight = sections[0].clientHeight;
   const tl = gsap.timeline({
      defaults: {
         ease: "none",
         duration: 1,
      },
      scrollTrigger: {
         trigger: ".note-cards",
         start: "top top",
         end: () => sectionHeight * sections.length - 1 + "px",
         pinSpacing: true,
         pin: true,
         scrub: true,
         onUpdate: (self) => {
            const slides = document.querySelectorAll(".note-cards .note-card");
            const activeIndex = Math.round(self.progress * (slides.length - 1));
         },
      },
   });
   document
      .querySelectorAll(".note-cards .note-card")
      .forEach((slide, index) => {
         if (index !== 0) {
            tl.from(slide, {
               yPercent: 100,
               stagger: 0.05,
            });
         }
      });

   // Инициализирован smooth-scrollbar
   // const Scrollbar = window.Scrollbar;
   // const scrollContainer = document.querySelector('#scrollContainer');
   // const scrollbar = Scrollbar.init(scrollContainer);

   const { bodyScrollBar, scrollbar } = useScrollbar();

   // const scrollToSection = (target) => {
   //    const targetElement = document.querySelector(target);
   //    if (targetElement) {
   //       const targetOffsetTop = targetElement.offsetTop; // Получаем позицию целевой секции
   //       // Используем GSAP для анимированной прокрутки
   //       gsap.to(scrollbar, {
   //          scrollTo: targetOffsetTop,
   //          duration: 1, // Длительность анимации
   //          ease: "power2.inOut", // Еasing
   //       });
   //    }
   // };
   // // Установка обработчиков событий для якорных ссылок
   // document.querySelectorAll(".notes-navigation__nav a").forEach((anchor) => {
   //    anchor.addEventListener("click", function (e) {
   //       console.log("click");
   //       e.preventDefault(); // Отменяем стандартное поведение
   //       const target = this.getAttribute("href");
   //       scrollToSection(target); // Прокручиваем к выбранной секции
   //    });
   // });

   // Функция управления скроллом внутри контейнера
   // const scrollToSection = (target) => {
   //    const targetElement = document.querySelector(target);
   //    const scrollContainer = document.querySelector(".note-cards");
   //    const { bodyScrollBar } = useScrollbar();
   //    if (targetElement) {
   //       newScrollPos.value =
   //          targetElement.getBoundingClientRect().top + bodyScrollBar.offset.y;
   //       console.log(targetElement);
   //       const targetPosition =
   //          targetElement.getBoundingClientRect().top + newScrollPos.value;
   //       console.log(targetPosition);
   //       bodyScrollBar.scrollTo(0, targetPosition, 700);
   //       scrollContainer.scrollTo({
   //          top: targetPosition,
   //          behavior: "smooth",
   //       });
   //    }
   // };
   document
      .querySelectorAll('.notes-navigation__nav a[href^="#"]')
      .forEach((anchor) => {
         anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("href");
            // scrollToSection(target);
            // tl.seek(target, false);
         });
      });
   // let panelsContainer = document.querySelector(".note-cards");
   // let panels = document.querySelectorAll(".note-cards .note-card");
   // let totalScroll;
   // document
   //    .querySelectorAll(".notes-navigation__nav a")
   //    .forEach((anchor, i) => {
   //       anchor.addEventListener("click", function (e) {
   //          e.preventDefault();
   //          let targetElem = document.querySelector(
   //                e.target.getAttribute("href")
   //             ),
   //             y = targetElem;
   //          if (
   //             targetElem &&
   //             panelsContainer.isSameNode(targetElem.parentElement)
   //          ) {
   //             console.log(
   //                tl.scrollTrigger.start +
   //                   targetElem.offsetTop +
   //                   newScrollPos.value
   //             );
   //             totalScroll = tl.scrollTrigger.end - tl.scrollTrigger.start;
   //             let totalMovement =
   //                (panels.length - 1) * targetElem.offsetHeight;
   //             y = Math.round(
   //                tl.scrollTrigger.start +
   //                   (targetElem.offsetTop / totalMovement) * totalScroll
   //             );
   //          }
   //          gsap.to(window, {
   //             scrollTo: {
   //                y: y,
   //                autoKill: false,
   //             },
   //             duration: 1,
   //          });
   //       });
   //    });
});
</script>

<style lang="scss">
.sections {
   position: relative;
   overflow: hidden;
}
.note-cards {
   position: relative;
   min-height: 100vh;
   overflow: hidden;
}
.note-sections {
   position: relative;
}
.note-cards .note-card {
   position: absolute !important;
   width: 100%;
   height: 100% !important;
   top: 0;
   left: 0;
}
@for $i from 1 through 100 {
   .note-cards .note-card:nth-child(#{$i}) {
      z-index: #{$i};
   }
}
.note-cards-first {
   position: relative;
   & .note-card {
      position: relative;
   }
}
</style>
