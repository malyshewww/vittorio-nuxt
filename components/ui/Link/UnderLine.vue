<template lang="pug">
	nuxt-link(:to="path" :target="`${isBlank? '_blank' : ''}`" :class="classNames").link-under {{text}}
</template>

<script setup>
defineProps({
  path: {
    type: String,
    required: true,
    default: "",
  },
  isBlank: {
    type: Boolean,
    required: false,
    default: false,
  },
  text: {
    type: String,
    required: true,
    default: "",
  },
  classNames: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<style lang="scss">
.link-under {
  position: relative;
  transition: color calc(var(--time) * 2) var(--ttm);
  color: var(--text-gray);
  &::before {
    content: "";
    width: 100%;
    height: 1px;
    border-bottom: 1px solid currentColor;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scale(0);
    transition: transform calc(var(--time) * 2) var(--ttm);
    transform-origin: center center;
  }
  &.link-white {
    @include hover {
      &:hover {
        color: var(--bg-white);
      }
    }
  }
  &.link-border {
    &::before {
      content: none;
    }
    border-bottom: 1px solid var(--text-gray);
    @include hover {
      &:hover {
        color: var(--bg-smoke);
        border-bottom: 1px solid var(--bg-smoke);
      }
    }
  }
  @include hover {
    &:hover {
      color: var(--bg-smoke);
      &::before {
        transform: scale(1);
      }
    }
  }
}
</style>
