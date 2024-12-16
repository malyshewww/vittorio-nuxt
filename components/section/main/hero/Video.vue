<template lang="pug">
	.page-video
		.page-video__wrap
			video(loop muted playsinline autoplay)
				source(src="/hero.mp4" type="video/mp4")
				p.
					Ваш браузер не поддерживает встроенные видео. Попробуйте скачать его по
					| #[a(href="/welcome.mp4") этой ссылке]
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
      background: transparent url("/images/noise.gif") repeat 0 0;
      background-repeat: repeat;
      background-blend-mode: soft-light;
      // animation: bg-animation 0.2s infinite;
      opacity: 0.1;
   }
   &__wrap {
      & video {
         width: 100%;
      }
   }
}
</style>
