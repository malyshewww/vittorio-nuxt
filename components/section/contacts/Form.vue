<template lang="pug">
	.contacts__form
		form(ref="form" @submit.prevent="submitForm($event)").form
			h2.form__title Задать вопрос автору
			.form__body
				.form__items
					input(type="hidden" name="webform_id")
					FormInput(type="text" name="name" placeholder="Имя" :modelValue="model.name.val" @update:modelValue="$event => (model.name.val = $event)" :is-valid.sync="formStatus.name.isValid" :error-message.sync="formStatus.name.message")
					FormInput(type="tel" name="phone" placeholder="Телефон" :modelValue="model.phone.val" @update:modelValue="$event => (model.phone.val = $event)" :is-valid="formStatus.phone.isValid" :error-message="formStatus.phone.message")
					FormInput(type="email" name="mail" placeholder="E-mail" :modelValue="model.email.val" @update:modelValue="$event => (model.email.val = $event)" :is-valid="formStatus.email.isValid" :error-message="formStatus.email.message")
					FormTextarea(name="question" placeholder="Ваш вопрос" :modelValue="model.question.val" @update:modelValue="$event => (model.question.val = $event)" :is-valid="formStatus.question.isValid" :error-message="formStatus.question.message")
				.form__bottom
					FormAgreement
					UiButtonPrimary(type="submit" :title="titleButtonSubmit" :disabled="isDisabledButtonSubmit")
</template>

<script setup>
import { usePopupStore } from "~/stores/popups";

const popupStore = usePopupStore();

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

// Наблюдатели за изменения в полях ввода
watch(
  () => model.name.val,
  (val) => {
    formData.name = val;
  }
);
watch(
  () => model.phone.val,
  (val) => {
    formData.phone = val;
  }
);
watch(
  () => model.email.val,
  (val) => {
    formData.mail = val;
  }
);
watch(
  () => model.question.val,
  (val) => {
    formData.question = val;
  }
);

const form = ref("");

const formData = reactive({
  name: model.name.val,
  mail: model.email.val,
  phone: model.phone.val,
  question: model.question.val,
  webform_id: "author_question",
});

const initialStatusForm = () => {
  formStatus.name.isValid = true;
  formStatus.name.message = "";

  formStatus.phone.isValid = true;
  formStatus.phone.message = "";

  formStatus.email.isValid = true;
  formStatus.email.message = "";

  formStatus.question.isValid = true;
  formStatus.question.message = "";
};

const resetValues = () => {
  model.name.val = "";
  model.phone.val = "";
  model.email.val = "";
  model.question.val = "";
};

/* eslint-disable no-useless-escape */
// eslint-disable-next-line
function validatePhone(value) {
  if (value.length < 18 && value.length >= 0) {
    formStatus.phone.isValid = false;
    formStatus.phone.message = "Поле Телефон обязательно для заполнения";
  }
}
// eslint-disable-next-line
function validateName(value) {
  if (value.length === 0) {
    formStatus.name.isValid = false;
    formStatus.name.message = `Поле Имя обязательно для заполнения`;
  }
}
// eslint-disable-next-line
function validateQuestion(value) {
  if (value.length === 0) {
    formStatus.question.isValid = false;
    formStatus.question.message = `Поле Ваш вопрос обязательно для заполнения`;
  }
}
// eslint-disable-next-line
function validateEmail(value) {
  if (
    value.length > 0 &&
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.toLowerCase())
  ) {
    formStatus.email.isValid = false;
    formStatus.email.message = "Некорректный email";
  }
}

const titleButtonSubmit = ref("Отправить");
const isDisabledButtonSubmit = ref(false);

const runtimeConfig = useRuntimeConfig();

// eslint-disable-next-line
const submitForm = async () => {
  try {
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
    if (result.sid) {
      titleButtonSubmit.value = "Отправить";
      isDisabledButtonSubmit.value = false;
      initialStatusForm();
      resetValues();
      form.value.reset();
      popupStore.openPopup(popupStore.popupNotice);
      setTimeout(() => {
        popupStore.closePopup(popupStore.popupNotice);
      }, 3000);
    } else {
      initialStatusForm();
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
      titleButtonSubmit.value = "Отправить";
      isDisabledButtonSubmit.value = false;
    }
  } catch (error) {
    throw new Error(error, "Ошибка при отправке формы");
  } finally {
    titleButtonSubmit.value = "Отправить";
    isDisabledButtonSubmit.value = false;
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
  @include bp-xxxl {
    max-width: 100%;
  }
  @include bp-md {
    gap: 20px;
  }
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
    @include bp-xl {
      font-size: 32px;
      line-height: 36px;
    }
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
    & .btn {
      @include bp-md {
        width: 100%;
      }
    }
  }
}
</style>
