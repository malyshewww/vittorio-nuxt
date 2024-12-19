<template lang="pug">
	.checkbox
		input(type="checkbox" :id="id" :name="name" :checked="modelValue" @change="emit('update:modelValue', $event.target.checked)").real-checkbox
		label(:for="id").checkbox__label
			span.custom-checkbox
			span.checkbox__text
				slot(name="text")
		FormErrorMessage(v-if="!isValid" :text="errorMessage")
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
   modelValue: {
      required: false,
   },
   type: {
      type: String,
      required: true,
      default: () => "checkbox",
   },
   name: {
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
   isChecked: {
      type: Boolean,
      required: false,
      default: false,
   },
   id: {
      type: String,
      required: true,
   },
   errorMessage: {
      type: String,
      required: false,
      default: "Поле обязательно для заполнения",
   },
});
</script>

<style lang="scss">
@use "assets/scss/mixins" as m;
@use "assets/scss/vars" as *;
.real-checkbox {
   clip: rect(0 0 0 0);
   clip-path: inset(50%);
   height: 1px;
   overflow: hidden;
   position: absolute;
   white-space: nowrap;
   width: 1px;
   &:checked ~ label {
      & .custom-checkbox {
         background-color: var(--bg-smoke);
         border-color: transparent;
         &::before {
            opacity: 1;
         }
      }
   }
}
.custom-checkbox {
   flex-shrink: 0;
   width: 20px;
   height: 20px;
   border: 1px solid var(--bg-smoke);
   background-color: transparent;
   display: flex;
   justify-content: center;
   align-items: center;
   transition: background-color $time ease-in 0s, border-color $time ease-in 0s;
   &::before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      background-color: var(--bg-milk);
      mask-image: url("/images/icons/check.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      opacity: 0;
      transition: opacity $time ease-in 0s;
   }
}
.checkbox {
   &__label {
      display: inline-flex;
      align-items: flex-start;
      gap: 8px;
      padding: 4px 0;
      font-size: 14px;
      line-height: 18px;
      @include m.hover {
         &:hover {
            cursor: pointer;
         }
      }
   }
}
</style>
