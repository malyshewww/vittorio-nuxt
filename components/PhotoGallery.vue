<template lang="pug">
	.gallery
		.heading
			h2.heading__title Фотогалерея
			UiSliderControls
		.gallery-slider
			.gallery-slider__body.swiper(ref="gallerySlider")
				.gallery-slider__wrapper.swiper-wrapper
					.gallery-slider__item.swiper-slide(v-for="(item, index) in 5")
						a(:href="`/images/gallery/gallery-${index+1}.jpg`" data-fancybox="gallery").gallery-slider__image.ibg
							img(:src="`/images/gallery/gallery-${item}.jpg`" alt="фото")
</template>

<script setup>
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";

import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const gallerySlider = ref(null);
const gallerySwiper = ref(null);

const initializeSlider = () => {
   if (gallerySlider.value) {
      const buttonPrev = gallerySlider.value
         .closest(".gallery")
         .querySelector(".slider-button-prev");
      const buttonNext = gallerySlider.value
         .closest(".gallery")
         .querySelector(".slider-button-next");
      gallerySwiper.value = new Swiper(gallerySlider.value, {
         modules: [Navigation],
         slidesPerView: 4,
         spaceBetween: 40,
         speed: 800,
         navigation: {
            nextEl: buttonNext,
            prevEl: buttonPrev,
         },
      });
   }
};
onMounted(() => {
   initializeSlider();
   Fancybox.bind(`[data-fancybox="gallery"]`, { Hash: false });
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "~/assets/scss/_vars" as *;
.gallery {
   padding-top: 140px;
}
.heading {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 20px;
   flex-wrap: wrap;
   margin-bottom: 60px;
   &__title {
      font-size: 44px;
      line-height: 56px;
      font-family: var(--second-family);
      font-weight: 500;
   }
}
.gallery-slider {
   &__wrapper {
   }
   &__image {
      display: block;
      padding-bottom: math.div(440, 425) * 100%;
      overflow: hidden;
      & img {
         transition: transform $time * 4 $ttm;
      }
      @media (any-hover: hover) {
         &:hover {
            & img {
               transform: scale(1.3);
            }
         }
      }
   }
}
</style>
