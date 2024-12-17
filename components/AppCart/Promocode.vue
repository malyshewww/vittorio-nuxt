<template lang="pug">
	form.app-cart__promocode
		FormInput(type="text" name="promo" placeholder="Введите промокод"  :is-valid="true" :is-promocode="true")
</template>

<style lang="scss">
.app-cart {
   // .app-cart__promocode
   &__promocode {
      margin-top: 34px;
   }
}
</style>
