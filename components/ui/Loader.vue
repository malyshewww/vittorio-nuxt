<template lang="pug">
    .loader(:class="{white: isWhite}")
</template>

<script setup>
defineProps({
  isWhite: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});
</script>

<style lang="scss" scoped>
.loader {
  width: 25px;
  height: 50px;
  display: grid;
  color: #000;
  background: linear-gradient(currentColor 0 0) top/100% 2px,
    radial-gradient(
        farthest-side at top,
        #0000 calc(100% - 2px),
        currentColor calc(100% - 1px),
        #0000
      )
      top,
    linear-gradient(currentColor 0 0) bottom/100% 2px,
    radial-gradient(
        farthest-side at bottom,
        #0000 calc(100% - 2px),
        currentColor calc(100% - 1px),
        #0000
      )
      bottom;
  background-size: 100% 1px, 100% 50%;
  background-repeat: no-repeat;
  animation: loader 4s infinite linear;
  &.white {
    color: #ffffff;
  }
  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    background: inherit;
    border: inherit;
    animation: inherit;
  }
  &::after {
    animation-duration: 2s;
  }
}
@keyframes loader {
  100% {
    transform: rotate(1turn);
  }
}
</style>
