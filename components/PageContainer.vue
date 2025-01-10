<template lang="pug">
	div(v-if="props.status === 'pending' || props.status === 'fetching'")
		.loader
	div(v-else-if="props.status === 'success'")
		slot
	div(v-else)
		div(v-if="props.error.statusCode == 404") error 404
</template>

<script setup>
const props = defineProps(["status", "error"]);
</script>

<style lang="scss" scoped>
.loader {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: red;
}
</style>
