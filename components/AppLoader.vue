<template lang="pug">
	.loader-container
		UiLoader(:is-white="true")
</template>

<script setup></script>

<style lang="scss">
.loader-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-dark);
  z-index: 99;
  display: grid;
  place-items: center;
  min-height: 100vh;
  pointer-events: none;
  transition: opacity 0.3s ease-out 0s;
  isolation: isolate;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: transparent url("/images/noise.png") repeat-y 0 0;
    background-repeat: repeat;
    background-blend-mode: soft-light;
    pointer-events: none;
    z-index: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
