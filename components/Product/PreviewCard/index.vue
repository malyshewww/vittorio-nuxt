<template lang="pug">
	article.preview-card
		.preview-card__body
			ProductPreviewCardSlider(:images="card.images")
			.preview-card__main
				nuxt-link(to="/catalog/1").preview-card__title {{card.title}}
				ul.preview-card__list
					li.preview-card__list-item
						span.preview-card__label группа аромата
						span.preview-card__value {{card.group}}
				.preview-card__capacity {{card.capacity}}
				.preview-card__prices
					.preview-card__price-old {{formatNumber(card.oldPrice)}}
					.preview-card__price {{formatNumber(card.price)}}
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
      @include reset-list;
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
}
</style>
