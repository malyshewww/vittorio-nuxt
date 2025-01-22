<template lang="pug">
	.gallery
		.heading
			h2.heading__title Фотогалерея
			UiSliderControls
		.gallery-slider
			.gallery-slider__body.swiper(ref="gallerySlider")
				.gallery-slider__wrapper.swiper-wrapper
					.gallery-slider__item.swiper-slide(v-for="(item, index) in gallery")
						a(:href="item.raw" data-fancybox="gallery" v-html="item.markup").gallery-slider__image.ibg
							//- img(:src="`/images/gallery/gallery-${item}.jpg`" alt="фото")
</template>

<script setup>
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";

import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

defineProps({
  gallery: {
    type: Array,
    required: true,
  },
});

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
      speed: 800,
      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        767.98: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      on: {
        init: function (swiper) {
          const slides = swiper.slides;
          const sliderControls =
            swiper.navigation.prevEl.parentNode ||
            swiper.navigation.nextEl.parentNode;
          const breakpoints = swiper.passedParams.breakpoints;
          for (const param in breakpoints) {
            const value = breakpoints[param];
            if (
              slides.length <= value.slidesPerView &&
              param <= window.innerWidth
            ) {
              swiper.navigation.destroy();
              sliderControls.remove();
            }
          }
        },
      },
    });
  }
};
onMounted(() => {
  initializeSlider();
  Fancybox.bind(`[data-fancybox="gallery"]`, { Hash: false });
  const tables = document.querySelectorAll(".content table");
  function tableWrap() {
    if (window.matchMedia("(max-width:767.98px)").matches) {
      for (const table of tables) {
        const tableWrap = document.createElement("div");
        tableWrap.classList.add("table-wrap");
        table.parentNode.insertBefore(tableWrap, table);
        tableWrap.appendChild(table);
      }
    }
  }
  tableWrap();
});
</script>

<style lang="scss">
@use "sass:math";
@use "assets/scss/vars" as *;
.gallery {
  padding-top: 140px;
  & .slider-controls {
    margin: 0;
  }
  @include bp-xl {
    padding-top: 100px;
  }
  @include bp-md {
    padding-top: 70px;
  }
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 60px;
  @include bp-md {
    margin-bottom: 30px;
  }
  &__title {
    font-size: 44px;
    line-height: 56px;
    font-family: var(--second-family);
    font-weight: 500;
    @include bp-md {
      font-size: 32px;
      line-height: 36px;
    }
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
    @include hover {
      &:hover {
        & img {
          transform: scale(1.3);
        }
      }
    }
  }
}
</style>
