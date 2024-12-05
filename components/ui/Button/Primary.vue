<template lang="pug">
	button(:type="type").btn {{title}}
</template>

<script setup>
defineProps({
   type: {
      type: String,
      required: false,
      default: () => "button",
   },
   title: {
      type: String,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
.btn {
   border-radius: 100px;
   padding: 10px 32px;
   min-height: 44px;
   background: var(--bg-smoke);
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-weight: 700;
   font-size: 12px;
   line-height: 16px;
   letter-spacing: 0.02em;
   text-transform: uppercase;
   color: var(--bg-white);
}
</style>
