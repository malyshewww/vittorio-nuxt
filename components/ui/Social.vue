<template lang="pug">
	.social(:class="props.classNames")
		ul.social__list
			li.social__item
				a(href="vk").social__link
					| Vk
			li.social__item
				a(href="ok").social__link
					| Ok
			li.social__item
				a(href="tg").social__link
					| Tg
</template>

<script setup>
const props = defineProps({
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
   }
}
</style>
