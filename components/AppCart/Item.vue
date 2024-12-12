<template lang="pug">
	.app-cart__item.cart-item
		.cart-item__image.ibg
			img(:src="`/images/cart/${item.img}.jpg`")
		.cart-item__body
			.cart-item__info
				.cart-item__title(v-if="item.title") {{item.title}}
				.cart-item__volume(v-if="item.volume") {{item.volume}}
				.cart-item__prices
					.cart-item__price-old(v-if="item.oldPrice") {{item.oldPrice}}
					.cart-item__price(v-if="item.price") {{item.price}}
			.cart-item__counter.quantity-cart
				button(type="button").quantity-cart__button.btn-decrement
				.quantity-cart__count 1
				input(type="hidden" value="1").quantity-cart__input
				button(type="button").quantity-cart__button.btn-increment
</template>

<script setup>
defineProps({
   item: {
      type: Object,
      required: true,
   },
});
</script>

<style lang="scss">
@use "sass:math";
@use "assets/scss/vars" as *;
.app-cart {
   &__item {
   }
}
.cart-item {
   display: grid;
   grid-template-columns: 100px 1fr;
   gap: 28px;
   align-items: start;
   border-bottom: 1px solid var(--bg-smoke);
   padding-bottom: 7px;
   &__image {
      padding-bottom: math.div(120, 100) * 100%;
      overflow: hidden;
   }
   &__body {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: start;
      gap: 20px;
      height: 100%;
   }
   &__info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
   }
   &__title {
      font-weight: 700;
      font-size: 18px;
      line-height: 26px;
   }
   &__volume {
      font-size: 14px;
      line-height: 18px;
   }
   &__prices {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 4px;
   }
   &__price-old {
      line-height: 22px;
      text-decoration: line-through;
      text-align: right;
      color: var(--text-gray);
   }
   &__price {
      font-weight: 700;
      line-height: 22px;
   }
   &__counter {
   }
   &__decrement {
   }
   &__count {
   }
   &__increment {
   }
}

.quantity-cart {
   display: flex;
   align-items: center;
   gap: 4px;
   &__button {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--bg-smoke);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color $time $ttm, border-color $time $ttm;
      &::before {
         content: "";
         display: block;
         width: 16px;
         height: 16px;
         mask-repeat: no-repeat;
         mask-position: center;
         background-color: var(--bg-smoke);
         mask-size: 16px 16px;
         transition: background-color $time $ttm;
      }
      &.btn-decrement {
         &::before {
            mask-image: url("/images/icons/minus.svg");
         }
      }
      &.btn-increment {
         &::before {
            mask-image: url("/images/icons/plus.svg");
         }
      }
      @media (any-hover: hover) {
         &:hover {
            cursor: pointer;
         }
      }
      &:active {
         background-color: var(--bg-smoke);
         &::before {
            background-color: var(--bg-milk);
         }
      }
      &:disabled,
      &.disabled {
         pointer-events: none;
         border-color: var(--system-disabled);
         &::before {
            background-color: var(--system-disabled);
         }
      }
   }
   &__count {
      padding: 3px 8px;
      max-width: min-content;
      background-color: transparent;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
   }
}
</style>
