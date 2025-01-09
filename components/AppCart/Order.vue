<template lang="pug">
	.app-cart__order#cart-order
		.app-cart__caption.cart-caption Оформление заказа
		form(@submit.prevent).app-cart__form.form#form
			.form__items
				FormInput(type="text" name="name" placeholder="ФИО*" :modelValue="model.name.val" @update:modelValue="$event => (model.name.val = $event)" :is-valid="formStatus.name.isValid" :error-message="formStatus.name.message")
				FormInput(type="tel" name="phone" placeholder="Телефон" :modelValue="model.phone.val" @update:modelValue="$event => (model.phone.val = $event)"  :is-valid="formStatus.phone.isValid" :error-message="formStatus.phone.message")
				FormInput(type="email" name="email" placeholder="E-mail*" :modelValue="model.email.val" @update:modelValue="$event => (model.email.val = $event)" :is-valid="formStatus.email.isValid" :error-message="formStatus.email.message")
				FormInput(type="text" name="address" placeholder="Адрес доставки*" :modelValue="model.address.val" @update:modelValue="$event => (model.address.val = $event)" :is-valid="formStatus.address.isValid" :error-message="formStatus.address.message" :is-example-text="true")
					template(#example)
						| например: г. Нижний Новгород, ул. Маршала Воронова, д. 10
			.form__checkboxes
				FormCheckbox(id="agreement-1" type="checkbox" name="agreement" :modelValue="model.agree.val" @update:modelValue="$event => (model.agree.val = $event)" :error-message="formStatus.agree.message" :is-valid="formStatus.agree.isValid")
					template(#text)
						| я даю согласие на обработку персональных данных в соответствии с
						| #[UiLinkUnderLine(text="политикой обработки персональных данных" path="/page/policy" :is-blank="true" class-names="link-border")]
				FormCheckbox(id="agreement-2" type="checkbox" name="agreement-2" :modelValue="model.mailing.val" @update:modelValue="$event => (model.mailing.val = $event)" :is-valid="formStatus.mailing.isValid" :error-message="formStatus.mailing.message")
					template(#text)
						| я даю согласие на получение рекламных рассылок в виде e-mail, sms, push или в мессенджерах
</template>

<script setup>
import { useOrderStore } from "~/stores/cart-order";

const orderStore = useOrderStore();

const { formData } = orderStore;

const model = orderStore.model;
const formStatus = orderStore.formStatus;
</script>

<style lang="scss">
.form {
   // .form__items
   &__items {
      display: grid;
      grid-template-columns: 100%;
      gap: 16px;
   }
   // .form__checkboxes
   &__checkboxes {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
   }
}
</style>
