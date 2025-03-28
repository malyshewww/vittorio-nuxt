<template lang="pug">
	nuxt-link.link-line(
    ref="link"
		:class="classNames",
		v-bind="linkAttrs"
    @click="linkAction"
	)
		span(v-if="isAnchor") {{ text }}
		template(v-else) {{ text }}
</template>

<script setup>
const props = defineProps({
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

const emit = defineEmits(["linkAction"]);

// eslint-disable-next-line
const linkAction = (e) => {
  emit("linkAction", e);
};

const linkAttrs = computed(() => {
  return props.isAnchor ? { href: props.path, "data-href": props.path } : { to: props.path };
});
</script>

<style lang="scss" scoped>
.link-line {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bg-smoke);
  font-family: var(--second-family);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 0;
  & span {
    pointer-events: none;
  }
  &.short-link {
    font-family: var(--font-family);
    gap: 12px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 0.02em;
    &::before {
      width: 30px;
    }
    @include hover {
      &:hover {
        &::before {
          width: 50px;
        }
      }
    }
    @include bp-md {
      font-size: 10px;
      line-height: 12px;
    }
  }
  @include bp-md {
    font-size: 16px;
    line-height: 20px;
    padding: 6px 0;
  }
  &::before {
    content: "";
    display: block;
    width: 50px;
    height: 1px;
    background-color: currentColor;
    transition: width calc(var(--time) * 2) var(--ttm);
    position: relative;
    top: -2px;
    @include bp-md {
      top: -1px;
    }
  }
  @include hover {
    &:hover {
      &::before {
        width: 70px;
      }
    }
  }
  &:disabled {
    color: var(--system-disabled);
    pointer-events: none;
  }
}
</style>
