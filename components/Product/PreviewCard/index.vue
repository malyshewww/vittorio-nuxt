<template lang="pug">
	article.preview-card
		.preview-card__body
			ProductPreviewCardSlider(:images="card.field_images" :url="card.url")
			.preview-card__main
				nuxt-link(:to="card.url" v-if="card.title").preview-card__title 
					span(v-html="card.title")
				ul.preview-card__list(v-if="card.field_fragrance_group")
					li.preview-card__list-item
						span.preview-card__label группа аромата
						span.preview-card__value {{card.field_fragrance_group}}
				.preview-card__bottom
					.preview-card__capacity(v-if="card.field_volume") {{card.field_volume}}
					.preview-card__prices
						.preview-card__price-old(v-if="card.list_price") {{card.list_price}}
						.preview-card__price {{card.price}}
</template>

<script setup>
const props = defineProps({
   card: {
      type: Object,
      required: true,
   },
});
</script>

<style lang="scss">
@use "assets/scss/_vars" as *;
@use "assets/scss/_mixins" as m;
.preview-card {
   @media (any-hover: hover) {
      &:hover {
         & .preview-card__main {
            &::before {
               transform: scale(1);
            }
         }
      }
   }
   &__body {
      display: flex;
      flex-direction: column;
      height: 100%;
   }
   &__main {
      padding: 24px 0;
      position: relative;
      font-size: 16px;
      line-height: 22px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      flex: 1 1 auto;
      &::before {
         content: "";
         position: absolute;
         display: block;
         width: 100%;
         border-bottom: 1px solid var(--bg-smoke);
         bottom: 0;
         transform-origin: center;
         transform: scale(0);
         transition: transform $time * 3 $ttm;
      }
   }
   &__title {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 36px;
      line-height: 44px;
      text-transform: uppercase;
      margin-bottom: 8px;
      width: 100%;
   }
   &__list {
      @include m.reset-list;
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
   }
   &__list-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 10px;
   }
   &__label {
      font-weight: 700;
   }
   &__value {
      text-align: right;
   }
   &__capacity {
      font-weight: 700;
   }
   &__prices {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
   }
   &__price-old {
      text-decoration: line-through;
      color: var(--text-gray);
   }
   &__price {
      font-weight: 700;
   }
   &__bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-top: auto;
   }
}
</style>
