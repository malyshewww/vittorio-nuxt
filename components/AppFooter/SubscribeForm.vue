<template lang="pug">
	.main-footer__subscribe
		form(@submit.prevent="submitForm($event)").subscribe-form
			.subscribe-form__heading
				.subscribe-form__title.footer-title Подписаться на новости
				.subscribe-form__sub-title Оформите подписку, чтобы быть в курсе наших новостей
			FormInput(type="email" placeholder="Электронная почта" name="email" :modelValue="model.email.val" :is-valid="formStatus.email.isValid" :error-message="formStatus.email.message" @update:modelValue="$event => (model.email.val = $event)")
			.subscribe-form__text 
				| Оставляя свой электронный адрес, вы подтверждаете, что согласны c 
				UiLinkUnderLine(path="/page/politic" :is-blank="true" text="политикой обработки персональных данных" class-names="link-border")
</template>

<script setup>
const model = reactive({
   email: {
      val: "",
   },
});
const formStatus = reactive({
   email: {
      isValid: true,
      message: "",
   },
});
const formData = reactive({
   mail: model.email.val,
   webform_id: "news",
});

// Наблюдатели за изменения в полях ввода
watch(
   () => model.email.val,
   (val) => {
      formData.mail = val;
   }
);

const runtimeConfig = useRuntimeConfig();

const submitForm = async (e) => {
   console.log(e);
   try {
      const tokenResponse = await fetch(
         `${runtimeConfig.public.apiBase}/session/token`,
         {
            method: "POST",
         }
      );
      if (!tokenResponse.ok) {
         throw new Error("Ошибка при получении токена");
      }
      const token = await tokenResponse.text();
      const formResponse = await fetch(
         `${runtimeConfig.public.apiBase}/webform_rest/submit?_format_json`,
         {
            method: "POST",
            headers: {
               Accept: "application/json, text/plain, */*",
               "Content-Type": "application/json",
               "X-CSRF-Token": token,
            },
            body: JSON.stringify(formData),
         }
      );
      // if (!formResponse.ok) {
      //    throw new Error("Ошибка при отправке формы");
      // }
      const result = await formResponse.json();
      console.log(result);
      if (result.sid) {
         formStatus.email.isValid = true;
         model.email.val = "";
      } else {
         if (result.error.email) {
            formStatus.email.message = result.error.phone;
            formStatus.email.isValid = false;
         }
      }
   } catch (error) {
      console.log(error);
   }
};
</script>

<style lang="scss">
.main-footer {
   &__subscribe {
      width: 480px;
      @include bp-xxxl {
         width: 350px;
      }
      @include bp-xl {
         width: 100%;
      }
   }
}
.subscribe-form {
   display: flex;
   flex-direction: column;
   align-items: stretch;
   gap: 12px;
   @include bp-md {
      text-align: center;
   }
   &__heading {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 27px;
      @include bp-md {
         gap: 12px;
         margin-bottom: 12px;
      }
   }
   &__sub-title {
      line-height: 22px;
   }
   &__text {
      font-size: 14px;
      line-height: 18px;
      color: var(--text-gray);
   }
}
</style>
