<template lang="pug">
	button(type="button" :class="[{'active': appStore.isButtonUpVisible}, {'mode': appStore.isButtonUpMode}]" @click="scrollTop").button-up
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    appStore.isButtonUpVisible = false;
  }
);

const setNewButtonState = (y) => {
  const header = document.querySelector(".header");
  const headerHeight = header.getBoundingClientRect().height;
  if (y > headerHeight && y > 0) {
    appStore.isButtonUpVisible = true;
  } else {
    appStore.isButtonUpVisible = false;
  }
};

// eslint-disable-next-line
const scrollTop = () => {
  const { bodyScrollBar } = useScrollbar();
  if (window.innerWidth > 1024) {
    bodyScrollBar.scrollTo(0, 0, 500);
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
onMounted(() => {
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    bodyScrollBar.addListener(({ offset }) => {
      setNewButtonState(offset.y);
    });
  } else {
    window.addEventListener("scroll", () => {
      setNewButtonState(window.scrollY);
    });
  }
});
</script>

<style lang="scss" scoped>
.button-up {
  border-radius: 100px;
  width: 36px;
  height: 52px;
  display: grid;
  place-items: center;
  backdrop-filter: blur(4px);
  background-color: rgba(60, 58, 55, 0.6);
  position: fixed;
  bottom: 16px;
  left: 8px;
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  transition: transform calc(var(--time) * 2) var(--ttm), opacity calc(var(--time) * 2) var(--ttm), bottom calc(var(--time) * 2) var(--ttm);
  &.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  &.mode {
    bottom: calc(var(--navigation-height) + 16px);
  }
  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 19px;
    mask-image: url("/images/icons/arrow-long.svg");
    mask-repeat: no-repeat;
    mask-position: center;
    transform: rotate(180deg);
    background-color: var(--bg-milk);
    mask-size: 10px 19px;
  }
}
</style>
