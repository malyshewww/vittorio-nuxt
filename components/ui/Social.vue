<template lang="pug">
	.social(:class="classNames")
		ul.social__list
			li.social__item(v-if="links.field_vk")
				a(:href="links.field_vk" target="_blank").social__link Vk
			li.social__item(v-if="links.field_instagram")
				a(:href="links.field_instagram" target="_blank").social__link Ig
			li.social__item(v-if="links.field_telegram")
				a(:href="links.field_telegram" target="_blank").social__link Tg
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo.js";
const mainInfoStore = useMainInfoStore();

// eslint-disable-next-line
const { links } = mainInfoStore;

defineProps({
  classNames: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.social {
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    gap: 16px;
    .footer-social & {
      gap: 28px;
      justify-content: center;
      @include bp-md {
        gap: 24px;
      }
    }
  }
  &__item {
    flex-shrink: 0;
    & + & {
      display: flex;
      align-items: center;
      gap: 16px;
      &::before {
        content: "";
        flex-shrink: 0;
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: var(--bg-smoke);
      }
    }
    .footer-social & + & {
      &::before {
        content: none;
      }
    }
  }
  &__link {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    transition: color calc(var(--time) * 2) var(--ttm);
    .footer-social & {
      font-family: var(--font-family);
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      @include bp-md {
        font-size: 14px;
        line-height: 18px;
      }
    }
    & svg {
      & path {
        transition: fill calc(var(--time) * 2) var(--ttm);
      }
    }
    @include hover {
      &:hover {
        color: var(--text-gray);
        & svg path {
          fill: var(--text-gray);
        }
      }
    }
    @include bp-xl {
      font-size: 22px;
      line-height: 28px;
    }
  }
}
</style>
