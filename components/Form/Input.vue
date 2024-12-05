<template lang="pug">
	.form-item
		.form-field
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
});
</script>

<style lang="scss" scoped>
.form-field {
   display: flex;
}
.form-item {
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
