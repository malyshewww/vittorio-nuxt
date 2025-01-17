<template lang="pug">
	.header__menu.menu-header(:class="{active: menuStore.isOpen}" @click="closeMenu($event)")
		.container
			.menu-header__body
				.menu-header__top
					nav.menu.menu-main
						ul.menu-main__list
							li.menu-main__item(v-for="(item, index) in menuMain" :key="index")
								nuxt-link(:to="item.url.href").menu-main__link
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
						.menu-header__copy © {{getFullYear}}. Vittorio
						UiLinkUnderLine(text="Политика конфиденциальности" path="/page/policy" :is-blank="true" class-names="link-white")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
import { useMenuStore } from "~/stores/menu";
import { useAppStore } from "~/stores/app";

const menuStore = useMenuStore();
const appStore = useAppStore();

const mainInfoStore = useMainInfoStore();

// eslint-disable-next-line
const { menuMain, menuProduct, links } = mainInfoStore;

// eslint-disable-next-line
const setNumber = (num) => {
  return num < 10 ? " 0" + num : " " + num;
};

const route = useRoute();
const router = useRouter();

watch(
  () => route.fullPath,
  () => {
    menuStore.closeMenu();
    bodyLock(menuStore.isOpen);
  }
);

const goToAnchor = (link) => {
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    const href = link.getAttribute("href");
    if (href.includes("#")) {
      const id = href.replace("/#", "");
      const targetElement = document.getElementById(id);
      router.push({ path: "/", query: { anchor: id } });
      if (targetElement) {
        const targetElementPosition =
          targetElement.getBoundingClientRect().top +
          bodyScrollBar.scrollTop -
          10;
        setTimeout(() => {
          bodyScrollBar.scrollTo(0, targetElementPosition, 500);
        }, 1200);
      }
    }
  }
};

// eslint-disable-next-line
const closeMenu = (e) => {
  const target = e.target;
  if (target.tagName == "A") {
    menuStore.closeMenu();
    bodyLock(menuStore.isOpen);
    goToAnchor(target);
    if (!appStore.isDisabledBurger) {
      appStore.isDisabledBurger = true;
      setTimeout(() => {
        appStore.isDisabledBurger = false;
      }, 1500);
    }
  }
};
</script>

<style lang="scss">
@use "assets/scss/vars" as *;
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
  isolation: isolate;
  &::before {
    content: "";
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: transparent url("/images/menu-noise.png") repeat-y 0 0;
    background-repeat: repeat;
    background-blend-mode: soft-light;
    pointer-events: none;
    z-index: 0;
  }
  @include bp-xl {
    overflow-y: auto;
    overflow-x: hidden;
    & .container {
      // height: 100%;
    }
  }
  &.active {
    pointer-events: all;
    opacity: 1;
  }
  &__body {
    max-width: 1520px;
    margin: 0 auto;
    padding: 16.327vh 0 10.204vh;
    @include bp-xl {
      padding: calc(var(--header-height) + 52px) 0 32px;
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 48px;
    }
  }
  &__top {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @include bp-xl {
      flex-direction: column;
      justify-content: flex-start;
      gap: 48px;
    }
  }
  &__bottom {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 6.327vh;
    @include bp-xl {
      flex-direction: column;
      align-items: center;
      margin-top: auto;
      gap: 32px;
    }
  }
  &__actions {
    flex: 0 1 620px;
    display: grid;
    grid-template-columns: 108px 1fr;
    align-items: start;
    gap: 32px;
    @include bp-xl {
      flex: 0;
      grid-template-columns: 100%;
      gap: 20px;
      justify-items: center;
      width: 100%;
    }
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
    font-size: 14px;
    line-height: 18px;
    @include bp-xl {
      flex: 0;
      gap: 12px;
    }
    @include bp-md {
      font-size: 13px;
      line-height: 17px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  &__politic {
  }
}
.menu-main {
  flex: 0 1 600px;
  overflow-y: auto;
  // height: 32.653vh;
  // height: 35.653vh;
  height: 65.816vh;
  @include bp-xl {
    flex: 0 1 auto;
    height: auto;
  }
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
    @include reset-list;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    @include bp-xl {
      gap: 16px;
    }
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
    & span {
      pointer-events: none;
    }
    &::after {
      content: "";
      display: block;
      position: relative;
      top: -4px;
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
      pointer-events: none;
      transition: transform $time * 2 $ttm, opacity $time $ttm;
      @include bp-xl {
        content: none;
      }
    }
    @include hover {
      &:hover {
        &::after {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
    @include bp-xl {
      display: block;
    }
    @include bp-md {
      font-size: 24px;
      line-height: 28px;
    }
  }
}
.menu-notes {
  flex: 0 1 620px;
  padding-right: 78px;
  // height: 60.816vh;
  height: 65.816vh;
  overflow-y: auto;
  @include bp-xl {
    overflow-y: hidden;
    height: auto;
    flex: 0 1 auto;
    padding: 0;
  }
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
    @include reset-list;
    display: flex;
    flex-direction: column;
    gap: 12px;
    @include bp-xl {
      gap: 8px;
    }
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
    @include bp-md {
      gap: 8px;
      padding-bottom: 8px;
    }
  }
  &__num {
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    width: 15px;
    flex-shrink: 0;
    color: var(--text-gray);
    @include bp-md {
      font-size: 10px;
      line-height: 12px;
      width: 13px;
    }
  }
  &__link {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    text-transform: uppercase;
    & span {
      pointer-events: none;
    }
    @include bp-md {
      font-size: 22px;
      line-height: 28px;
    }
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
  @include bp-xl {
    padding: 0;
    padding-top: 19px;
    border-left: 0;
    border-top: 1px solid var(--text-gray);
    align-items: center;
    width: 100%;
    gap: 16px;
    text-align: center;
  }
}
</style>
