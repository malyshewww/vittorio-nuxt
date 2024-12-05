<template lang="pug">
	NoteCard(v-for="(item, index) in products" :key="item.uuid" :product="item")
</template>

<script setup>
const props = defineProps({
   products: {
      type: Object,
      required: true,
   },
});
</script>
