<template lang="pug">
	.form-item(v-if="isPromocode")
		.form-field(:class="{'promocode': isPromocode, 'active-arrow': isActiveArrow}")
			input(:type="type" :name="name" :placeholder="placeholder" :disabled="isDisabled" v-model="text" @focus="focusInput" @blur="blurInput" @input="changeInput")
			span.form-item__arrow(v-if="!isButtonCloseVisible")
			.form-item__actions(v-if="isButtonCloseVisible")
				button(type="button" @click="resetInput").form-item__close
		FormErrorMessage(v-if="!isValid" :text="errorMessage")
	.form-item(v-else)
		.form-field(:class="{promocode: isPromocode}")
			input(:type="type" :name="name" :placeholder="placeholder" :disabled="isDisabled")
		FormErrorMessage(v-if="!isValid" :text="errorMessage")
</template>

<script setup>
defineProps({
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
      default: "Поле обязательно для заполнения",
   },
   isPromocode: {
      type: Boolean,
      required: false,
      default: false,
   },
});
const text = ref("");

const isActiveArrow = ref(false);
const isButtonCloseVisible = ref(false);

const changeInput = (e) => {
   text.value = e.target.value;
   isButtonCloseVisible.value = text.value.length > 0 ? true : false;
};
const focusInput = (e) => {
   isActiveArrow.value = !isActiveArrow.value;
};
const blurInput = (e) => {
   isActiveArrow.value = !isActiveArrow.value;
};
const resetInput = (e) => {
   text.value = "";
   isButtonCloseVisible.value = false;
   // console.log(text.value);
   // e.target.value = "";
};
</script>

<style lang="scss" scoped>
@use "assets/scss/_vars" as *;
.form-field {
   display: flex;
   position: relative;
   &.active-arrow {
      & .form-item__arrow {
         &::after {
            transform: scale(1);
         }
         &::before {
            background-color: var(--bg-milk);
         }
      }
   }
   &.promocode {
      & input {
         padding-right: 40px;
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
