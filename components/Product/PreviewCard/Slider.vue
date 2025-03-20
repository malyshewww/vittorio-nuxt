<template lang="pug">
	nuxt-link(:to="url").preview-card__slider.preview-slider
		div(ref="imageSlider").preview-card__images
			.image-switch
				.image-switch__item(v-for="(image, idx) in images" :key="idx" @mouseenter="switchImages(idx)" @mouseleave="initialState" :class="{active: currentImage === idx}")
					.image-switch__picture(v-html="image.markup")
		.preview-slider__pagination.image-pagination(v-if="images.length > 1")
			ul.image-pagination__list
				li.image-pagination__item(v-for="(image, idx) in images" :key="idx" :class="{active: currentImage === idx}" @click="switchImages(idx)")
		//- .swiper-pagination-wrap
		//- 	.swiper-pagination(ref="imagePagination" v-if="images.length > 1" )
</template>

<script setup>
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";

defineProps({
  url: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const currentImage = ref(0);

// eslint-disable-next-line
const switchImages = (key) => {
  currentImage.value = key;
};

// eslint-disable-next-line
const initialState = () => {
  currentImage.value = 0;
};

const imageSlider = ref("");
const imageSwiper = ref("");
// const imagePagination = ref("");

function initializeSwiper() {
  imageSwiper.value = new Swiper(imageSlider.value, {
    modules: [Pagination],
    wrapperClass: "image-switch",
    slideClass: "image-switch__item",
    spaceBetween: 10,
    slidesPerView: 1,
    speed: 800,
    centeredSlides: true,
    on: {
      slideChange: function (swiper) {
        const activeIndex = swiper.activeIndex;
        switchImages(activeIndex);
      },
    },
    // pagination: {
    //   el: imagePagination.value,
    //   clickable: true,
    // },
  });
}
function destroySwiper() {
  if (imageSwiper.value) {
    imageSwiper.value.destroy();
    imageSwiper.value = null;
  }
}
function checkScreenWidth() {
  // window.matchMedia("(max-width: 1024px)").matches
  if (window.innerWidth < 1024) {
    initializeSwiper();
  } else if (window.innerWidth > 1024) {
    destroySwiper();
  }
}

onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidth);
});
</script>

<style lang="scss">
@use "sass:math";
.preview-card {
  &__slider {
    width: 100%;
    position: relative;
    padding-bottom: math.div(512, 425) * 100%;
    display: block;
    overflow: hidden;
    @include hover {
      &:hover {
        & .image-pagination {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
    @include bp-md {
      padding-bottom: math.div(420, 335) * 100%;
    }
  }
  &__images {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
    //   position: relative;
    //   height: 232px;
  }
}
.image-switch {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  @include bp-xl {
    position: static;
  }
  &__item {
    flex-grow: 1;
    @include bp-xl {
      flex-grow: 0;
      flex-shrink: 0;
      width: 100%;
    }
    @media screen and (min-width: 1024px) {
      &.active {
        & .image-switch__picture {
          opacity: 1;
          z-index: 1;
        }
      }
      &:first-child .image-switch__picture {
        opacity: 1;
        z-index: -1;
      }
      @include hover {
        &:hover {
          cursor: pointer;
          & .image-switch__picture {
            opacity: 1;
            z-index: -1;
          }
        }
      }
    }
  }
  &__picture {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: var(--bg-milk);
    justify-content: center;
    left: 50%;
    opacity: 0;
    pointer-events: none;
    top: 0;
    transform: translateX(-50%);
    & > * {
      width: 100%;
      height: 100%;
      & > * {
        width: 100%;
        height: 100%;
      }
    }
    @include bp-xl {
      opacity: 1;
      position: static;
      transform: none;
      pointer-events: all;
    }
  }
}
.image-pagination {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 8px;
  z-index: 5;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity calc(var(--time) * 2) var(--ttm), transform calc(var(--time) * 2) var(--ttm);
  @include bp-xl {
    pointer-events: none;
    transform: translateY(0);
    opacity: 1;
    // display: none;
  }
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
  &__item {
    background-color: var(--bg-smoke);
    opacity: 0.3;
    flex-grow: 1;
    height: 2px;
    transition: opacity calc(var(--time) * 2) var(--ttm);
    &.active {
      opacity: 1;
    }
    @include hover {
      &:hover {
        cursor: pointer;
      }
    }
    @include bp-xl {
      width: 20px;
      height: 2px;
      flex-shrink: 0;
    }
  }
}
.swiper-pagination {
  justify-content: center;
  bottom: 8px;
  &-wrap {
    display: none;
    position: absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    padding: 0 8px;
    @include bp-xl {
      display: flex;
    }
  }
  @include bp-xl {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  & .swiper-pagination-bullet {
    width: auto;
    flex-grow: 1;
    height: 2px;
    flex-shrink: 0;
    border-radius: 0;
    background: var(--bg-smoke);
    opacity: 0.3;
    &-active {
      opacity: 1;
      background: var(--bg-smoke);
    }
  }
  &.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
    width: 100%;
    // width: calc(100% - 16px);
  }
  & .swiper-pagination-bullets .swiper-pagination-bullet {
    width: auto;
    flex-grow: 1;
    height: 2px;
    flex-shrink: 0;
    margin: 0 !important;
  }
}
</style>
