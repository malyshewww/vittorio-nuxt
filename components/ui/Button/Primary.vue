<template lang="pug">
	nuxt-link(v-if="isLink" :to="path" :class="classNames").btn {{title}}
	button(v-else :type="type" :class="classNames" :disabled="isDisabled" @click="buttonAction").btn {{title}} 
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
  isLink: {
    type: Boolean,
    required: false,
    default: false,
  },
  path: {
    type: String,
    required: false,
    default: "",
  },
  classNames: {
    type: String,
    required: false,
    default: "",
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["buttonAction"]);

// eslint-disable-next-line
const buttonAction = () => {
  emit("buttonAction");
};
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
  transition: background-color calc(var(--time) * 2) var(--ttm), opacity calc(var(--time) * 2) var(--ttm), color calc(var(--time) * 2) var(--ttm);
  &.btn-small {
    min-height: 40px;
    padding: 10px 20px;
  }
  @include hover {
    &:hover {
      background-color: var(--bg-dark);
    }
    &:active {
      color: rgba(#ffffff, 0.6);
    }
  }
  &:active {
    color: rgba(#ffffff, 0.6);
  }
  &.disabled,
  &:disabled {
    background-color: var(--system-disabled);
    pointer-events: none;
  }
  @include bp-md {
    width: 100%;
    padding: 10px 14px;
    min-height: 40px;
  }
}
</style>
