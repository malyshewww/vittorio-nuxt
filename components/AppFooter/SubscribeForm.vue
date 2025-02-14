<template lang="pug">
	.main-footer__subscribe
		form(ref="form" @submit.prevent).subscribe-form
			.subscribe-form__heading
				.subscribe-form__title.footer-title Подписаться на новости
				.subscribe-form__sub-title Оформите подписку, чтобы быть в курсе наших новостей
			FormInput(type="email" placeholder="Электронная почта" name="email" :is-subscribe="true" @subscribe="formSend" :modelValue="model.email.val" :is-valid="formStatus.email.isValid" :error-message="formStatus.email.message" @update:modelValue="$event => (model.email.val = $event)")
			.subscribe-form__text 
				| Оставляя свой электронный адрес, вы подтверждаете, что согласны c 
				UiLinkUnderLine(:path="other[0].url.href" :is-blank="true" text="политикой обработки персональных данных" class-names="link-border")
</template>

<script setup>
import { usePopupStore } from "~/stores/popups";
import { useMainInfoStore } from "~/stores/maininfo";

const mainInfoStore = useMainInfoStore();
const { other } = mainInfoStore;

const popupStore = usePopupStore();

const formStatus = reactive({
  email: {
    isValid: true,
    message: "",
  },
});

const model = reactive({
  email: {
    val: "",
  },
});

const errors = ref(0);

const formData = reactive({
  mail: model.email.val,
  webform_id: "news",
});

const form = ref("");

const initialFormStatus = () => {
  formStatus.email.isValid = true;
  formStatus.email.message = "";
};

const resetValues = () => {
  model.email.val = "";
};

// Наблюдатели за изменения в полях ввода
watch(
  () => model.email.val,
  (val) => {
    formData.mail = val;
  }
);

const runtimeConfig = useRuntimeConfig();

// eslint-disable-next-line
async function formSend() {
  // const { error } = formValidate();
  // console.log("data", formData);
  try {
    const tokenResponse = await fetch(`${runtimeConfig.public.apiBase}/session/token`, {
      method: "POST",
    });
    if (!tokenResponse.ok) {
      throw new Error("Ошибка при получении токена");
    }
    const token = await tokenResponse.text();
    const formResponse = await fetch(`${runtimeConfig.public.apiBase}/webform_rest/submit?_format_json`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      body: JSON.stringify(formData),
    });
    if (formResponse.ok) {
      const result = await formResponse.json();
      if (result.sid) {
        formSuccess();
      } else {
        formError();
      }
    } else {
      formError();
    }
  } catch (err) {
    throw new Error("error Subscribe form", err);
  }
  // if (error === 0) {
  //   const tokenResponse = await fetch(
  //     `${runtimeConfig.public.apiBase}/session/token`,
  //     {
  //       method: "POST",
  //     }
  //   );
  //   if (!tokenResponse.ok) {
  //     throw new Error("Ошибка при получении токена");
  //   }
  //   const token = await tokenResponse.text();
  //   const formResponse = await fetch(
  //     `${runtimeConfig.public.apiBase}/webform_rest/submit?_format_json`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //         "X-CSRF-Token": token,
  //       },
  //       body: JSON.stringify(formData),
  //     }
  //   );
  //   if (formResponse.ok) {
  //     const result = await formResponse.json();
  //     console.log(result);
  //     formSuccess();
  //   } else {
  //     formError();
  //   }
  // } else {
  //   formError();
  // }
}

function formError() {
  popupStore.openPopup(popupStore.popupNoticeError);
  setTimeout(() => {
    popupStore.closePopup(popupStore.popupNoticeError);
  }, 3000);
}

function formSuccess() {
  form.value.reset();
  initialFormStatus();
  resetValues();
  popupStore.openPopup(popupStore.popupSubscribe);
  setTimeout(() => {
    popupStore.closePopup(popupStore.popupSubscribe);
  }, 3000);
}

/* eslint-disable no-useless-escape */
// eslint-disable-next-line
function formValidate() {
  errors.value = 0;
  initialFormStatus();
  if (model.email.val.length === 0 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(model.email.val)) {
    formStatus.email.isValid = false;
    formStatus.email.message = "некорректный email";
    errors.value++;
  }
  return {
    error: errors.value,
  };
}
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
