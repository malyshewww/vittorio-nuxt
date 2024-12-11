<template lang="pug">
	.app-cart__order
		.app-cart__caption.cart-caption Оформление заказа
		form.app-cart__form.form
			.form__items
				FormInput(type="text" name="name" placeholder="ФИО*" :is-valid="true")
				FormInput(type="tel" name="phone" placeholder="Телефон" :is-valid="true")
				FormInput(type="email" name="email" placeholder="E-mail*" :is-valid="true")
				FormInput(type="text" name="address" placeholder="Адрес доставки*" :is-valid="true")
</template>

<style lang="scss">
.form__items {
   display: grid;
   grid-template-columns: 100%;
   gap: 16px;
}
</style>
