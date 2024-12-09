<template lang="pug">
	.product-card__slider.product-slider
		.product-slider__vertical
			UiSliderButton(direction="prev")
			UiSliderButton(direction="next")
			.vertical-slider.swiper(ref="thumbSlider")
				.vertical-slider__wrapper.swiper-wrapper
					.vertical-slider__item.swiper-slide(v-for="(image, index) in images" :key="index" @click="changeSlide(index)")
						.vertical-slider__image.ibg(v-html="image.markup")
							//- img(:src="`/images/notes/${image}.jpg`" :alt="image")
		.main-slider.swiper(ref="mainSlider")
			.main-slider__wrapper.swiper-wrapper
				.main-slider__item.swiper-slide(v-for="(image, index) in images" :key="index")
					a(:href="image.raw" data-fancybox="gallery").main-slider__image.ibg(v-html="image.markup")
						//- img(:src="`/images/notes/${image}.jpg`" :alt="image")
			UiSliderButton(direction="prev")
			UiSliderButton(direction="next")
</template>

<script setup>
import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";

import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

defineProps({
   images: {
      type: Array,
      required: true,
   },
});

const thumbSlider = ref("");
const thumbSwiper = ref(null);

const mainSlider = ref("");
const mainSwiper = ref(null);

const direction = ref("vertical");

const initSlider = (direction) => {
   const buttonPrev = thumbSlider.value.parentNode.querySelector(
      ".slider-button-prev"
   );
   const buttonNext = thumbSlider.value.parentNode.querySelector(
      ".slider-button-next"
   );
   thumbSwiper.value = new Swiper(thumbSlider.value, {
      modules: [Navigation],
      spaceBetween: 10,
      slidesPerView: 3,
      speed: 900,
      direction,
      watchSlidesProgress: true,
      observer: true,
      navigation: {
         nextEl: buttonNext,
         prevEl: buttonPrev,
      },
      breakpoints: {
         0: {
            slidesPerView: 2,
         },
         768: {
            slidesPerView: 3,
         },
      },
      on: {
         init: function (swiper) {
            const slides = swiper.slides;
            if (slides.length <= 3) {
               buttonPrev.remove();
               buttonNext.remove();
            }
         },
      },
   });
   const mainButtonPrev = mainSlider.value.querySelector(".slider-button-prev");
   const mainButtonNext = mainSlider.value.querySelector(".slider-button-next");
   mainSwiper.value = new Swiper(mainSlider.value, {
      modules: [Navigation, Thumbs],
      spaceBetween: 10,
      slidesPerView: 1,
      speed: 900,
      thumbs: {
         swiper: thumbSwiper.value,
      },
      navigation: {
         nextEl: mainButtonNext,
         prevEl: mainButtonPrev,
      },
      on: {
         init: function (swiper) {
            const slides = swiper.slides;
            if (slides.length <= 1) {
               mainButtonPrev.remove();
               mainButtonNext.remove();
            }
         },
      },
   });
};

const changeSlide = (index) => {
   console.log(index);
   mainSwiper.value.slideTo(index);
};

onMounted(() => {
   initSlider(direction.value);
   Fancybox.bind(`[data-fancybox="gallery"]`, { Hash: false });
   //    $('.vertical-slider__item').first().addClass('swiper-slide-thumb-active')
   //     $('.vertical-slider__item').on('click', function () {
   //         $(this).addClass('swiper-slide-thumb-active').siblings().removeClass('swiper-slide-thumb-active')
   //         bigSlider.slideTo($(this).index())
   //     })
});
</script>

<style lang="scss">
.product-card {
   &__slider {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      //   max-width: 890px;
      width: 46.354vw;
   }
}
.product-slider {
   &__vertical {
      padding: 48px 0;
      position: relative;
      & .slider-button {
         position: absolute;
         width: 100%;
         display: flex;
         justify-content: center;
         height: 28px;
         &::before {
            width: 24px;
            height: 24px;
            mask-size: 24px 24px;
            transform: rotate(90deg);
         }
         &-prev {
            top: 0;
         }
         &-next {
            bottom: 0;
         }
      }
   }
}
.vertical-slider {
   height: calc(676px - 96px);
   &__wrapper {
   }
   &__item {
      width: 150px;
      position: relative;
      @media (any-hover: hover) {
         &:hover {
            cursor: pointer;
         }
      }
      &.swiper-slide-thumb-active {
         & .vertical-slider__image {
            &::before {
               opacity: 1;
            }
            & img {
               transform: scale(0.9);
            }
         }
      }
      // height: 180px;
   }
   &__image {
      padding-bottom: math.div(180, 150) * 100%;
      overflow: hidden;
      &::before {
         content: "";
         border: 1px solid var(--bg-smoke);
         position: absolute;
         inset: 0;
         width: 100%;
         height: 100%;
         opacity: 0;
         transition: opacity $time * 2 $ttm;
         pointer-events: none;
         z-index: 2;
      }
      & img {
         transform-origin: center;
         transition: transform $time * 2 $ttm;
      }
   }
}
.main-slider {
   width: 100%;
   @media (any-hover: hover) {
      &:hover {
         & .slider-button {
            &-prev {
               transform: translateX(0) rotate(180deg);
            }
            &-next {
               transform: translateX(0);
            }
         }
      }
   }
   &__wrapper {
   }
   &__item {
      @media (any-hover: hover) {
         &:hover {
            cursor: pointer;
         }
      }
   }
   &__image {
      padding-bottom: math.div(840, 700) * 100%;
      overflow: hidden;
      display: block;
   }
   & .slider-button {
      position: absolute;
      top: 0;
      z-index: 5;
      width: 80px;
      display: flex;
      justify-content: center;
      height: 100%;
      transition: transform $time * 2 $ttm;
      &::before {
         width: 34px;
         height: 34px;
         mask-size: 34px 34px;
      }
      &-prev {
         left: 0;
         transform: translateX(-100%) rotate(180deg);
      }
      &-next {
         right: 0;
         transform: translateX(100%);
      }
   }
}
</style>
