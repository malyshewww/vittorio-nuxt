<template lang="pug">
	.slider-controls
		UiSliderButton(direction="prev")
		UiSliderButton(direction="next")
</template>

<style lang="scss" scoped>
.slider-controls {
   display: flex;
   align-items: center;
   gap: 20px;
}
</style>
