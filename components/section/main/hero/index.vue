<template lang="pug">
	div.main-hero
		SectionMainHeroVideo
		.main-hero__logo
			img(:src="`/images/logo-white-big.svg`")
		.main-hero__body
			.main-hero__content
				.main-hero__contnet-left 
					span(ref="titleLeftOne") Истории,
					span(ref="titleLeftTwo") рассказанные
				.main-hero__arrow(ref="arrow")
				.main-hero__contnet-right 
					span(ref="titleRight") Ароматами
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const titleLeftOne = ref("");
const titleLeftTwo = ref("");
const titleRight = ref("");
const arrow = ref("");

const { $gsap: gsap } = useNuxtApp();

onMounted(() => {
  function animation() {
    if (!appStore.isMobile) {
      gsap.set(titleLeftOne.value, { opacity: 0, y: 40, x: 50 });
      gsap.set(titleLeftTwo.value, { opacity: 0, y: 40, x: 50 });
      gsap.set(titleRight.value, { opacity: 0, y: 40, x: 50 });
      // Анимируем первый заголовок
      gsap.to(titleLeftOne.value, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        onComplete: () => {
          // После завершения анимации первого заголовка анимируем второй
          gsap.to(titleLeftTwo.value, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
          });
          gsap.to(titleRight.value, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            onComplete: () => {
              gsap.to(arrow.value, {
                opacity: 1,
                duration: 1,
              });
            },
          });
        },
      });
    }
  }
  animation();
});
</script>

<style lang="scss" scoped>
.main-hero {
  height: 100dvh;
  padding: 20px 2.604vw 40px;
  font-family: var(--second-family);
  position: relative;
  z-index: 2;
  overflow: hidden;
  & .page-video {
    display: none;
    @include bp-xl {
      display: block;
    }
  }
  @include bp-md {
    padding: 28px 5.333vw;
  }
  &__logo {
    width: 240px;
    position: absolute;
    inset: 0;
    top: 20px;
    margin: auto;
    @include bp-xl {
      display: none;
    }
  }
  &__body {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: stretch;
    @include bp-xl {
      justify-content: center;
    }
  }
  &__content {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    text-transform: uppercase;
    color: var(--bg-white);
    & span {
      display: inline-block;
      opacity: 0;
      @include bp-xl {
        opacity: 1;
      }
    }
    @include bp-xl {
      flex-direction: column;
      gap: 0;
      align-items: center;
      text-align: center;
    }
  }
  &__contnet-left {
    width: 47.135vw;
    line-height: 7.708vw;
    font-size: 6.25vw;
    @include bp-xl {
      width: 100%;
      font-size: 72px;
      line-height: 86px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    @include bp-md {
      font-size: 11.733vw;
      line-height: 14.933vw;
    }
  }
  &__contnet-right {
    width: 40.26vw;
    line-height: 7.708vw;
    font-size: 6.25vw;
    @include bp-xl {
      width: 100%;
      font-size: 72px;
      line-height: 86px;
    }
    @include bp-md {
      font-size: 11.733vw;
      line-height: 14.933vw;
    }
  }
  &__arrow {
    width: 5.208vw;
    height: 5.208vw;
    border-radius: 50%;
    display: grid;
    place-items: center;
    border: 1px solid rgba(248, 245, 241, 0.4);
    margin-bottom: 4.88vh;
    opacity: 0;
    &::before {
      content: "";
      display: block;
      width: 32px;
      height: 32px;
      mask-image: url("/images/icons/arrow-long.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-milk);
      mask-size: 32px 32px;
      transform: translateY(10px);
      animation: bounce 1s infinite alternate;
      @include bp-xxl {
        width: 25px;
        height: 25px;
        mask-size: 25px 25px;
      }
    }
    @include bp-xl {
      display: none;
    }
  }
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  & .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
