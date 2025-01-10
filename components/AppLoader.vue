<template lang="pug">
	.loader-container
		.loader
</template>

<script setup></script>

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
   pointer-events: none;
   transition: opacity 0.3s ease-out 0s;
}
.loader {
   width: 64px;
   height: 64px;
   position: relative;
   background-image: linear-gradient(#4b7078 16px, transparent 0),
      linear-gradient(#70445c 16px, transparent 0),
      linear-gradient(#2e4568 16px, transparent 0),
      linear-gradient(#713b3b 16px, transparent 0);
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
