<template lang="pug">
  .stores(:class="classNames")
    ul.stores__list
      li.stores__item(v-if="linkApple")
        a.stores__link(:href="linkApple || '/'" target="_blank")
          img(:src="getStoreIcon('apple')")
      li.stores__item(v-if="linkLetu")
        a.stores__link(:href="linkLetu || '/'" target="_blank")
          img(:src="getStoreIcon('letual')")
</template>

<script setup>
const props = defineProps({
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

const getStoreIcon = computed(() => {
  return (store) => {
    const basePath = "/images/icons/stores";
    if (props.isFooterStores) {
      return props.isMenu ? `${basePath}/${store}-white.svg` : `${basePath}/${store}-small.svg`;
    }
    return `${basePath}/${store}.svg`;
  };
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
