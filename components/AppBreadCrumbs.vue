<template lang="pug">
	.breadcrumbs
		.container
			nav.breadcrumbs__body
				ul.breadcrumbs__list
					li.breadcrumbs__item(v-for="item, index in list")
						nuxt-link(:to="item.url" :class="{ disabled: index === list.length - 1 }").breadcrumbs__link {{item.text}}
</template>

<script setup>
defineProps({
   list: {
      type: Array,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
@use "assets/scss/_vars" as *;
@use "assets/scss/_mixins" as m;
.breadcrumbs {
   margin-bottom: 20px;
   &__list {
      @include m.reset-list;
      display: flex;
      align-items: center;
      gap: 12px;
   }
   &__item {
      position: relative;
      & + & {
         padding-left: 16px;
         &::before {
            content: "";
            display: block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: currentColor;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            left: 0;
         }
      }
   }
   &__link {
      font-size: 14px;
      line-height: 18px;
      transition: color $time * 2 $ttm;
      @media (any-hover: hover) {
         &:hover {
            color: var(--text-gray);
         }
      }
      &.disabled {
         user-select: none;
         pointer-events: none;
      }
   }
}
</style>
