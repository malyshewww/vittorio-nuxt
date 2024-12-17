<template lang="pug">
	button(v-if="isAnchor" type="button" :class="classNames" :data-scroll-to-href="path" @click="buttonAction").link-line {{text}}
	button(v-else type="button" :class="classNames" @click="buttonAction").btn-line {{text}}
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
      default: "",
   },
   isAnchor: {
      required: false,
      type: Boolean,
      default: () => false,
   },
});

const emit = defineEmits(["buttonAction"]);

const buttonAction = () => {
   emit("buttonAction");
};
</script>

<style lang="scss" scoped>
@use "assets/scss/_vars" as *;
.btn-line {
   font-weight: 700;
   font-size: 12px;
   line-height: 16px;
   letter-spacing: 0.02em;
   text-transform: uppercase;
   display: flex;
   align-items: center;
   gap: 12px;
   padding: 4px 0;
   &::before {
      content: "";
      display: block;
      display: block;
      width: 30px;
      height: 1px;
      background-color: currentColor;
      transition: width $time * 2 $ttm;
   }
   @media (any-hover: hover) {
      &:hover {
         &::before {
            width: 50px;
         }
      }
   }
   &:disabled {
      color: var(--system-disabled);
      pointer-events: none;
   }
}
</style>
