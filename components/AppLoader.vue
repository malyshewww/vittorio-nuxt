<template lang="pug">
	.loader-container(v-if="isLoading")
		.loader
</template>

<script setup>
const isLoading = ref(true);

onNuxtReady(() => {
   isLoading.value = false;
});
</script>

<style lang="scss">
.loader-container {
   position: fixed;
   inset: 0;
   width: 100%;
   height: 100%;
   background-color: var(--bg-dark);
   z-index: 40;
   display: grid;
   place-items: center;
   min-height: 100vh;
   opacity: 1;
   pointer-events: none;
   transition: opacity 0.3s ease-out 0s;
   &.active {
      opacity: 1;
   }
}
.loader {
   width: 64px;
   height: 64px;
   position: relative;
   background-image: linear-gradient(#fff 16px, transparent 0),
      linear-gradient(#ff3d00 16px, transparent 0),
      linear-gradient(#ff3d00 16px, transparent 0),
      linear-gradient(#fff 16px, transparent 0);
   background-repeat: no-repeat;
   background-size: 16px 16px;
   background-position: left top, left bottom, right top, right bottom;
   animation: rotate 1s linear infinite;
}
@keyframes rotate {
   0% {
      width: 64px;
      height: 64px;
      transform: rotate(0deg);
   }
   50% {
      width: 30px;
      height: 30px;
      transform: rotate(180deg);
   }
   100% {
      width: 64px;
      height: 64px;
      transform: rotate(360deg);
   }
}
</style>
