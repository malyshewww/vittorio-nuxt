<template lang="pug">
	SectionMainHeroVideo(v-if="route.name === 'index'")
	AppHeader
	div(ref="scroller").scroller
		.page
			slot
		AppFooter
	UiButtonScrollUp
	NotesNavigation
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const nuxtApp = useNuxtApp();

const route = useRoute();

nuxtApp.hook("page:loading:end", () => {
   if (window.innerWidth > 1024) {
      const { bodyScrollBar } = useScrollbar();
      if (route.query.anchor) {
         const targetElem = document.getElementById(route.query.anchor);
         const targetElemPosition =
            targetElem.getBoundingClientRect().top + bodyScrollBar.scrollTop;
         bodyScrollBar.scrollTo(0, targetElemPosition, 600);
      }
   }
});

const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const scroller = ref(null);

onMounted(() => {
   const { bodyScrollBar } = useScrollbar();
   setTimeout(() => {
      ScrollTrigger.refresh();
   }, 1000);
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
   bodyScrollBar.addListener(({ offset }) => {
      appStore.scrollY = offset.y;
      if (route.name !== "index") {
         let currentPosition = offset.y;
         appStore.isHeaderVisible =
            initialPosition <= currentPosition ? false : true;
         initialPosition = currentPosition;
      }
      // Делегируем событие прокрутки в окно
      // window.dispatchEvent(
      //    new CustomEvent("scroll", {
      //       detail: { scrollTop: offset.y },
      //    })
      // );
   });

   watch(
      () => route.path,
      () => {
         if (!route.query.anchor)
            setTimeout(() => {
               bodyScrollBar.scrollTop = 0;
               // bodyScrollBar.scrollTo(0, 0, 200);
               // bodyScrollBar.scrollTop = 0;
            }, 200);
      }
   );

   // // Функция, срабатывающая при прокрутке
   // const onScroll = (event) => {
   //    const scrollTop = event.detail.scrollTop;
   //    console.log("Scroll Position:", scrollTop);
   // };
   // // Устанавливаем слушателя события прокрутки окна
   // window.addEventListener("scroll", onScroll);
   // // Пример функции для прокрутки к секции
   // const scrollToSection = (target) => {
   //    const targetElement = document.querySelector(target);
   //    if (targetElement) {
   //       const targetOffsetTop = targetElement.offsetTop; // Получаем позицию целевой секции
   //       // Используем GSAP для анимированной прокрутки
   //       gsap.to(scrollbar, {
   //          scrollTo: targetOffsetTop,
   //          duration: 1, // Длительность анимации
   //          ease: "power2.inOut", // Easing
   //       });
   //    }
   // };
   // // Установка обработчиков событий для якорных ссылок
   // document.querySelectorAll(".notes-navigation__nav a").forEach((anchor) => {
   //    anchor.addEventListener("click", function (e) {
   //       e.preventDefault(); // Отменяем стандартное поведение
   //       const target = this.getAttribute("href");
   //       scrollToSection(target); // Прокручиваем к выбранной секции
   //    });
   // });
});
onUnmounted(() => {});
</script>

<style lang="scss">
.scroller {
   height: 100vh;
   overflow: hidden;
}
.scrollbar-track-x {
   display: none !important;
}
.scrollbar-track-y {
   z-index: 30 !important;
}
.scrollbar-track {
   z-index: 30 !important;
}
</style>
