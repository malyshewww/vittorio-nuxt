<template lang="pug">
	.contacts__form
		form.form
			h2.form__title Задать вопрос автору
			.form__body
				.form__items
					input(type="hidden" name="webform_id")
					FormInput(type="text" name="name" placeholder="Имя" :is-valid="true" :is-disabled="false" error-message="Заполни имя")
					FormInput(type="tel" name="phone" placeholder="Телефон" :is-valid="true" error-message="Заполни телефон")
					FormInput(type="email" name="email" placeholder="E-mail" :is-valid="true" error-message="Заполни email")
					FormTextarea(name="message" placeholder="Ваш вопрос" :is-valid="true" error-message="Заполни Текстовое поле")
				.form__bottom
					FormAgreement
					UiButtonPrimary(type="submit" title="Отправить")
</template>

<style lang="scss" scoped>
.contacts__form {
   display: flex;
   justify-content: flex-end;
}
.form {
   flex: 1 1 auto;
   display: grid;
   gap: 40px;
   // max-width: 610px;
   max-width: 31.771vw;
   &__body {
      display: grid;
      gap: 12px;
   }
   &__title {
      font-weight: 500;
      font-size: 44px;
      line-height: 56px;
      text-transform: uppercase;
      color: var(--bg-smoke);
      font-family: var(--second-family);
   }
   &__items {
      display: grid;
      gap: 16px;
      margin-top: 8px;
   }
   &__bottom {
      display: grid;
      gap: 32px;
      justify-items: start;
   }
}
</style>
