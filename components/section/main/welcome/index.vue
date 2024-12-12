<template lang="pug">
	section.welcome#welcome
		.container
			.welcome__body
				.welcome__heading
					h2.welcome__title Добро пожаловать в мир Vittorio
				.welcome__video-wrap(ref="videoWrap")
					.welcome__video.ibg
						video(loop muted playsinline autoplay)
							source(src="/welcome.mp4" type="video/mp4")
							p.
								Ваш браузер не поддерживает встроенные видео. Попробуйте скачать его по
								| #[a(href="/welcome.mp4") этой ссылке]
				.welcome__main
					.welcome__images.welcome__images--left
						.welcome__image.welcome__image-big
							img(:src="`/images/sections/welcome/img-big.jpg`")
						.welcome__image.welcome__image-border-small
							img(:src="`/images/sections/welcome/img-border-small.jpg`")
					.welcome__description
						h3.welcome__title-small(v-if="text.info") {{text.info}}
						.hidden-block
							.hidden-block__wrap(ref="hiddenBlockWrap")
								ContentBlock(ref="hiddenBlockContent" :content="text.body")
							UiButtonLine(v-if="state.isVisible" text="Узнать больше" @button-action="toggleHiddenBlock")
					.welcome__images.welcome__images--right
						.welcome__image.welcome__image-border-big
							img(:src="`/images/sections/welcome/img-border-big.jpg`")
</template>

<script setup>
const { $gsap: gsap } = useNuxtApp();

const props = defineProps({
   text: {
      required: true,
      type: Object,
      default: () => "",
   },
});

const state = reactive({
   isVisible: false,
   textHeight: 0,
   isCollapsed: true,
});

const hiddenBlockContent = ref(null);
const hiddenBlockWrap = ref(null);

const videoWrap = ref(null);
const video = ref(null);

const animation = () => {
   gsap.to(videoWrap.value, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
         trigger: videoWrap.value,
         start: "bottom bottom+=52px",
         end: "+=100%",
         pin: true,
         pinSpacing: true,
         scrub: true,
         pinSpacing: 0,
      },
   });
   const images = gsap.utils.toArray(".welcome__image");
   images.forEach((img, index) => {
      gsap.fromTo(
         img,
         { y: 100, autoAlpha: 1 },
         {
            y: -100,
            autoAlpha: 1,
            scrollTrigger: {
               trigger: img,
               start: "top bottom",
               end: "top top+=100",
               toggleActions: "play none none reverse",
               scrub: index + 1 / 2,
            },
         }
      );
   });
};

onMounted(() => {
   state.textHeight = hiddenBlockContent.value.content.clientHeight;
   if (state.textHeight > hiddenBlockWrap.value.clientHeight) {
      state.isVisible = true;
   }
   animation();
});

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
@use "~/assets/scss/_vars" as *;
.hidden-block {
   display: grid;
   grid-template-columns: 100%;
   gap: 40px;
   &__wrap {
      position: relative;
      max-height: 356px;
      overflow: hidden;
      transition: max-height $time * 2 linear;
   }
}
.welcome {
   padding: 160px 0 180px;
   &__body {
      display: grid;
      grid-template-columns: 100%;
      justify-items: center;
      gap: 100px;
   }
   &__heading {
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
   }
   &__video-wrap {
      max-width: 1520px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      clip-path: polygon(10% 100%, 88% 100%, 88% 100%, 10% 100%);
      min-height: 760px;
   }
   &__video {
      // position: absolute;
      // inset: 0;
      // height: 100%;
      // position: absolute;
      // inset: 0;
      width: 100%;
      overflow: hidden;
      padding-bottom: math.div(760, 1520) * 100%;
   }
   &__main {
      display: grid;
      grid-template-columns: 362px 1fr 382px;
      align-items: start;
      gap: 78px;
   }
   &__images {
      position: relative;
      height: 100%;
   }
   &__image {
      position: absolute;
      & img {
         width: 100%;
         height: 100%;
      }
   }
   &__image-big {
      width: 240px;
      height: 300px;
      background-color: green;
      bottom: 164px;
      left: 0;
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
      padding-bottom: 92px;
   }
   &__title-small {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 44px;
      line-height: 56px;
      text-transform: uppercase;
   }
   &__text {
      margin-top: 20px;
   }
}
</style>
