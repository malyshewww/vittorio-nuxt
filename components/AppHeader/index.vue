<template lang="pug">
	header.header(:class="{ active: menuStore.isOpen, 'hidden': !appStore.isHeaderVisible, 'header-white': isColor === 'white', 'header-dark': isColor === 'dark'}")
		.container
			.header__body
				button(type="button" @click="openMenu" :class="{disabled: appStore.isDisabledBurger}").header__burger.burger
					span.burger__lines
				nuxt-link(to="/" v-if="$route.name === 'index'").header__logo.logo
					picture
						source(:srcset="`/images/${isColor == 'white' ? 'logo-white' : 'logo-dark'}.svg`" media="(min-width: 767.98px)")
						source(:srcset="`/images/${isColor == 'white' ? 'logo-white' : 'logo-dark'}.svg`" media="(min-width: 300px)")
						img(:src="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`")
				nuxt-link(to="/" v-else).header__logo.logo
					picture
						source(:srcset="`/images/logo-dark.svg`" media="(min-width: 767.98px)")
						source(:srcset="`/images/logo-dark.svg`" media="(min-width: 300px)")
						img(:src="`/images/logo-dark.svg`")
				button(type="button" @click="openCart").header__cart.cart-header
					span.cart-header__text Корзина
					span.cart-header__count ({{cartStore.totalCount > 0 ? cartStore.totalCount : 0}})
					span.cart-header__icon
	AppHeaderMenu
</template>

<script setup>
import { useMenuStore } from "~/stores/menu";
import { useCartStore } from "~/stores/cart";
import { useAppStore } from "~/stores/app";

defineProps({
  isVisible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isColor = ref("white");

const menuStore = useMenuStore();
const cartStore = useCartStore();
const appStore = useAppStore();

// eslint-disable-next-line
const openMenu = () => {
  appStore.isDisabledBurger = !appStore.isDisabledBurger;
  setTimeout(() => {
    appStore.isDisabledBurger = !appStore.isDisabledBurger;
  }, 1500);
  menuStore.toggleMenu();
  bodyLock(menuStore.isOpen);
};
// eslint-disable-next-line
const openCart = () => {
  cartStore.openCart();
  if (menuStore.isOpen == false) {
    bodyLockAdd(cartStore.isOpenCart);
  } else {
    return;
  }
};

const route = useRoute();

watch(
  () => route.path,
  () => {
    observeHeader();
    appStore.isHeaderVisible = true;
  }
);

// const device = useDevice();

const observeHeader = () => {
  if (window.innerWidth <= 1024) {
    const mainHero = document.querySelector(".main-hero");
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          isColor.value = "dark";
        } else {
          isColor.value = "white";
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
    });
    if (mainHero) {
      observer.observe(mainHero);
    }
  }
};

onMounted(() => {
  observeHeader();
  // cartStore.getTotalCount();
});
</script>

<style lang="scss" scoped>
@use "assets/scss/vars" as *;
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  color: var(--bg-white);
  background-color: var(--bg-milk);
  min-height: var(--header-height);
  padding: 20px 0;
  z-index: 21;
  transition: transform $time * 2 $ttm, background-color $time * 2 $ttm;
  @include bp-md {
    padding: 14px 0;
    & .container {
      padding: 0 16px;
    }
  }
  .page--home & {
    background-color: transparent;
  }
  &.hidden {
    transform: translateY(-120%) rotateX(90deg);
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
        @include bp-md {
          top: calc(50% - 0.7px);
        }
      }
      &::after {
        width: 16px;
        bottom: calc(50% - 1px);
        transform: rotate(-45deg);
        @include bp-md {
          width: 13px;
          bottom: calc(50% - 0.7px);
        }
      }
    }
  }
  &.header-dark {
    background-color: var(--bg-milk);
    &.active {
      background-color: var(--bg-dark);
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
      @include bp-xl {
        display: block;
      }
    }
    @include bp-md {
      width: 82px;
      height: 40px;
      top: 12px;
    }
  }
  &__cart {
    color: currentColor;
  }
}

body:not(.page--home) .header {
  @include bp-xl {
    position: sticky;
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
  &.disabled {
    pointer-events: none;
  }
  @include bp-md {
    padding: 8px;
    width: 44px;
    height: 36px;
  }
  &__lines {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    position: relative;
    @include bp-md {
      width: 20px;
      height: 20px;
    }
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
      @include bp-md {
        height: 1.3px;
        width: 13px;
      }
    }
    &::before {
      top: 7px;
    }
    &::after {
      width: 13px;
      bottom: 7px;
      @include bp-md {
        width: 10px;
      }
    }
  }
  @include hover {
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
  @include hover {
    &:hover {
      & .cart-header__text {
        color: rgba(#fff, 0.6);
      }
    }
  }
  @include bp-md {
    padding: 8px 15px;
    width: auto;
    min-height: 36px;
    gap: 0;
    font-size: 10px;
    line-height: 12px;
    align-items: flex-start;
    flex-direction: row-reverse;
  }
  &__icon {
    display: none;
    @include bp-md {
      display: block;
      width: 20px;
      height: 20px;
      margin: 0 auto;
      &::before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        mask-image: url("/images/icons/cart.svg");
        mask-repeat: no-repeat;
        mask-position: center;
        background-color: var(--bg-milk);
        mask-size: 15px 15px;
      }
    }
  }
  &__text {
    color: currentColor;
    transition: color $time * 2 $ttm;
    @include bp-md {
      display: none;
    }
  }
  &__count {
    color: var(--text-gray);
    @include bp-md {
      // display: none;
    }
  }
}
</style>
