<template lang="pug">
	.fragrances-slider
		.swiper(ref="slider")
			.swiper-wrapper
				.swiper-slide.fragrances-slide(v-for="(item, idx) in countries" :key="idx" :data-slide-key="item.key")
					.fragrances-slide__body
						.fragrances-slide__image.ibg(v-html="item.field_images[0].markup")
							//- picture
							//- 	img(:src="`/images/notes/${item.img}.jpg`" :alt="item.title" loading="lazy")
						.fragrances-slide__content
							.fragrances-slide__title(v-if="item.title" v-html="item.title")
							.fragrances-slide__country(v-if="item.field_country_text" v-html="item.field_country_text")
							UiLinkLine(text="подробнее" classNames="short-link" :path="item.url")
		.slider-controls
			.slider-pagination
			UiSliderButton(direction="prev")
			UiSliderButton(direction="next")
</template>

<script setup>
import { ref, watch } from "vue";
import Swiper from "swiper";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
});

const slider = ref("");
const swiper = ref(null);

watch(
   () => props.isEnableAutoplay,
   (newValue, oldValue) => {
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

const initSlider = () => {
   const buttonPrev = slider.value.parentNode.querySelector(
      ".slider-button-prev"
   );
   const buttonNext = slider.value.parentNode.querySelector(
      ".slider-button-next"
   );
   const pagination =
      slider.value.parentNode.querySelector(".slider-pagination");
   swiper.value = new Swiper(slider.value, {
      modules: [Navigation, Pagination, Autoplay],
      autoHeight: true,
      speed: 1000,
      spaceBetween: 10,
      navigation: {
         nextEl: buttonNext,
         prevEl: buttonPrev,
      },
      pagination: {
         el: pagination,
         type: "fraction",
      },
      autoplay: {
         delay: 5000,
         disableOnInteraction: false,
      },
      on: {
         slideChange: function (swiper) {
            const activeIndex = swiper.activeIndex;
            const slides = swiper.slides;
            const currentSlideKey =
               slides[activeIndex].getAttribute("data-slide-key");
            // console.log(currentKey);
            changeArea(currentSlideKey);
            changeMapArea(currentSlideKey);
         },
      },
   });
   toggleAutoplay(props.isEnableAutoplay, swiper.value);
};
onMounted(() => {
   initSlider();
});

const slides = [
   {
      img: "legend",
      title: "Legend № 11.01",
      descr: "Италия, Марокко, Япония, Россия, Турция, Бразилия, Франция, Индия, Китай",
      key: "legend",
   },
   {
      img: "santal&leather",
      title: "Santal & Leather",
      descr: "Индия (джунгли)",
      key: "santal",
   },
   {
      img: "protagonist",
      title: "Protagonist",
      descr: "Марокко (Марракеш)",
      key: "protagonist",
   },
   {
      img: "musk-melody",
      title: "Musk melody",
      descr: "Италия (Венеция)",
      key: "musk",
   },
   {
      img: "essay",
      title: "Essay",
      descr: "Россия (Москва)",
      key: "essay",
   },
   {
      img: "ethnos-v",
      title: "Ethnos V.",
      descr: "Бразилия (район реки Амазонки, джунгли)",
      key: "ethnos",
   },
   {
      img: "erato",
      title: "Erato",
      descr: "Греция",
      key: "erato",
   },
   {
      img: "voice-of-the-sea",
      title: "Voice of the sea",
      descr: "Италия (Палермо)",
      key: "voice",
   },
   {
      img: "velvet-peony",
      title: "Velvet Peony",
      descr: "Китай (Лоян)",
      key: "velvet",
   },
];
</script>

<style lang="scss">
.fragrances-slider {
   padding: 50px;
   max-width: 460px;
   position: relative;
   &::after {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: var(--bg-smoke);
      top: 0;
      right: 0;
   }
}
.fragrances-slide {
   &__body {
      display: flex;
      flex-direction: column;
      gap: 32px;
      align-items: flex-start;
   }
   &__image {
      align-self: stretch;
      padding-bottom: math.div(440, 360) * 100%;
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
   }
   &__country {
      line-height: 22px;
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
}
</style>
