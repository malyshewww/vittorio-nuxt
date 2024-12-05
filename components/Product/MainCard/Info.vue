<template lang="pug">
	.product-card__info.product-info
		.product-info__header
			UiButtonLine(text="назад" @button-action="goBack")
			h2.product-info__title {{info.title}}
			.product-info__capacity 
				| Объём
				span.product-info__capacity-value {{info.capacity}} мл
		.product-info__characteristics.product-characteristics
			ul.product-characteristics__list
				li.product-characteristics__item(v-for="(item, idx) in info.characteristics" :key="idx")
					span.product-characteristics__label {{item.label}}
					span.product-characteristics__value {{item.value}}
		.product-info__footer
			.product-info__prices
				.product-info__price {{formatNumber(info.price.new)}}
				.product-info__price-old {{formatNumber(info.price.old)}}
			UiButtonPrimary(title="Купить на сайте")
			UiStores
</template>

<script setup>
defineProps({
   info: {
      type: Object,
      required: true,
   },
});

const goBack = () => {
   const router = useRouter();
   router.go(-1);
};
</script>

<style lang="scss" scoped>
.product-info {
   width: 32.813vw;
}
.product-info {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 60px;
   &__header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
   }
   &__title {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 72px;
      line-height: 86px;
      text-transform: uppercase;
   }
   &__capacity {
      line-height: 22px;
      display: flex;
      align-items: center;
      gap: 4px;
   }
   &__capacity-value {
      font-weight: 700;
   }
   &__characteristics {
   }
   &__footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 32px 20px;
   }
   &__prices {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      line-height: 24px;
      width: 100%;
   }
   &__price {
      font-weight: 700;
   }
   &__price-old {
      text-decoration: line-through;
      color: var(--text-gray);
   }
}
.product-characteristics {
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
      gap: 20px;
      align-items: flex-start;
      font-size: 16px;
      line-height: 22px;
   }
   &__label {
      font-weight: 700;
   }
   &__value {
      text-align: right;
      width: 60%;
   }
}
</style>
