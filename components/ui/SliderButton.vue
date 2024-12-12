<template lang="pug">
	button(type="button" :class="`slider-button-${direction === 'prev' ? 'prev' : 'next'}`").slider-button
</template>

<script setup>
defineProps({
   direction: {
      type: String,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
@use "~/assets/scss/_vars" as *;
.slider-button {
   width: 48px;
   height: 48px;
   flex-shrink: 0;
   display: grid;
   place-items: center;
   &::before {
      content: "";
      display: block;
      width: 40px;
      height: 40px;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-smoke);
      mask-size: 38px 20px;
      transition: background-color $time * 2 $ttm;
   }
   &-prev {
      transform: rotate(180deg);
      &::before {
         mask-image: url("/images/icons/arrow-long-left.svg");
      }
   }
   &-next {
      &::before {
         mask-image: url("/images/icons/arrow-long-left.svg");
      }
   }
   &.swiper-button-lock,
   &.swiper-button-disabled {
      pointer-events: none;
      user-select: none;
      cursor: default;
      &::before {
         background-color: var(--system-disabled);
      }
   }
   @media (any-hover: hover) {
      cursor: pointer;
      &:hover:not(.swiper-button-disabled) {
         &::before {
            background-color: var(--text-gray);
         }
      }
   }
}
</style>
