<template lang="pug">
	nuxt-link(:to="url").preview-card__slider.preview-slider
		div(ref="imageSlider").preview-card__images
			.image-switch
				.image-switch__item(v-for="(image, idx) in images" :key="idx" @mouseenter="switchImages(idx)" @mouseleave="initialState" :class="{active: currentImage === idx}")
					.image-switch__picture(v-html="image.markup")
		.preview-slider__pagination.image-pagination(v-if="images.length > 1")
			ul.image-pagination__list
				li.image-pagination__item(v-for="(image, idx) in images" :key="idx" :class="{active: currentImage === idx}" @click="switchImages(idx)")
		.swiper-pagination(v-if="images.length > 1" ref="imagePagination")
</template>

<script setup>
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
const switchImages = (key) => {
   currentImage.value = key;
};
const initialState = () => {
   currentImage.value = 0;
};
</script>

<style lang="scss">
.preview-card {
   &__slider {
      width: 100%;
      position: relative;
      padding-bottom: math.div(512, 425) * 100%;
      display: block;
      overflow: hidden;
      @media (any-hover: hover) {
         &:hover {
            & .image-pagination {
               opacity: 1;
               transform: translateY(0);
            }
         }
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
   @media screen and (max-width: $xl) {
      position: static;
   }
   &__item {
      flex-grow: 1;
      @media screen and (max-width: $xl) {
         flex-grow: 0;
         flex-shrink: 0;
         width: 100%;
      }
      @media screen and (min-width: $xl) {
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
         @media (any-hover: hover) {
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
      //   z-index: var(--bg-midnight-100);
      & > * {
         width: 100%;
         height: 100%;
         & > * {
            width: 100%;
            height: 100%;
         }
      }
      @media screen and (max-width: $xl) {
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
   transition: opacity $time * 2 $ttm, transform $time * 2 $ttm;
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
      transition: opacity $time * 2 $ttm;
      &.active {
         opacity: 1;
      }
      @media (any-hover: hover) {
         &:hover {
            cursor: pointer;
         }
      }
      @media screen and (max-width: $xl) {
         width: 20px;
         height: 2px;
         flex-shrink: 0;
      }
   }
}
.swiper-pagination {
   position: static;
   justify-content: center;
   display: none;
   @media screen and (max-width: $xl) {
      display: flex;
   }
   & .swiper-pagination-bullet {
      width: 20px;
      height: 2px;
      flex-shrink: 0;
      border-radius: 0;
      //   background: var(--bg-white-dirt);
      opacity: 1;
      &-active {
         background: var(--text-gray);
      }
   }
   & .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
   .swiper-pagination-horizontal.swiper-pagination-bullets
      .swiper-pagination-bullet {
      width: 20px;
      height: 2px;
      flex-shrink: 0;
   }
}
</style>
