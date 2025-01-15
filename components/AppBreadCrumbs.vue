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
@use "assets/scss/vars" as *;
.breadcrumbs {
  margin-bottom: 20px;
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    flex-wrap: nowrap;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }
  &__item {
    position: relative;
    text-transform: lowercase;
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
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__link {
    font-size: 14px;
    line-height: 18px;
    transition: color $time * 2 $ttm;
    @include hover {
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
