<template lang="pug">
	button(type="button" :class="{active: isButtonVisible}" @click="scrollTop").button-up
</template>

<script setup>
const isButtonVisible = ref(false);

const observerButtonUp = () => {
   // Функция для показа/скрытия кнопки
   const heroSection = document.querySelector(".main-hero");
   const handleIntersection = (entries) => {
      entries.forEach((entry) => {
         if (!entry.isIntersecting) {
            isButtonVisible.value = true; // Показывать кнопку
         } else {
            isButtonVisible.value = false; // Скрывать кнопку
         }
      });
   };
   const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
   });
   observer.observe(heroSection);
};

const scrollTop = () => {
   const { bodyScrollBar } = useScrollbar();
   const page = document.querySelector(".page");
   if (window.innerWidth >= 1024) {
      bodyScrollBar.scrollIntoView(page);
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
</script>

<style lang="scss" scoped>
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
   transition: transform $time * 2 $ttm, opacity $time * 2 $ttm;
   &.active {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
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
