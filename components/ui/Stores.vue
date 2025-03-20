<template lang="pug">
	.stores(:class="classNames")
		ul.stores__list
			li.stores__item(v-if="linkApple")
				a(:href="`${linkApple ? linkApple : '/'}`" target="_blank").stores__link
					img(v-if="isFooterStores && !isMenu" :src="`/images/icons/stores/apple-small.svg`")
					img(v-else-if="isFooterStores && isMenu" :src="`/images/icons/stores/apple-white.svg`")
					img(v-else :src="`/images/icons/stores/apple.svg`")
			li.stores__item(v-if="linkLetu")
				a(:href="`${linkLetu ? linkLetu : '/'}`" target="_blank").stores__link
					img(v-if="isFooterStores && !isMenu" :src="`/images/icons/stores/letual-small.svg`")
					img(v-else-if="isFooterStores && isMenu" :src="`/images/icons/stores/letual-white.svg`")
					img(v-else :src="`/images/icons/stores/letual.svg`")
</template>

<script setup>
defineProps({
  classNames: {
    type: String,
    required: false,
    default: "",
  },
  isFooterStores: {
    type: Boolean,
    required: false,
    default: false,
  },
  isMenu: {
    type: Boolean,
    required: false,
    default: false,
  },
  linkApple: {
    required: false,
    type: String,
    default: "",
  },
  linkLetu: {
    required: false,
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.stores {
  @include bp-sm {
    width: 100%;
  }
  .menu-header__stores & {
    @include bp-sm {
      width: auto;
    }
  }
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  &__item {
    @include bp-md {
      flex-grow: 1;
      min-width: fit-content;
    }
  }
  &__link {
    min-height: 44px;
    padding: 11px 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--bg-smoke);
    border-radius: 100px;
    transition: filter calc(var(--time) * 3) var(--ttm), border-color calc(var(--time) * 3) var(--ttm);
    & img {
      pointer-events: none;
    }
    .footer-stores & {
      min-height: 32px;
      padding: 7px 15px;
    }
    .header-stores & {
      min-height: 32px;
      padding: 7px 15px;
      border: 1px solid var(--text-gray);
    }
    @include bp-xl {
      min-height: 40px;
      padding: 10px 14px;
    }
  }
}
</style>
