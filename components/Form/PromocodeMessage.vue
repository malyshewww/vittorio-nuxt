<template lang="pug">
	span.form-message(:class="`${!isValid ? 'error' : 'success'}`") {{text}}
</template>

<script setup>
const props = defineProps({
   isValid: {
      required: true,
      type: Boolean,
   },
   text: {
      required: true,
      type: String,
   },
});
</script>

<style lang="scss">
.form-message {
   font-size: 14px;
   line-height: 18px;
   margin-top: 4px;
   display: block;
   &.success {
      color: var(--system-success);
   }
   &.error {
      color: var(--system-error);
   }
}
</style>
