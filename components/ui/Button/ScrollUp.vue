<template lang="pug">
	button(type="button" :class="[{'active': isButtonVisible}, {'mode': mode}]" @click="scrollTop").button-up
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const mode = ref(false);

watch(
   () => appStore.isNavigationVisible,
   () => {
      if (appStore.isNavigationVisible) {
         mode.value = true;
      } else {
         mode.value = false;
      }
   }
);

const isButtonVisible = ref(false);

const route = useRoute();

watch(
   () => route.path,
   () => {
      isButtonVisible.value = false;
   }
);

function observerButtonUp() {
   // Функция для показа/скрытия кнопки
   const heroSection = document.querySelector(".main-hero");
   const handleIntersection = (entries) => {
      entries.forEach((entry) => {
         if (!entry.isIntersecting) {
            isButtonVisible.value = true;
         } else {
            isButtonVisible.value = false;
         }
      });
   };
   const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
   });
   // const handleIntersectionOther = (entries) => {
   //    entries.forEach((entry) => {
   //       if (!entry.isIntersecting) {
   //          isButtonVisible.value = true;
   //       } else {
   //          isButtonVisible.value = false;
   //       }
   //    });
   // };
   // const observerOther = new IntersectionObserver(handleIntersectionOther, {
   //    threshold: 0,
   // });
   const setNewButtonState = (y) => {
      const header = document.querySelector(".header");
      const headerHeight = header.getBoundingClientRect().height;
      if (y > headerHeight) {
         isButtonVisible.value = true;
      } else {
         isButtonVisible.value = false;
      }
   };

   if (heroSection && route.name === "index") {
      observer.observe(heroSection);
   } else {
      if (window.innerWidth > 1024 && route.name !== "index") {
         const { bodyScrollBar } = useScrollbar();
         bodyScrollBar.addListener(({ offset }) => {
            setNewButtonState(offset.y);
         });
      } else {
         window.addEventListener("scroll", () => {
            setNewButtonState(window.scrollY);
         });
      }
   }
}

const scrollTop = () => {
   const { bodyScrollBar } = useScrollbar();
   if (window.innerWidth > 1024) {
      bodyScrollBar.scrollTo(0, 0, 500);
   } else {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }
};
onMounted(() => {
   observerButtonUp();
   scrollTop();
});
onBeforeUnmount(() => {
   // window.removeEventListener("scroll", () => {
   //    setNewButtonState(window.scrollY);
   // });
});
</script>

<style lang="scss" scoped>
@use "~/assets/scss/_vars" as *;
.button-up {
   border-radius: 100px;
   width: 36px;
   height: 52px;
   display: grid;
   place-items: center;
   backdrop-filter: blur(4px);
   background-color: rgba(60, 58, 55, 0.6);
   position: fixed;
   bottom: 16px;
   left: 8px;
   transform: translateY(100%);
   opacity: 0;
   pointer-events: none;
   z-index: 10;
   transition: transform $time * 2 $ttm, opacity $time * 2 $ttm,
      bottom $time * 2 $ttm;
   &.active {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
   }
   &.mode {
      bottom: calc(var(--navigation-height) + 16px);
   }
   &::before {
      content: "";
      display: block;
      width: 10px;
      height: 19px;
      mask-image: url("/images/icons/arrow-long.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      transform: rotate(180deg);
      background-color: var(--bg-milk);
      mask-size: 10px 19px;
   }
}
</style>
