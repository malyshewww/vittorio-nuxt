<template lang="pug">
	.contacts__form
		form(@submit.prevent="submitForm($event)").form
			h2.form__title Задать вопрос автору
			.form__body
				.form__items
					input(type="hidden" name="webform_id")
					FormInput(type="text" name="name" placeholder="Имя" :modelValue="model.name.val" @update:modelValue="$event => (model.name.val = $event)" :is-valid="formStatus.name.isValid" :error-message="formStatus.name.message")
					FormInput(type="tel" name="phone" placeholder="Телефон" :modelValue="model.phone.val" @update:modelValue="$event => (model.phone.val = $event)" :is-valid="formStatus.phone.isValid" :error-message="formStatus.phone.message")
					FormInput(type="email" name="mail" placeholder="E-mail" :modelValue="model.email.val" @update:modelValue="$event => (model.email.val = $event)" :is-valid="formStatus.email.isValid" :error-message="formStatus.email.message")
					FormTextarea(name="question" placeholder="Ваш вопрос" :modelValue="model.question.val" @update:modelValue="$event => (model.question.val = $event)" :is-valid="formStatus.question.isValid" :error-message="formStatus.question.message")
				.form__bottom
					FormAgreement
					UiButtonPrimary(type="submit" :title="titleButtonSubmit" :disabled="isDisabledButtonSubmit")
					| {{model.name.val}}
</template>

<script setup>
const model = reactive({
   name: {
      val: "",
   },
   phone: {
      val: "",
   },
   email: {
      val: "",
   },
   question: {
      val: "",
   },
});
const formStatus = reactive({
   name: {
      isValid: true,
      message: "",
   },
   phone: {
      isValid: true,
      message: "",
   },
   email: {
      isValid: true,
      message: "",
   },
   question: {
      isValid: true,
      message: "",
   },
});

const runtimeConfig = useRuntimeConfig();

const titleButtonSubmit = ref("Отправить");

const isDisabledButtonSubmit = ref(false);

const formData = reactive({
   name: model.name.val,
   mail: model.email.val,
   phone: model.phone.val,
   question: model.question.val,
   webform_id: "author_question",
});

const submitForm = async (e) => {
   // fetch(`${runtimeConfig.public.apiBase}/session/token`)
   //    .then(function (response) {
   //       return response.text();
   //    })
   //    .then(function (token) {
   //       fetch(
   //          `${runtimeConfig.public.apiBase}/webform_rest/submit?_format_json`,
   //          {
   //             method: "POST",
   //             headers: {
   //                Accept: "application/json, text/plain, */*",
   //                "Content-Type": "application/json",
   //                "X-CSRF-Token": token,
   //             },
   //             body: JSON.stringify(formData),
   //          }
   //       )
   //          .then((res) => res.json())
   //          .then(function (res) {
   //             if (res.sid) {
   //                console.log(res, "ok");
   //             } else {
   //                console.log(res, "ne ok");
   //             }
   //          });
   //    });
   try {
      const buttonSubmit = e.target.querySelector('button[type="submit"]');
      titleButtonSubmit.value = "идет отправка...";
      isDisabledButtonSubmit.value = true;
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
         titleButtonSubmit.value = "Отправить";
         isDisabledButtonSubmit.value = false;
         formStatus.name.isValid = true;
         formStatus.phone.isValid = true;
         formStatus.email.isValid = true;
         formStatus.question.isValid = true;
      } else {
         if (result.error.name) {
            formStatus.name.message = result.error.name;
            formStatus.name.isValid = false;
         }
         if (result.error.phone) {
            formStatus.phone.message = result.error.phone;
            formStatus.phone.isValid = false;
         }
         if (result.error.email) {
            formStatus.email.message = result.error.phone;
            formStatus.email.isValid = false;
         }
         if (result.error.question) {
            formStatus.question.message = result.error.question;
            formStatus.question.isValid = false;
         }
         buttonSubmit.removeAttribute("disabled");
         titleButtonSubmit.value = "Отправить";
         isDisabledButtonSubmit.value = false;
      }
   } catch (error) {
      console.log(error);
   }
};
</script>

<style lang="scss" scoped>
.contacts__form {
   display: flex;
   justify-content: flex-end;
   margin-top: 5px;
}
.form {
   flex: 1 1 auto;
   display: grid;
   gap: 28px;
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
