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
