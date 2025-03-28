<template lang="pug">
	.fragrances-slider
		.swiper(ref="slider")
			.swiper-wrapper
				.swiper-slide.fragrances-slide(v-for="(item, idx) in countries" :key="idx" :data-slide-key="item.key")
					.fragrances-slide__body
						nuxt-link(:to="item.url").fragrances-slide__image.ibg
							div(v-html="item.field_images[0].markup")
							//- picture
							//- 	img(:src="`/images/notes/${item.img}.jpg`" :alt="item.title" loading="lazy")
						.fragrances-slide__content
							.fragrances-slide__title(v-if="item.title" v-html="item.title")
							.fragrances-slide__country(v-if="item.field_country_text" v-html="item.field_country_text")
							UiLinkLine(text="подробнее" classNames="short-link" :path="item.url")
		.slider-controls
			.slider-pagination
			UiSliderButton(ref="buttonPrev" direction="prev")
			UiSliderButton(ref="buttonNext" direction="next")
</template>

<script setup>
import { ref, watch } from "vue";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const emit = defineEmits(["changeArea"]);

const props = defineProps({
  isEnableAutoplay: {
    type: Boolean,
    required: true,
  },
  currentSlideIndex: {
    type: Number,
    required: true,
  },
  countries: {
    type: Object,
    required: true,
  },
  activeArea: {
    type: String,
    required: false,
    default: "",
  },
});

const slider = ref("");
const swiper = ref(null);

watch(
  () => props.isEnableAutoplay,
  () => {
    toggleAutoplay(props.isEnableAutoplay, swiper.value);
  }
);

watch(
  () => props.currentSlideIndex,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      changeSlide(swiper.value, newValue);
    }
    if (oldValue > newValue) {
      changeSlide(swiper.value, newValue);
    }
  }
);

const changeArea = (key) => {
  emit("changeArea", key);
};

const changeMapArea = (key) => {
  const paths = document.querySelectorAll(".fragrances__svg path");
  if (paths.length) {
    paths.forEach((path) => {
      const currentArea = path.dataset.area;
      const currentAreaDouble = path.dataset.areaDouble; // Единая зона для ароматов Voice of the sea и Musk Melody
      const legendPlace = path.dataset.place;
      const fillArea = path.dataset.fill;
      if (key == "legend") {
        if (key == legendPlace) {
          path.style.fill = "#382d32";
        }
      } else if (key == "voice") {
        if (key == currentAreaDouble) {
          path.style.fill = "#2e4568";
        }
      } else if (key == currentArea) {
        path.style.fill = `${fillArea}`;
      } else {
        path.style.fill = "transparent";
      }
    });
  }
};

function toggleAutoplay(isEnabled, swiper) {
  if (isEnabled) {
    swiper.autoplay.start();
  } else {
    swiper.autoplay.stop();
  }
}

function changeSlide(swiper, index) {
  if (swiper) {
    swiper.slideTo(index);
  }
}

const slides = ref(null);
const buttonPrev = ref("");
const buttonNext = ref("");

const initSlider = () => {
  const pagination = slider.value.parentNode.querySelector(".slider-pagination");
  swiper.value = new Swiper(slider.value, {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    autoHeight: true,
    speed: 1000,
    spaceBetween: 10,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: buttonNext.value.button,
      prevEl: buttonPrev.value.button,
    },
    pagination: {
      el: pagination,
      type: "fraction",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {},
    on: {
      init: function (swiper) {
        slides.value = swiper.slides;
      },
      slideChange: function (swiper) {
        const activeIndex = swiper.activeIndex;
        const slides = swiper.slides;
        const currentSlideKey = slides[activeIndex].getAttribute("data-slide-key");
        changeArea(currentSlideKey);
        const markers = document.querySelectorAll(".marker");
        if (markers.length) {
          markers.forEach((marker) => marker.classList.remove("active"));
        }
        changeMapArea(currentSlideKey);
      },
    },
  });
  toggleAutoplay(props.isEnableAutoplay, swiper.value);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      toggleAutoplay(entry.isIntersecting, swiper.value); // Включаем/выключаем autoplay в зависимости от видимости
    });
  });
  observer.observe(slider.value);
  // const markers = document.querySelectorAll(".marker");
  // markers.forEach((marker) => {
  //   marker.addEventListener("mouseenter", () => {
  //     console.log("enter");
  //     const key = marker.dataset.markerKey;
  //     const slide = slides.value[key];
  //   });
  // });
};

onMounted(() => {
  initSlider();
});
</script>

<style lang="scss">
@use "sass:math";
.fragrances-slider {
  padding: 50px;
  max-width: 460px;
  position: relative;
  overflow: hidden;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    pointer-events: none;
  }
  &::before {
    top: 0;
    border: 1px solid var(--bg-smoke);
    border-left: 0;
    border-bottom: 0;
    transform: translateX(-100%);
  }
  &::after {
    bottom: 0;
    transform: translateX(-100%);
    border-bottom: 1px solid var(--bg-smoke);
    display: none;
  }
  @include bp-xxl {
    max-width: 100%;
    padding: 25px 0;
    width: 100%;
    &::before {
      border-right: 0;
    }
    &::after {
      display: block;
    }
    & .swiper {
      max-width: 500px;
    }
  }
}
.fragrances-slide {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-start;
    @include bp-md {
      flex-direction: row;
    }
    @media screen and (max-width: 374px) {
      gap: 12px;
    }
  }
  &__image {
    align-self: stretch;
    padding-bottom: math.div(440, 360) * 100%;
    @include bp-md {
      // height: 200px;
      // width: 157px;
      height: 53.333vw;
      width: 41.867vw;
      flex-shrink: 0;
      padding: 0;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    color: var(--bg-smoke);
  }
  &__title {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    text-transform: uppercase;
    @include bp-md {
      font-size: 22px;
      line-height: 28px;
    }
    @media screen and (max-width: 374px) {
      font-size: 20px;
      line-height: 24px;
    }
  }
  &__country {
    line-height: 22px;
    @include bp-md {
      font-size: 14px;
      line-height: 18px;
    }
  }
  & .link-line {
    margin-top: 8px;
  }
}
.slider-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  @include bp-xxl {
    justify-content: center;
  }
  @include bp-md {
    margin-top: 16px;
  }
}
.slider-pagination {
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: var(--system-disabled);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: auto;
  & .swiper-pagination-current {
    color: var(--bg-smoke);
  }
  @include bp-xxl {
    display: none;
  }
}
</style>
