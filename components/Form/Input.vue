<template lang="pug">
	.form-item(v-if="isPromocode")
		.form-field(:class="{'promocode': isPromocode, 'active-arrow': isActiveArrow || promocodeValue, 'error': cartStore.isPromocodeChecked && !isPromocodeValid}")
			input(:type="type" :name="name" :placeholder="placeholder" :disabled="isDisabled" v-on:keyup.enter="checkPromocode" v-model.trim="promocodeInput" @focus="focusInput" @blur="blurInput" @input="changeInput")
			span.form-item__arrow(v-if="!isButtonCloseVisible" @click="checkPromocode")
			.form-item__actions(v-if="isButtonCloseVisible")
				button(type="button" @click="deletePromocode").form-item__close
		FormPromocodeMessage(v-if="cartStore.isPromocodeChecked" :is-valid="cartStore.isPromocodeValid" :text="cartStore.promocodeMessage")
	.form-item(v-if="isSubscribe")
		.form-field(:class="{error: !isValid}").subscribe
			input(:type="type" :name="name" :placeholder="placeholder" :disabled="isDisabled" v-model="modelVal" @input="emit('update:modelValue', $event.target.value)")
			span(@click="subscribe" :class="{'active-arrow': isActiveArrow}").form-item__arrow
			//- .form-item__actions(v-if="!isValid")
			//- 	button(type="button" @click="clearInput").form-item__close
		FormErrorMessage(v-if="!isValid" :text="errorMessage")
	.form-item(v-else)
		.form-field(:class="{error: !isValid, 'subscribe': isSubscribe}")
			input(v-if="name === 'phone'" :type="type" :name="name" v-maska="'+7 (###) ### ## ##'" :placeholder="placeholder" :disabled="isDisabled" @input="emit('update:modelValue', $event.target.value)")
			input(v-else :type="type" :name="name" :placeholder="placeholder" :disabled="isDisabled" @input="emit('update:modelValue', $event.target.value)")
		span(v-if="isExampleText").form-item__example
			slot(name="example")
		FormErrorMessage(v-if="!isValid" :text="errorMessage")
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
// eslint-disable-next-line
import { vMaska } from "maska/vue";

const cartStore = useCartStore();

defineOptions({ inheritAttrs: false });

const emit = defineEmits(["update:modelValue", "subscribe"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: () => "",
  },
  type: {
    type: String,
    required: true,
    default: () => "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: "поле обязательно для заполнения",
  },
  isPromocode: {
    type: Boolean,
    required: false,
    default: false,
  },
  isExampleText: {
    type: Boolean,
    required: false,
    default: false,
  },
  isSubscribe: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  changedInput: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const modelVal = ref(props.modelValue);

const isActiveArrow = ref(false);

const isButtonCloseVisible = ref(false);

const promocodeInput = ref("");

const promocodeValue = ref(cartStore.promocodeValue);

const isPromocodeValid = ref(cartStore.isPromocodeValid);

const promocodeMessage = ref(cartStore.promocodeMessage);

watch(
  () => isPromocodeValid.value,
  (val) => {
    if (val === false) {
      promocodeMessage.value = "промокод не найден";
      // console.log("not valid");
    }
    if (val === true) {
      promocodeMessage.value = "промокод применён";
      // console.log("valid");
    }
  }
);

watch(
  () => promocodeInput.value,
  (newVal, oldVal) => {
    if (!isPromocodeValid.value && newVal.length > oldVal.length) {
      isButtonCloseVisible.value = false;
    }
    if (!isPromocodeValid.value && oldVal.length > newVal.length) {
      isButtonCloseVisible.value = false;
    }
  }
);

// eslint-disable-next-line
const checkPromocode = () => {
  cartStore.checkPromocode(promocodeInput.value);
  isActiveArrow.value = false;
  isButtonCloseVisible.value = true;
};

// eslint-disable-next-line
const deletePromocode = () => {
  cartStore.deletePromocode();
  isActiveArrow.value = false;
  promocodeInput.value = "";
  isButtonCloseVisible.value = false;
  promocodeValue.value = false;
};

// eslint-disable-next-line
const changeInput = (e) => {
  promocodeInput.value = e.target.value;
  isActiveArrow.value = promocodeInput.value.length > 0 ? true : false;
  promocodeValue.value = promocodeInput.value.length > 0 ? true : false;
};
// eslint-disable-next-line
const focusInput = () => {
  isActiveArrow.value = promocodeInput.value.length > 0 ? true : false;
};
// eslint-disable-next-line
const blurInput = () => {
  isActiveArrow.value = !isActiveArrow.value;
};

watch(
  () => modelVal.value,
  (val) => {
    isActiveArrow.value = val.length > 0 ? true : false;
  }
);

watch(
  () => modelVal.value,
  (newVal, oldVal) => {
    console.log("new", newVal, oldVal);
    if (newVal > oldVal) {
      isActiveArrow.value = true;
    }
    // else {
    //   isActiveArrow.value = false;
    // }
    // isActiveArrow.value = val.length > 0 ? true : false;
  }
);

watch(
  () => props.isValid,
  (val) => {
    if (val === true) {
      modelVal.value = "";
      isActiveArrow.value = false;
    }
  }
);

const subscribe = () => {
  emit("subscribe");
};

const clearInput = () => {
  modelVal.value = "";
  isActiveArrow.value = false;
};

if (promocodeValue.value) {
  promocodeInput.value = promocodeValue.value;
  promocodeMessage.value = "промокод применён";
}
</script>

<style lang="scss" scoped>
@use "assets/scss/vars" as *;
.form-field {
  position: relative;
  &.active-arrow {
    & .form-item__arrow {
      pointer-events: all;
      &::after {
        transform: scale(1);
      }
      &::before {
        background-color: var(--bg-milk);
      }
    }
  }
  &.promocode,
  &.subscribe {
    & input {
      padding-right: 50px;
    }
  }
  &.subscribe {
    & .form-item__actions {
      background-color: transparent;
    }
    & .form-item__close {
      background-color: transparent;
    }
  }
  &.error {
    & input,
    & textarea {
      border-color: var(--system-error);
    }
  }
}
.form-item {
  &__actions {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    width: 32px;
    height: 32px;
    background-color: white;
    z-index: 20;
    display: grid;
    place-items: center;
    z-index: 5;
    @include hover {
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__close {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: var(--bg-milk);
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      mask-image: url("/images/icons/close.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-smoke);
      mask-size: 16px 16px;
    }
  }
  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    pointer-events: none;
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: var(--bg-smoke);
      transform: scale(0);
      transition: transform $time * 2 $ttm;
      z-index: -1;
    }
    &::before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      mask-image: url("/images/icons/arrow-right-small.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-smoke);
      transition: background-color $time * 2 $ttm;
    }
    &.active-arrow {
      pointer-events: all;
      &::after {
        transform: scale(1);
      }
      &::before {
        background-color: var(--bg-milk);
      }
    }
    @include hover {
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__example {
    margin-top: 4px;
    display: inline-block;
    font-size: 14px;
    line-height: 18px;
    color: var(--text-gray);
  }
  & input {
    width: 100%;
    min-height: 52px;
    padding: 11px 8px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: var(--bg-smoke);
    background-color: transparent;
    border-bottom: 1px solid var(--bg-smoke);
    border-radius: 0;
    transition: border-color $time * 2 $ttm;
    &::placeholder {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
    }
    &:disabled {
      pointer-events: none;
      user-select: none;
      color: var(--system-disabled);
      &::placeholder {
        color: var(--system-disabled);
      }
      border-color: var(--system-disabled);
    }
  }
}
</style>
