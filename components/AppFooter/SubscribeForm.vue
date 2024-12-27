<template lang="pug">
	.main-footer__subscribe
		form(ref="form" @submit.prevent="submitForm($event)").subscribe-form
			.subscribe-form__heading
				.subscribe-form__title.footer-title Подписаться на новости
				.subscribe-form__sub-title Оформите подписку, чтобы быть в курсе наших новостей
			FormInput(type="email" placeholder="Электронная почта" name="email" :modelValue="formData.mail" :is-valid="formStatus.email.isValid" :error-message="formStatus.email.message" @update:modelValue="$event => (formData.mail = $event)")
			.subscribe-form__text 
				| Оставляя свой электронный адрес, вы подтверждаете, что согласны c 
				UiLinkUnderLine(path="/page/politic" :is-blank="true" text="политикой обработки персональных данных" class-names="link-border")
</template>

<script setup>
import { usePopupStore } from "~/stores/popups";

const popupStore = usePopupStore();

const formStatus = reactive({
   email: {
      isValid: true,
      message: "",
   },
});

const formData = reactive({
   mail: "",
   webform_id: "news",
});

const form = ref("");

// Наблюдатели за изменения в полях ввода
watch(
   () => formData.mail,
   (val) => {
      formData.mail = val;
   }
);

function validateEmail(value) {
   if (
      value.length > 0 &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.toLowerCase())
   ) {
      formStatus.email.isValid = false;
      formStatus.email.message = "Некорректный email";
   }
}

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
      if (result.sid) {
         formStatus.email.isValid = true;
         formStatus.email.message = "";
         formData.mail = "";
         form.value.reset();
         popupStore.openPopup(popupStore.popupSubscribe);
         setTimeout(() => {
            popupStore.closePopup(popupStore.popupSubscribe);
         }, 3000);
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
