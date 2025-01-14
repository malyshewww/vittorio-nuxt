<template lang="pug">
	.page-video
      video(loop muted playsinline autoplay)
         source(src="/hero.mp4" type="video/mp4")
         p.
            Ваш браузер не поддерживает встроенные видео. Попробуйте скачать его по
            | #[a(href="/welcome.mp4") этой ссылке]
</template>

<style lang="scss">
.page-video {
  height: 100dvh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
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
    opacity: 0.1;
  }
  @include bp-xl {
    position: absolute;
    overflow: hidden;
    &::before {
      position: absolute;
      height: 100%;
      inset: 0;
      z-index: 2;
    }
  }
  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @include bp-xl {
      height: 100%;
      position: absolute;
      inset: 0;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
