<template lang="pug">
	button(
		type="button",
		:class="[isAnchor ? 'link-line' : 'btn-line', classNames]",
		:data-scroll-to-href="isAnchor && path",
		@click="buttonAction"
	) {{ text }}
</template>

<script setup>
defineProps({
  path: {
    type: String,
    required: false,
    default: () => "/",
  },
  text: {
    type: String,
    required: true,
  },
  classNames: {
    type: String,
    required: false,
    default: "",
  },
  isAnchor: {
    required: false,
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits(["buttonAction"]);

// eslint-disable-next-line
const buttonAction = () => {
  emit("buttonAction");
};
</script>

<style lang="scss" scoped>
.btn-line {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
  &::before {
    content: "";
    display: block;
    display: block;
    width: 30px;
    height: 1px;
    background-color: currentColor;
    transition: width calc(var(--time) * 2) var(--ttm);
  }
  @include hover {
    &:hover {
      &::before {
        width: 50px;
      }
    }
  }
  &.show-more {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.04em;
    gap: 16px;
    &::before {
      width: 50px;
    }
    @include hover {
      &:hover {
        &::before {
          width: 70px;
        }
      }
    }
  }
  &:disabled {
    color: var(--system-disabled);
    pointer-events: none;
  }
}
</style>
