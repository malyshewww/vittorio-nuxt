<template lang="pug">
	section.welcome#welcome
		.container
			.welcome__body
				.welcome__heading
					h2.welcome__title Добро пожаловать в мир Vittorio
				.welcome__video-wrap(ref="videoWrap")
					.welcome__video.ibg(ref="videoBlock")
						video(ref="video" :loop="isVideoLoop" :muted="isVideoMuted" playsinline :autoplay="isVideoAutoplay" :controls="isVideoControls && !isVideoMuted" @ended="endVideo()" :poster="`/images/sections/welcome/poster.jpg`")
							source(:src="`/welcome.mp4`" type="video/mp4")
							p.
								Ваш браузер не поддерживает встроенные видео. Попробуйте скачать его по
								| #[a(href="/welcome.mp4") этой ссылке]
					button(type="button" @click="startVideo" :class="{hidden: isVideoPlay}").welcome__video-btn
				.welcome__main
					.welcome__images.welcome__images--left
						.welcome__image.welcome__image-big
							NuxtPicture(:src="`images/sections/welcome/img-big.jpg`" alt="img-big")
						.welcome__image.welcome__image-border-small
							NuxtPicture(:src="`images/sections/welcome/img-border-small.jpg`" alt="img-border")
					.welcome__description
						h3.welcome__title-small(v-if="text.info") {{text.info}}
						.hidden-block
							.hidden-block__wrap(ref="hiddenBlockWrap")
								ContentBlock(ref="hiddenBlockContent" :content="text.body")
							UiButtonLine(v-if="state.isVisible" :text="state.textBtn" @button-action="toggleHiddenBlock" class-names="show-more")
					.welcome__images.welcome__images--right
						.welcome__image.welcome__image-border-big
							NuxtPicture(:src="`images/sections/welcome/img-border-big.jpg`" alt="img-border-big")
</template>

<script setup>
import { useAppStore } from "~/stores/app";
import { throttle } from "lodash-es";

const appStore = useAppStore();

const { $gsap: gsap } = useNuxtApp();

defineProps({
  text: {
    required: true,
    type: Object,
    default: () => {},
  },
});

const state = reactive({
  isVisible: false,
  textHeight: 0,
  isCollapsed: true,
  textBtn: "узнать больше",
});

const hiddenBlockContent = ref(null);
const hiddenBlockWrap = ref(null);

const videoWrap = ref(null);
const video = ref(null);
const videoBlock = ref(null);

const animation = () => {
  if (!appStore.isMobile) {
    gsap.to(videoBlock.value, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transformOrigin: "center center",
      height: "760px",
      scrollTrigger: {
        trigger: videoWrap.value,
        start: "bottom bottom",
        // end: () => `+=100%`,
        end: "bottom+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });
    const images = gsap.utils.toArray(".welcome__image");
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { y: 100, autoAlpha: 1 },
        {
          yPercent: -150,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "top top+=100",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        }
      );
    });
  }
};

const initialStateVideo = () => {
  if (appStore.isMobile) {
    video.value.pause();
    isVideoControls.value = true;
    isVideoAutoplay.value = false;
    isVideoLoop.value = false;
  }
};

const isVideoMuted = ref(true);
const isVideoPlay = ref(false);
const isVideoControls = ref(false);
const isVideoAutoplay = ref(true);
const isVideoLoop = ref(true);

// eslint-disable-next-line
const startVideo = () => {
  video.value.play();
  isVideoPlay.value = true;
  isVideoMuted.value = false;
  isVideoControls.value = true;
};

// eslint-disable-next-line
function endVideo() {
  isVideoControls.value = false;
  isVideoPlay.value = false;
  isVideoMuted.value = true;
}

onMounted(() => {
  state.textHeight = hiddenBlockContent.value.content.clientHeight;
  if (state.textHeight > hiddenBlockWrap.value.clientHeight) {
    state.isVisible = true;
  }
  animation();
  initialStateVideo();
  const watchResize = throttle(function () {
    animation();
  }, 1000);
  window.addEventListener("resize", watchResize);
});

watch(
  () => state.isCollapsed,
  () => {
    if (!state.isCollapsed) {
      state.textBtn = "скрыть";
    } else {
      state.textBtn = "узнать больше";
    }
  }
);

// eslint-disable-next-line
function toggleHiddenBlock() {
  state.isCollapsed = !state.isCollapsed;
  if (!state.isCollapsed) {
    hiddenBlockWrap.value.style.maxHeight = `${state.textHeight}px`;
  } else {
    hiddenBlockWrap.value.style.maxHeight = ``;
  }
}
</script>

<style lang="scss">
@use "sass:math";
@use "assets/scss/vars" as *;
.hidden-block {
  display: grid;
  grid-template-columns: 100%;
  justify-items: start;
  gap: 36px;
  max-width: 680px;
  justify-self: center;
  &__wrap {
    position: relative;
    max-height: 356px;
    overflow: hidden;
    transition: max-height $time * 2 linear;
    @include bp-md {
      max-height: 300px;
    }
  }
  @include bp-xl {
    max-width: 100%;
    gap: 24px;
  }
}
.welcome {
  padding: 165px 0 180px;
  @include bp-xxl {
    padding: 100px 0 180px;
  }
  @include bp-xl {
    padding: 50px 0 140px;
  }
  @include bp-md {
    padding: 20px 0 100px;
  }
  &__body {
    display: grid;
    grid-template-columns: 100%;
    justify-items: center;
    gap: 120px;
    @include bp-xl {
      gap: 60px;
    }
    @include bp-md {
      gap: 28px;
    }
  }
  &__heading {
    justify-self: stretch;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  &__title {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 96px;
    line-height: 124px;
    text-transform: uppercase;
    text-align: center;
    max-width: 1000px;
    margin: 0 auto;
    @include bp-xxl {
      font-size: 72px;
      line-height: 86px;
    }
    @include bp-xl {
      font-size: 44px;
      line-height: 56px;
    }
    @include bp-md {
      font-size: 36px;
      line-height: 48px;
    }
  }
  &__video-wrap {
    max-width: 1520px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    height: 760px;
    position: relative;
    overflow: hidden;
    // padding-top: 120px;
    @include bp-xl {
      clip-path: initial;
      min-height: auto;
      height: auto;
      position: relative;
      overflow: hidden;
      padding-top: 0;
    }
  }
  &__video {
    overflow: hidden;
    padding-bottom: math.div(760, 1520) * 100%;
    min-height: 200px;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    bottom: 0;
    clip-path: polygon(10% 100%, 88% 100%, 88% 100%, 10% 100%);
    &::before {
      content: "";
      position: absolute;
      // top: -50%;
      // left: -50%;
      // right: -50%;
      // bottom: -50%;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: transparent url("/images/noise.gif") repeat 0 0;
      background-repeat: repeat;
      // animation: bg-animation 0.2s infinite;
      z-index: 5;
      opacity: 0.1;
    }
    @include bp-xl {
      position: relative;
      clip-path: initial;
    }
    & video {
    }
  }
  &__video-btn {
    border: 1px solid rgba(248, 245, 241, 0.4);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: block;
    position: absolute;
    z-index: 2;
    margin: auto;
    inset: 0;
    display: grid;
    place-items: center;
    transition: opacity $time ease 0s;
    display: none;
    &::before {
      content: "";
      display: block;
      width: 32px;
      height: 32px;
      mask-image: url("/images/icons/play.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-milk);
      mask-size: 32px 32px;
      position: relative;
      left: 3px;
    }
    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
    @include bp-xl {
      display: grid;
    }
  }
  &__main {
    display: grid;
    grid-template-columns: 362px 1fr 382px;
    align-items: start;
    gap: 78px;
    @include bp-big-xl {
      grid-template-columns: 362px 1fr;
    }
    @include bp-xxl {
      gap: 40px;
    }
    @include bp-xl {
      grid-template-columns: 1fr;
    }
  }
  &__images {
    position: relative;
    height: 100%;
    &--right {
      @include bp-big-xl {
        display: none;
      }
    }
    &--left {
      @include bp-xl {
        order: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-self: center;
        width: 335px;
      }
      @include bp-xs {
        width: 89.333vw;
      }
    }
  }
  &__image {
    position: absolute;
    & img {
      width: 100%;
      height: 100%;
    }
    @include bp-xl {
      position: static;
    }
  }
  &__image-big {
    width: 240px;
    height: 300px;
    bottom: 164px;
    left: 0;
    @include bp-xl {
      align-self: flex-start;
    }
    @include bp-xs {
      width: 64vw;
    }
  }
  &__image-border-small {
    width: 212px;
    height: 280px;
    box-shadow: 0 2px 4px 0 rgba(60, 58, 55, 0.1);
    background: var(--bg-white);
    padding: 16px;
    padding-bottom: 44px;
    bottom: 0;
    right: 0;
    @include bp-xl {
      margin-top: -120px;
    }
    @include bp-xs {
      width: 56.533vw;
    }
  }
  &__image-border-big {
    width: 232px;
    height: 320px;
    left: 0;
    top: 220px;
    box-shadow: 0 2px 4px 0 rgba(60, 58, 55, 0.1);
    background: var(--bg-white);
    padding: 16px;
    padding-bottom: 44px;
  }
  &__description {
    padding-left: 20px;
    display: grid;
    grid-template-columns: 100%;
    gap: 60px;
    padding-bottom: 112px;
    @include bp-xxl {
      padding-left: 0;
    }
    @include bp-xl {
      gap: 20px;
      padding-bottom: 0;
    }
    @include bp-md {
      margin-top: 12px;
    }
  }
  &__title-small {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 44px;
    line-height: 56px;
    text-transform: uppercase;
    @include bp-md {
      font-size: 24px;
      line-height: 28px;
    }
  }
  &__text {
    margin-top: 20px;
  }
}
</style>
