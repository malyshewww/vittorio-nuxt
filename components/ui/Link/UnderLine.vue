<template lang="pug">
	nuxt-link(:to="path" :target="`${isBlank? '_blank' : ''}`" :class="classNames").link-under {{text}}
</template>

<script setup>
const props = defineProps({
   path: {
      type: String,
      required: true,
      default: "",
   },
   isBlank: {
      type: Boolean,
      required: false,
      default: false,
   },
   text: {
      type: String,
      required: true,
      default: "",
   },
   classNames: {
      type: String,
      required: false,
      default: "",
   },
});
</script>

<style lang="scss">
@use "~/assets/scss/_vars" as *;
.link-under {
   position: relative;
   transition: color $time * 2 $ttm;
   color: var(--text-gray);
   &::before {
      content: "";
      width: 100%;
      height: 1px;
      border-bottom: 1px solid currentColor;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scale(0);
      transition: transform $time * 2 $ttm;
      transform-origin: center center;
   }
   &.link-white {
      @media (any-hover: hover) {
         &:hover {
            color: var(--bg-white);
         }
      }
   }
   @media (any-hover: hover) {
      &:hover {
         color: var(--bg-smoke);
         &::before {
            transform: scale(1);
         }
      }
   }
}
</style>
