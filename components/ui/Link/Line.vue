<template lang="pug">
	nuxt-link(v-if="isAnchor" type="button" :class="classNames" :href="path" :data-href="path").link-line {{text}}
	nuxt-link(v-else :to="path" :class="classNames").link-line {{text}}
</template>

<script setup>
defineProps({
   path: {
      type: String,
      required: false,
      default: () => "/",
   },
   text: {
      type: String,
      required: true,
   },
   classNames: {
      type: String,
      required: false,
   },
   isAnchor: {
      required: false,
      type: Boolean,
      default: () => false,
   },
});
</script>

<style lang="scss" scoped>
.link-line {
   font-weight: 500;
   font-size: 20px;
   line-height: 24px;
   letter-spacing: 0.04em;
   text-transform: uppercase;
   color: var(--bg-smoke);
   font-family: var(--second-family);
   display: flex;
   align-items: center;
   gap: 16px;
   &.short-link {
      font-family: var(--font-family);
      gap: 12px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 700;
      letter-spacing: 0.02em;
      &::before {
         width: 30px;
      }
      @media (any-hover: hover) {
         &:hover {
            &::before {
               width: 50px;
            }
         }
      }
   }
   &::before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      background-color: currentColor;
      transition: width $time * 2 $ttm;
   }
   @media (any-hover: hover) {
      &:hover {
         &::before {
            width: 70px;
         }
      }
   }
   &:disabled {
      color: var(--system-disabled);
      pointer-events: none;
   }
}
</style>
