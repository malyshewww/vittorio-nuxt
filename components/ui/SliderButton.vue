<template lang="pug">
	button.slider-button(
		ref="button"
		type="button"
		:class="`slider-button-${validDirection}`"
	)
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: "next",
    validator: (value) => ["prev", "next"].includes(value),
  },
});

const button = ref("");

const validDirection = computed(() => {
  return props.direction === "prev" ? "prev" : "next";
});

defineExpose({
  button,
});
</script>

<style lang="scss" scoped>
.slider-button {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  &::before {
    content: "";
    display: block;
    width: 40px;
    height: 40px;
    mask-repeat: no-repeat;
    mask-position: center;
    background-color: var(--bg-smoke);
    mask-size: 38px 20px;
    transition: background-color calc(var(--time) * 2) var(--ttm);
  }
  &-prev {
    transform: rotate(180deg);
    &::before {
      mask-image: url("/images/icons/arrow-long-left.svg");
    }
  }
  &-next {
    &::before {
      mask-image: url("/images/icons/arrow-long-left.svg");
    }
  }
  &.swiper-button-lock,
  &.swiper-button-disabled {
    pointer-events: none;
    user-select: none;
    cursor: default;
    &::before {
      background-color: var(--system-disabled);
    }
  }
  &.swiper-button-lock {
    display: none;
  }
  @include hover {
    cursor: pointer;
    &:hover:not(.swiper-button-disabled) {
      &::before {
        background-color: var(--text-gray);
      }
    }
  }
  @include bp-md {
    width: 36px;
    height: 36px;
    &::before {
      width: 30px;
      height: 30px;
      mask-size: 30px 30px;
    }
  }
}
</style>
