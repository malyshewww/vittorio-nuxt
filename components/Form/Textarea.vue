<template lang="pug">
	.form-item.hide-scroller
		.form-field(:class="{error: !isValid}")
			textarea(:name="name" :placeholder="placeholder" @input="emit('update:modelValue', $event.target.value)")
		FormErrorMessage(v-if="!isValid" :text="errorMessage")
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    required: false,
    default: () => "",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: "Поле обязательно для заполнения",
  },
});
onMounted(() => {
  const el = document.querySelectorAll(".hide-scroller");
  if (el.length > 0) {
    el.forEach((item) => {
      {
        ["touchmove", "mousewheel", "wheel"].forEach((eventType) => {
          item.addEventListener(eventType, (e) => e.stopPropagation());
        });
      }
    });
  }
});
</script>

<style lang="scss" scoped>
@use "assets/scss/vars" as *;
.form-field {
  display: flex;
  &.error {
    & textarea {
      border-color: var(--system-error);
    }
  }
}
.form-item {
  & textarea {
    width: 100%;
    min-height: 52px;
    padding: 11px 8px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: var(--bg-smoke);
    background-color: transparent;
    border-bottom: 1px solid var(--bg-smoke);
    transition: border-color $time * 2 $ttm;
    min-height: 96px;
    resize: none;
    &::placeholder {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
    }
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-track {
      margin: 4px 0;
      background-color: rgba(#3c3a37, 0.2);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--bg-smoke);
    }
  }
}
</style>
