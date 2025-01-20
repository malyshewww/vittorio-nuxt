<template lang="pug">
	.note-sections
		section.note-card.main-note(:class="`main-note--${product.key}`" :id="product.key")
			h2.main-note__title(v-if="product.title")
				span(v-html="product.title")
			.main-note__preview.preview-note
				.preview-note__title-mobile(v-if="product.title")
					span(v-html="product.title")
				.preview-note__image-wrap
					.preview-note__image.ibg(v-if="product.field_image_on_gradient" v-html="product.field_image_on_gradient[0].markup")
						//- img(:src="`/images/main/legend_fragment.jpg`" alt="fragment")
					nuxt-link(:to="product.url").main-note__circle
				.preview-note__description(v-if="product.field_title_on_gradient" v-html="product.field_title_on_gradient")
				UiLinkLine(text="Узнать больше" :path="product.url" class-names="preview-note__link short-link")
			.main-note__image.ibg(v-if="product.field_bg_image" v-html="product.field_bg_image[0].markup")
				//- img(:src="`/images/main/legend_scene.jpg`" alt="product")
		section.note-card.info-note
			.info-note__content
				h2.info-note__title(v-if="product.title" v-html="product.title")
				.info-note__text(v-if="product.field_description_aroma" v-html="product.field_description_aroma")
				.info-note__characteristics.characteristics(v-if="product.field_fragrance_group || product.field_top_notes || product.field_heart_notes || product.field_base_notes")
					ul.characteristics__list
						li.characteristics__item(v-if="product.field_fragrance_group")
							span.characteristics__label группа аромата
							span.characteristics__value {{product.field_fragrance_group}}
						li.characteristics__item(v-if="product.field_top_notes")
							span.characteristics__label верхние ноты
							span.characteristics__value {{product.field_top_notes}}
						li.characteristics__item(v-if="product.field_heart_notes")
							span.characteristics__label ноты сердца
							span.characteristics__value {{product.field_heart_notes}}
						li.characteristics__item(v-if="product.field_base_notes")
							span.characteristics__label базовые ноты
							span.characteristics__value {{product.field_base_notes}}
			.info-note__product
				.product-note
					.product-note__image-wrap
						.product-note__image.ibg(v-html="product.field_image_product_front[0].markup")
							//- img(:src="`/images/main/legend_product.jpg`" alt="product")
						.product-note__decor-title(v-if="product.field_svg_title")
							img(:src="product.field_svg_title[0].markup" :alt="product.field_svg_title[0].alt")
						button(type="button" @click="addToCart" :class="cartStore.isActiveCartPopup ? 'disabled' : ''").product-note__button В корзину
					.product-note__options(v-if="product.price || product.volume")
						.product-note__option(v-if="product.volume") {{product.volume}}
						.product-note__option(v-if="product.price") {{product.price}}
					UiButtonPrimary(title="В корзину" class-names="product-note__button-mobile" :is-disabled="cartStore.isActiveCartPopup" @button-action="addToCart")
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const formData = {
  data: [
    {
      type: "product-variation--default",
      id: props.product.uuid,
      meta: {
        quantity: 1,
        combine: true,
      },
    },
  ],
};

const cartData = {
  image: props.product.field_image_product_front[0].markup,
  volume: props.product.volume,
};

// eslint-disable-next-line
const addToCart = async () => {
  await cartStore.addToCart(formData, cartData);
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "assets/scss/vars" as *;

.note-sections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include bp-xl {
    position: static;
  }
}
.note-card {
  position: relative;
  height: 100dvh;
  @include bp-xl {
    height: auto;
  }
}
.note-cards .note-card {
  @include bp-xl {
    position: relative;
    height: auto;
  }
}
.main-note {
  font-family: var(--second-family);
  color: var(--bg-white);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @include bp-xl {
    grid-template-columns: 1fr;
    align-items: start;
  }
  &__title {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    margin: auto;
    bottom: 9.184vh;
    font-size: 7.917vw;
    line-height: 8.333vw;
    font-weight: 500;
    z-index: 5;
    text-transform: uppercase;
    text-rendering: optimizespeed;
    @include bp-xl {
      display: none;
    }
  }
  &__image {
    width: 50vw;
    //   padding-bottom: math.div(980, 960) * 100%;
    @include bp-xxxl {
      width: 40vw;
    }
    @include bp-xl {
      width: 100%;
      padding-bottom: math.div(300, 375) * 100%;
      & img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__circle {
    position: absolute;
    bottom: -96px;
    right: -96px;
    width: 156px;
    height: 156px;
    display: grid;
    place-items: center;
    &::before {
      content: "";
      background-image: url("/images/icons/circle-button.svg");
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      animation: spin 15s linear infinite;
    }
    &::after {
      content: "";
      background-image: url("/images/icons/star-white.svg");
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      width: 40px;
      height: 40px;
    }
    @include hover {
      &:hover {
        cursor: pointer;
        &::before {
          animation-play-state: paused;
        }
      }
    }
    @media (min-width: 1024px) and (max-height: 650px) {
      display: none;
    }
    @include bp-xl {
      display: none;
    }
  }
}

.preview-note {
  width: 50vw;
  display: grid;
  grid-template-columns: 270px 1fr;
  align-items: start;
  gap: 50px;
  // padding: 120px 50px;
  padding: 12.245vh 2.604vw;
  background: radial-gradient(92.2% 92.2% at 30% 40%, #6a4464 0%, #382d32 100%);
  @media (min-width: 1024px) and (max-height: 800px) {
    padding: 20px 2.604vw;
  }
  @include bp-xxxl {
    width: 60vw;
    gap: 20px;
  }
  @include bp-xl {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 20px;
    align-items: start;
    text-align: center;
    padding: 32px 20px;
  }
  .main-note--legend & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #6a4464 0%,
      #382d32 100%
    );
  }
  .main-note--santal & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #ba6935 0%,
      #7e4725 100%
    );
  }
  .main-note--protagonist & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #ceaf76 0%,
      #877553 100%
    );
  }
  .main-note--musk & {
    background: radial-gradient(
      91.82% 91.82% at 30.5% 40%,
      #a1513a 0%,
      #713b3b 100%
    );
  }
  .main-note--essay & {
    background: radial-gradient(
      91.87% 91.87% at 30% 40.5%,
      #969a62 0%,
      #625e37 100%
    );
  }
  .main-note--ethnos & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #749486 0%,
      #394c4b 100%
    );
  }
  .main-note--erato & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #82a0ac 0%,
      #4b7078 100%
    );
  }
  .main-note--voice & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #1e6e8f 0%,
      #2e4568 100%
    );
  }
  .main-note--velvet & {
    background: radial-gradient(
      92.2% 92.2% at 30% 40%,
      #a63d6f 0%,
      #70445c 100%
    );
  }
  &__title-mobile {
    display: none;
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 44px;
    line-height: 56px;
    text-transform: uppercase;
    text-rendering: optimizespeed;
    @include bp-xl {
      display: block;
    }
    @include bp-md {
      font-size: 11.733vw;
      line-height: 14.933vw;
    }
  }
  &__image-wrap {
    position: relative;
    @include bp-xl {
      width: 100%;
      max-width: 28.36%;
      display: flex;
      justify-content: center;
      align-self: stretch;
      margin: 0 auto;
    }
  }
  &__image {
    height: 100%;
    padding-bottom: math.div(320, 270) * 100%;
    @include bp-xl {
      width: 100%;
      padding-bottom: math.div(112, 95) * 100%;
    }
  }
  &__description {
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    padding: 20px 0;
    max-width: 450px;
    text-wrap: balance;
    @media (min-width: 1024px) and (max-height: 800px) {
      font-size: 22px;
      line-height: 28px;
    }
    @include bp-xl {
      padding: 0;
      max-width: 100%;
    }
    @include bp-md {
      font-size: 20px;
      line-height: 24px;
    }
  }
  &__link {
    display: none;
    &.short-link {
      color: var(--bg-white);
      justify-self: center;
    }
    @include bp-xl {
      display: flex;
    }
  }
}
.info-note {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  // padding: 140px 50px 140px;
  padding: 14.286vh 2.604vw;
  background-color: var(--bg-milk);
  isolation: isolate;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: transparent url("/images/main-noise.png") repeat-y 0 0;
    background-repeat: repeat;
    background-blend-mode: soft-light;
    pointer-events: none;
    z-index: 0;
  }
  @media (min-width: 1024px) and (max-height: 800px) {
    padding: 20px 2.604vw;
  }
  @include bp-xl {
    padding: 40px 20px;
    grid-template-columns: 1fr;
    gap: 60px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 36px;
    height: 100%;
    padding: 0 140px 0 150px;
    @include bp-big-xl {
      padding: 0;
    }
    @include bp-xxxl {
      gap: 16px;
    }
    @include bp-xl {
      gap: 20px;
    }
  }
  &__title {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 72px;
    line-height: 86px;
    text-transform: uppercase;
    color: var(--bg-smoke);
    @include bp-md {
      font-size: 36px;
      line-height: 40px;
    }
  }
  &__text {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    max-width: 610px;
    text-wrap: balance;
    @media (min-width: 1024px) and (max-height: 800px) {
      font-size: 22px;
      line-height: 28px;
    }
    @include bp-md {
      font-size: 20px;
      line-height: 24px;
      text-transform: uppercase;
    }
  }
  &__characteristics {
    margin-top: auto;
    @include bp-xl {
      margin-top: 20px;
    }
  }
  &__product {
    display: flex;
    justify-content: center;
    margin-top: 89px;
    margin-left: 50px;
    @include bp-xxxl {
      margin-top: 50px;
    }
    @include bp-xl {
      margin: 0;
    }
  }
}
.product-note {
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @include bp-xxxl {
    width: 335px;
  }
  @include bp-sm {
    width: 100%;
  }
  &__image-wrap {
    position: relative;
  }
  &__image {
    border-radius: 800px 800px 0 0;
    overflow: hidden;
    padding-bottom: math.div(560, 400) * 100%;
    @media (min-width: 1024px) and (max-height: 850px) {
      padding-bottom: 95%;
    }
    @include bp-xl {
      padding-bottom: math.div(440, 335) * 100%;
    }
  }
  &__decor-title {
    position: absolute;
    width: 506px;
    height: 506px;
    top: -68px;
    left: -40px;
    pointer-events: none;
    z-index: 1;
    @include bp-xxxl {
      width: 400px;
      height: 400px;
      top: -50px;
      left: -9px;
    }
    @include bp-xl {
      display: none;
    }
  }
  &__button {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: var(--bg-smoke);
    display: grid;
    place-items: center;
    position: absolute;
    top: 120px;
    left: -80px;
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: center;
    color: var(--bg-white);
    transition: background-color $time * 2 $ttm;
    &.disabled,
    &:disabled {
      background-color: var(--system-disabled);
      pointer-events: none;
    }
    @include hover {
      &:hover {
        background-color: var(--bg-dark);
      }
    }
    @include bp-xxxl {
      left: -60px;
    }
    @include bp-md {
      display: none;
    }
  }
  &__button-mobile {
    display: none;
    @include bp-md {
      display: flex;
      margin-top: 4px;
    }
  }
  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    border-top: 1px solid var(--bg-smoke);
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      width: 1px;
      background-color: var(--bg-smoke);
      left: calc(50% - 1px);
    }
  }
  &__option {
    font-weight: 700;
    line-height: 22px;
    padding: 5px 0;
    @include bp-md {
      font-size: 14px;
      line-height: 18px;
      padding: 6px 0;
    }
  }
}
.characteristics {
  &__list {
    @include reset-list;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__item {
    border-top: 1px solid var(--bg-smoke);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 16px;
    line-height: 22px;
    padding: 4px 0 5px;
    @include bp-md {
      font-size: 14px;
      line-height: 18px;
    }
  }
  &__label {
    font-weight: 700;
    @include bp-md {
      width: 30%;
    }
  }
  &__value {
    width: 60%;
    text-align: right;
  }
}
</style>
