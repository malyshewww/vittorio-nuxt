<template lang="pug">
	.notes-navigation(:class="{active: isVisible}")
		nav.notes-navigation__nav
			.swiper(ref="slider")
				ul.notes-navigation__list.swiper-wrapper
					li.notes-navigation__item.swiper-slide(v-for="(item, index) in list" :key="index")
						a(:href="item.path" @click.prevent="scrollToSection($event)").notes-navigation__link {{item.title}}
		UiButtonPrimary(:is-link="true" title="Полная коллекция" path="/products" class-names="btn-small")

</template>

<script setup>
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const slider = ref("");
const swiper = ref(null);

const isVisible = ref(false);

const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const initializeSwiper = () => {
   swiper.value = new Swiper(slider.value, {
      freeMode: true,
      spaceBetween: 16,
      slidesPerView: "auto",
      breakpoints: {
         767.98: {},
         1200: {
            slidesPerView: "auto",
         },
      },
   });
};

const scrollToSection = (e) => {
   const { bodyScrollBar } = useScrollbar();
   const target = e.target;
   if (!target) return;
   const targetId = target.getAttribute("href");
   const targetElement = document.querySelector(targetId);
   // Господи, что за костыль. По возможности переписать
   if (targetElement) {
      const id = targetElement.getAttribute("id");
      const panelsSection = document.querySelector("#panels");
      const { innerHeight } = window;
      let pos;
      switch (id) {
         case "legend":
            pos = parseInt(
               targetElement.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop
            );
            break;
         case "santal":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop
            );
            break;
         case "protagonist":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 2.15
            );
            break;
         case "musk":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 4.3
            );
            break;
         case "essay":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 6.4
            );
            break;
         case "ethnos":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 8.55
            );
            break;
         case "erato":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 10.7
            );
            break;
         case "voice":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 12.8
            );
            break;
         case "velvet":
            pos = parseInt(
               panelsSection.getBoundingClientRect().top +
                  bodyScrollBar.scrollTop +
                  innerHeight * 14.95
            );
            break;
         default:
            break;
      }
      bodyScrollBar.scrollTo(0, pos, 800);
   }
};

const observeNavigation = () => {
   const noteCards = document.querySelector(".notes");
   const welcomeSection = document.querySelector("#welcome");
   const handleIntersection = (entries) => {
      entries.forEach((entry) => {
         // if (!entry.isIntersecting) {
         //    isVisible.value = false; // Скрывать
         // } else {
         //    isVisible.value = true; // Показывать
         // }
         if (entry.target === welcomeSection) {
            if (entry.boundingClientRect.top < window.innerHeight) {
               isVisible.value = false;
            }
         }
         if (entry.target === noteCards) {
            if (entry.isIntersecting) {
               isVisible.value = true;
            } else {
               isVisible.value = false;
            }
         }
      });
   };
   const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
   });
   if (noteCards) {
      observer.observe(noteCards);
   }
   if (welcomeSection) {
      observer.observe(welcomeSection);
   }
};

onMounted(() => {
   initializeSwiper();
   observeNavigation();
});

const list = [
   {
      title: "Legend № 11.01",
      path: "#legend",
   },
   {
      title: "Santal & Leather",
      path: "#santal",
   },
   {
      title: "Protagonist",
      path: "#protagonist",
   },
   {
      title: "Musk melody",
      path: "#musk",
   },
   {
      title: "Essay",
      path: "#essay",
   },
   {
      title: "Ethnos V",
      path: "#ethnos",
   },
   {
      title: "Erato",
      path: "#erato",
   },
   {
      title: "Voice of the sea",
      path: "#voice",
   },
   {
      title: "Velvet Peony",
      path: "#velvet",
   },
];
</script>

<style lang="scss">
@use "assets/scss/_vars" as *;
@use "assets/scss/mixins" as m;
.notes-navigation {
   position: fixed;
   bottom: 0;
   width: 100%;
   height: 52px;
   border-bottom: 1px solid var(--bg-smoke);
   border-top: 1px solid var(--bg-smoke);
   height: 52px;
   background: var(--bg-milk);
   padding: 6px 50px;
   display: flex;
   justify-content: space-between;
   gap: 20px;
   align-items: center;
   transform: translateY(120%);
   pointer-events: none;
   transition: transform $time * 2 $ttm;
   &.active {
      transform: translateY(0);
      pointer-events: all;
   }
   @media screen and (max-width: 1600px) {
      padding: 6px 20px;
   }
   &__nav {
      width: 81vw;
      @include m.bp-xxl {
         width: 75vw;
      }
   }
   & .swiper {
      //   margin-right: calc(332px - 16px);
   }
   &__list {
      @include m.reset-list;
   }
   &__item {
      flex-shrink: 0;
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      text-transform: lowercase;
      width: auto;
      &:not(:last-child) {
         display: flex;
         align-items: center;
         gap: 16px;
         &::after {
            content: "";
            display: block;
            width: 20px;
            height: 24px;
            flex-shrink: 0;
            background-image: url("/images/icons/star-s.svg");
            background-repeat: no-repeat;
            background-position: 0 0;
         }
      }
   }
   &__link {
      display: flex;
      align-items: center;
      gap: 16px;
   }
   & .btn {
      position: sticky;
      right: 50px;
      flex-shrink: 0;
      @media screen and (max-width: 1600px) {
         right: 20px;
      }
   }
}
</style>
