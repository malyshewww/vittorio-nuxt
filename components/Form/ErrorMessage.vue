<template lang="pug">
	span.error-message {{text}}
</template>

<script setup>
defineProps({
   text: {
      type: String,
      required: true,
   },
});
</script>

<style lang="scss">
.form__checkboxes {
   & .error-message {
      margin-left: 28px;
   }
}
.error-message {
   display: block;
   margin-top: 4px;
   font-size: 14px;
   line-height: 18px;
   color: var(--system-error);
}
</style>
