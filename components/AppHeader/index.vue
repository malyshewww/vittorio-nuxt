<template lang="pug">
	header.header(:class="isColor === 'white' ? 'header-white' : 'header-dark'")
		.container
			.header__body
				button(type="button").header__burger.burger
					span.burger__lines
				nuxt-link(to="/").header__logo.logo
					picture
						source(:srcset="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`" media="(min-width: 767.98px)")
						source(:srcset="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`" media="(min-width: 300px)")
						img(:src="`/images/${isColor === 'white' ? 'logo-white' : 'logo-dark'}.svg`")
				button(type="button").header__cart.cart-header
					span.cart-header__text Корзина
					span.cart-header__count (0)
	//- AppHeaderMenu
</template>

<script setup>
defineProps({
   isColor: {
      type: String,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
.header {
   position: fixed;
   left: 0;
   top: 0;
   width: 100%;
   color: var(--bg-white);
   background-color: var(--bg-milk);
   min-height: 80px;
   padding: 8px 0 8px;
   z-index: 10;
   transition: transform $time * 2 ease;
   &.hidden {
      transform: translateY(-120%);
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
   }
   &__cart {
      color: currentColor;
   }
}
.container {
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
