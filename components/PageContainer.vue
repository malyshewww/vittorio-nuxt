<template lang="pug">
	div(v-if="props.status === 'pending' || props.status === 'fetching'")
		.loader loading...
	div(v-else-if="props.status === 'success'")
		slot
	div(v-else)
		div(v-if="props.error.statusCode == 404") error 404
</template>

<script setup>
const props = defineProps(["status", "error"]);
</script>

<style lang="scss">
.loader {
}
</style>
