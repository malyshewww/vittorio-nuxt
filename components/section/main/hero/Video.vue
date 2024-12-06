<template lang="pug">
	.page-video
		.page-video__wrap
			.main-hero__image
				img(:src="`/images/main/bg.jpg`" alt="hero bg")
</template>

<style lang="scss">
.page-video {
   height: 100vh;
   left: 0;
   position: fixed;
   top: 0;
   width: 100%;
   z-index: -1;
   pointer-events: none;
   &::before {
      content: "";
      position: fixed;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      width: 200%;
      height: 200vh;
      pointer-events: none;
      background: transparent url("/images/noise.png") repeat 0 0;
      background-repeat: repeat;
      background-blend-mode: soft-light;
      animation: bg-animation 0.2s infinite;
   }
}
</style>
