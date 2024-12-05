<template lang="pug">
	.page__top.top-page
		h1.top-page__title {{title}}
</template>

<script setup>
defineProps({
   title: {
      type: String,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
.top-page {
   margin-bottom: 80px;
   padding-bottom: 40px;
   position: relative;
   &::before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: var(--bg-smoke);
      height: 1px;
   }
   &__title {
      font-weight: 500;
      font-size: 72px;
      line-height: 86px;
      text-transform: uppercase;
      color: var(--bg-smoke);
      font-family: var(--second-family);
   }
}
</style>
