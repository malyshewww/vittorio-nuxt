<template lang="pug">
	.social(:class="classNames")
		ul.social__list
			li.social__item(v-if="links.field_vk")
				a(:href="links.field_vk" target="_blank").social__link Vk
			li.social__item(v-if="links.field_ok")
				a(:href="links.field_ok" target="_blank").social__link Ok
			li.social__item(v-if="links.field_telegram")
				a(:href="links.field_telegram" target="_blank").social__link Tg
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo.js";
const mainInfoStore = useMainInfoStore();

const { links } = mainInfoStore;

const props = defineProps({
   classNames: {
      type: String,
      required: false,
      default: "",
   },
});
</script>

<style lang="scss" scoped>
@use "assets/scss/vars" as *;
@use "assets/scss/mixins" as m;
.social {
   &__list {
      @include m.reset-list;
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
      transition: color $time * 2 $ttm;
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
            transition: fill $time * 2 $ttm;
         }
      }
      @media (any-hover: hover) {
         &:hover {
            color: var(--text-gray);
            & svg path {
               fill: var(--text-gray);
            }
         }
      }
      @include m.bp-xl {
         font-size: 22px;
         line-height: 28px;
      }
   }
}
</style>
