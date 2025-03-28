<template lang="pug">
	.slider-controls(ref="controls")
		UiSliderButton(direction="prev")
		UiSliderButton(direction="next")
</template>

<script setup>
const controls = ref("");

defineExpose({
  controls,
});
</script>

<style lang="scss" scoped>
.slider-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
