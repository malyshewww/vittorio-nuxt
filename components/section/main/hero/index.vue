<template lang="pug">
	div.main-hero
		.main-hero__logo
			img(:src="`/images/logo-white-big.svg`")
		.main-hero__body
			.main-hero__content
				.main-hero__contnet-left 
					span(ref="titleLeftOne") Истории,
					span(ref="titleLeftTwo") рассказанные
				.main-hero__arrow
					svg(width='20' height='38' viewbox='0 0 20 38' fill='none' xmlns='http://www.w3.org/2000/svg')
						path(fill-rule='evenodd' clip-rule='evenodd' d='M11 38H8.99999V36.7928C8.99999 32.0532 5.25272 28.1884 0.559873 28L0 28L2.38419e-07 26.0086H0.639294C4.05822 26.1431 7.07539 27.8371 8.99999 30.3991L8.99999 2.38419e-07L11 0L11 30.3991C12.9246 27.8371 15.9418 26.1431 19.3607 26.0086L20 26.0063V28H19.4401C14.7473 28.1884 11 32.0532 11 36.7928V38Z' fill='#3C3A37')
				.main-hero__contnet-right 
					span(ref="titleRight") Ароматами
</template>

<script setup>
const titleLeftOne = ref("");
const titleLeftTwo = ref("");
const titleRight = ref("");

const { $gsap: gsap } = useNuxtApp();

onMounted(() => {
   // Сначала скрываем оба заголовка
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
         });
      },
   });
});
</script>

<style lang="scss" scoped>
.main-hero {
   height: 100dvh;
   padding: 20px 2.604vw 40px;
   font-family: var(--second-family);
   position: relative;
   z-index: 2;
   &__logo {
      width: 240px;
      position: absolute;
      inset: 0;
      top: 20px;
      margin: auto;
   }
   &__body {
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: stretch;
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
      }
   }
   &__contnet-left {
      width: 47.135vw;
      line-height: 7.708vw;
      font-size: 6.25vw;
   }
   &__contnet-right {
      width: 40.26vw;
      line-height: 7.708vw;
      font-size: 6.25vw;
   }
   &__arrow {
      width: 5.208vw;
      height: 5.208vw;
      border-radius: 50%;
      display: grid;
      place-items: center;
      border: 1px solid rgba(248, 245, 241, 0.4);
      margin-bottom: 4.88vh;
      & svg {
         width: 23px;
         height: 40px;
         transform: translateY(10px);
         animation: bounce 1s infinite alternate;
         & path {
            fill: var(--bg-milk);
         }
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
