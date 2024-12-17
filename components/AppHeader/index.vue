<template lang="pug">
	header.header(:class="{ active: menuStore.isOpen, 'hidden': !appStore.isHeaderVisible, 'header-white': isColor === 'white', 'header-dark': isColor === 'dark'}")
		.container
			.header__body
				button(type="button" @click="openMenu").header__burger.burger
					span.burger__lines
				nuxt-link(to="/").header__logo.logo
					picture
						source(:srcset="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`" media="(min-width: 767.98px)")
						source(:srcset="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`" media="(min-width: 300px)")
						img(:src="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`")
				button(type="button" @click="openCart").header__cart.cart-header
					span.cart-header__text Корзина
					span.cart-header__count (0)
	AppHeaderMenu
</template>

<script setup>
import { useMenuStore } from "~/stores/menu";
import { useCartStore } from "~/stores/cart";
import { useAppStore } from "~/stores/app";

defineProps({
   isColor: {
      type: String,
      required: false,
      default: "",
   },
   isVisible: {
      type: Boolean,
      required: false,
      default: false,
   },
});

const menuStore = useMenuStore();
const cartStore = useCartStore();
const appStore = useAppStore();

const headerMenu = ref(null);

const openMenu = () => {
   menuStore.toggleMenu();
   bodyLock(menuStore.isOpen);
};
const openCart = () => {
   cartStore.openCart();
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/_vars" as *;
.header {
   position: fixed;
   left: 0;
   top: 0;
   width: 100%;
   color: var(--bg-white);
   background-color: var(--bg-milk);
   min-height: 80px;
   padding: 20px 0 20px;
   z-index: 21;
   transition: transform $time * 2 ease, background-color $time $ttm;
   .page--home & {
      background-color: transparent;
      padding: 20px 0;
   }
   &.hidden {
      transform: translateY(-120%);
   }
   &.active {
      background-color: var(--bg-dark);
      & .header__logo {
         opacity: 0;
         pointer-events: none;
      }
      & .burger__lines {
         &::before {
            top: calc(50% - 1px);
            transform: rotate(-135deg);
         }
         &::after {
            width: 16px;
            bottom: calc(50% - 1px);
            transform: rotate(-45deg);
         }
      }
   }
   &__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
   }
   &__burger {
   }
   &__logo {
      width: 132px;
      height: 64px;
      display: block;
      transition: opacity $time $ttm;
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      .page--home & {
         display: none;
      }
   }
   &__cart {
      color: currentColor;
   }
}
.burger {
   width: 64px;
   height: 40px;
   flex-shrink: 0;
   display: grid;
   place-items: center;
   border-radius: 1000px;
   padding: 8px 20px;
   background: var(--bg-smoke);
   &__lines {
      width: 24px;
      height: 24px;
      display: grid;
      place-items: center;
      position: relative;
      &::before,
      &::after {
         content: "";
         position: absolute;
         left: 4px;
         display: block;
         background-color: var(--bg-milk);
         width: 16px;
         height: 2px;
         transition: all $time * 2 $ttm;
      }
      &::before {
         top: 7px;
      }
      &::after {
         width: 13px;
         bottom: 7px;
      }
   }
   @media (any-hover: hover) {
      &:hover {
         & .burger__lines {
            &::before,
            &::after {
               background-color: rgba(#f8f5f1, 0.6);
            }
         }
      }
   }
}
.cart-header {
   border-radius: 100px;
   padding: 11px 28px;
   min-height: 40px;
   background-color: var(--bg-smoke);
   display: flex;
   align-items: center;
   gap: 4px;
   font-size: 12px;
   line-height: 16px;
   letter-spacing: 0.02em;
   text-transform: uppercase;
   font-weight: 700;
   transition: background-color $time * 2 $ttm;
   & span {
      pointer-events: none;
   }
   @media (any-hover: hover) {
      &:hover {
         & .cart-header__text {
            color: rgba(#fff, 0.6);
         }
      }
   }
   &__text {
      color: currentColor;
      transition: color $time * 2 $ttm;
   }
   &__count {
      color: var(--text-gray);
   }
}
</style>
