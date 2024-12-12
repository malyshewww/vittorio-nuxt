<template lang="pug">
	.header__menu.menu-header(:class="{active: isOpenMenu}")
		.container
			.menu-header__body
				.menu-header__top
					nav.menu.menu-main
						ul.menu-main__list
							li.menu-main__item(v-for="(item, index) in newMenu" :key="index")
								nuxt-link(:to="{ path: item.url.href}").menu-main__link
									span(v-html="item.title")
					nav.menu.menu-notes
						ul.menu-notes__list
							li.menu-notes__item(v-for="(item, index) in menuProduct" :key="index")
								.menu-notes__num {{setNumber(index+1)}}
								nuxt-link(:to="item.url").menu-notes__link
									span(v-html="item.title")
				.menu-header__bottom
					.menu-header__actions
						.menu-header__logo
							img(:src="`/images/logo-menu.svg`" alt="logo")
						.menu-header__stores.stores-header(v-if="links.field_goldapple || links.field_leturu")
							.stores-header__caption Ароматы Vittorio можно приобрести в магазинах:
							UiStores(class-names="header-stores" :isFooterStores="true" :link-apple="links.field_goldapple" :link-letu="links.field_leturu")
					.menu-header__inner
						.menu-header__copy © 2024. Vittorio
						UiLinkUnderLine(text="Политика конфиденциальности" path="/page/politic" :is-blank="true" class-names="link-white")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
import { useMenuStore } from "~/stores/menu";

const mainInfoStore = useMainInfoStore();
const { menuMain, menuProduct, links } = mainInfoStore;

const setNumber = (num) => {
   return num < 10 ? " 0" + num : " " + num;
};

defineProps({
   isOpenMenu: {
      type: Boolean,
      required: true,
      default: false,
   },
});

const newMenu = computed(() => {
   return menuMain.map((item) => {
      return {
         ...item,
         hash: item.url.href == "/about" ? "#about" : false,
      };
   });
});
</script>

<style lang="scss">
@use "assets/scss/_vars" as *;
@use "assets/scss/_mixins" as m;
.menu-header {
   color: var(--bg-white);
   position: fixed;
   z-index: 20;
   background-color: var(--bg-dark);
   height: 100dvh;
   width: 100%;
   opacity: 0;
   pointer-events: none;
   transition: opacity $time * 2 $ttm;
   &.active {
      pointer-events: all;
      opacity: 1;
   }
   &__body {
      max-width: 1520px;
      margin: 0 auto;
      padding: 16.327vh 0 10.204vh;
   }
   &__top {
      display: flex;
      justify-content: space-between;
      gap: 20px;
   }
   &__bottom {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 6.327vh;
   }
   &__actions {
      flex: 0 1 620px;
      display: grid;
      grid-template-columns: 108px 1fr;
      align-items: start;
      gap: 32px;
   }
   &__logo {
      align-self: center;
   }
   &__stores {
   }
   &__inner {
      flex: 0 1 620px;
      display: flex;
      align-items: center;
      gap: 20px;
      color: var(--text-gray);
   }
   &__politic {
   }
}
.menu-main {
   flex: 0 1 600px;
   overflow-y: auto;
   height: 32.653vh;
   &::-webkit-scrollbar {
      background-color: transparent;
      width: 2px;
   }
   &::-webkit-scrollbar-track {
      background: var(--bg-smoke);
      opacity: 0.2;
      width: 2px;
   }
   &::-webkit-scrollbar-thumb {
      background: var(--text-gray);
      width: 2px;
   }
   &__list {
      @include m.reset-list;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 32px;
   }
   &__link {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 44px;
      line-height: 56px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 32px;
      &::after {
         content: "";
         display: block;
         width: 40px;
         height: 40px;
         mask-image: url("/images/icons/arrow-right-white.svg");
         mask-repeat: no-repeat;
         mask-position: center;
         mask-size: 38px 20px;
         background-color: var(--bg-white);
         transform: translateX(-50%);
         opacity: 0;
         z-index: -1;
         transition: transform $time * 2 $ttm, opacity $time $ttm;
      }
      @media (any-hover: hover) {
         &:hover {
            &::after {
               transform: translateX(0);
               opacity: 1;
            }
         }
      }
   }
}
.menu-notes {
   flex: 0 1 620px;
   padding-right: 78px;
   height: 60.816vh;
   overflow-y: auto;
   &::-webkit-scrollbar {
      background-color: transparent;
      width: 2px;
   }
   &::-webkit-scrollbar-track {
      background: var(--bg-smoke);
      opacity: 0.2;
      width: 2px;
   }
   &::-webkit-scrollbar-thumb {
      background: var(--text-gray);
      width: 2px;
   }
   &__list {
      @include m.reset-list;
      display: flex;
      flex-direction: column;
      gap: 12px;
   }
   &__item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding-bottom: 12px;
      position: relative;
      color: var(--bg-white);
      &::before {
         content: "";
         position: absolute;
         bottom: 0;
         left: 0;
         width: 100%;
         height: 1px;
         background-color: currentColor;
      }
   }
   &__num {
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      width: 10px;
      flex-shrink: 0;
      color: var(--text-gray);
   }
   &__link {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 36px;
      line-height: 44px;
      text-transform: uppercase;
   }
}
.stores-header {
   display: flex;
   flex-direction: column;
   gap: 12px;
   padding-left: 32px;
   border-left: 1px solid var(--text-gray);
   &__caption {
      font-size: 14px;
      line-height: 18px;
   }
}
</style>
