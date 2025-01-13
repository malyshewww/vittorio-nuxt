<template lang="pug">
	.app-cart__item.cart-item
		nuxt-link(:to="item.url" target="_blank").cart-item__image.ibg
			img(:src="item.image")
		.cart-item__body
			nuxt-link(v-if="item.title" :to="item.url" target="_blank").cart-item__title {{item.title}}
			.cart-item__volume(v-if="item.purchased_entity.field_volume") {{item.purchased_entity.field_volume}} мл
			.cart-item__prices
				.cart-item__price-old(v-if="item.purchased_entity.list_price") {{formatNumber(item.purchased_entity.list_price.number)}}
				.cart-item__price(v-if="item.unit_price") {{formatNumber(item.unit_price.number)}}
				button(@click="cartStore.deleteProduct(item)").cart-item__delete
			.cart-item__counter.quantity-cart
				button(type="button" @click="decreaseCartSum(item, item.quantity, 'minus')" :disabled="item.quantity <= 1").quantity-cart__button.btn-decrement
				.quantity-cart__count {{item.quantity}}
				input(type="hidden" :value="item.quantity").quantity-cart__input
				button(type="button" @click="increaseCartSum(item, item.quantity, 'plus')").quantity-cart__button.btn-increment
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const itemQuantity = ref(props.item.quantity);

watch(
  () => props.item.quantity,
  (value) => {
    itemQuantity.value = value;
    if (value === 1) {
      // console.log('disabled value watch 1')
      // isDisabledMinus.value = true;
    } else {
      // isDisabledMinus.value = false;
    }
  },
  { deep: true }
);

// eslint-disable-next-line
const decreaseCartSum = () => {
  cartStore.decreaseCartSum(props.item, props.item.quantity - 1);
};

// eslint-disable-next-line
const increaseCartSum = () => {
  cartStore.increaseCartSum(props.item, props.item.quantity + 1);
};
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
  @include hover {
    &:hover {
      cursor: pointer;
      & .cart-item__delete {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
    }
  }
  @include bp-md {
    grid-template-columns: 70px 1fr;
    gap: 10px;
  }
  &__image {
    padding-bottom: math.div(120, 100) * 100%;
    overflow: hidden;
  }
  &__body {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
    grid-template-areas:
      "title quantity"
      "volume quantity"
      "prices quantity";
    padding: 12px 0;
    position: relative;
    @include bp-md {
      padding: 0;
      gap: 8px 0;
      grid-template-areas:
        "title title"
        "volume volume"
        "quantity quantity"
        "prices prices";
    }
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
    grid-area: title;
  }
  &__volume {
    font-size: 14px;
    line-height: 18px;
    grid-area: volume;
  }
  &__prices {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    grid-area: prices;
    @include bp-md {
      margin-top: 10px;
    }
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
  &__delete {
    width: 22px;
    height: 22px;
    position: absolute;
    bottom: 12px;
    right: 0;
    display: grid;
    place-items: center;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20%);
    transition: opacity $time $ttm 0s, transform $time $ttm 0s;
    &::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      mask-image: url("/images/icons/delete.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-smoke);
      mask-size: 20px 20px;
    }
    @include hover {
      &:hover {
        opacity: 0.8;
      }
    }
    @include bp-xl {
      opacity: 1;
      transform: none;
      pointer-events: all;
    }
    @include bp-md {
      position: static;
      margin-left: auto;
    }
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
  align-self: start;
  gap: 4px;
  grid-area: quantity;
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
    @include hover {
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
