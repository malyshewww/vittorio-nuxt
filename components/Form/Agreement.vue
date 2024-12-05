<template lang="pug">
	.form__agreement Отправляя форму, вы подтверждаете, что согласны с #[nuxt-link(to="/page/text") политикой обработки персональных данных]
</template>

<style lang="scss" scoped>
.form {
   &__agreement {
      font-size: 14px;
      line-height: 18px;
      color: var(--text-gray);
      & a {
         color: currentColor;
         border-bottom: 1px solid currentColor;
         transition: color $time * 2 $ttm;
         @media (any-hover: hover) {
            &:hover {
               color: var(--bg-smoke);
            }
         }
      }
   }
}
</style>
