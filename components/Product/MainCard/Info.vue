<template lang="pug">
	.product-card__info.product-info
		.product-info__header
			UiButtonLine(text="назад" @button-action="goBack")
			h2.product-info__title(v-if="info.title" v-html="info.title")
			.product-info__capacity 
				| Объём
				span.product-info__capacity-value {{info.variations[0].field_volume[0]}}
		.product-info__characteristics.product-characteristics(v-if="options.length")
			ul.product-characteristics__list
				li.product-characteristics__item(v-if="info.field_fragrance_group")
					span.product-characteristics__label группа аромата
					span.product-characteristics__value {{info.field_fragrance_group}}
				li.product-characteristics__item(v-if="info.field_top_notes")
					span.product-characteristics__label верхние ноты
					span.product-characteristics__value {{info.field_top_notes}}
				li.product-characteristics__item(v-if="info.field_heart_notes")
					span.product-characteristics__label ноты сердца
					span.product-characteristics__value {{info.field_heart_notes}}
				li.product-characteristics__item(v-if="info.field_base_notes")
					span.product-characteristics__label базовые ноты
					span.product-characteristics__value {{info.field_base_notes}}
		.product-info__footer
			.product-info__prices
				.product-info__price {{(info.variations[0].price[0])}}
				.product-info__price-old {{(info.variations[0].list_price[0])}}
			ProductMainCardForm(:options="formData" :cart-data="smallCartData")
			.product-info__stores(v-if="info.field_goldapple.length || info.field_leturu.length")
				UiStores(:link-apple="info.field_goldapple[0].url || ''" :link-letu="info.field_leturu[0].url || ''")
</template>

<script setup>
const props = defineProps({
   images: {
      type: Array,
      required: true,
   },
   info: {
      type: Object,
      required: true,
      default: {},
   },
   options: {
      type: Array,
      required: true,
      default: [],
   },
});

const smallCartData = {
   image: props.images[0].markup,
   volume: props.info.variations[0].field_volume[0],
};

const formData = {
   data: [
      {
         type: "product-variation--default",
         id: props.info.variations[0].uuid,
         meta: {
            quantity: 1,
            combine: true,
         },
      },
   ],
};

const goBack = () => {
   const router = useRouter();
   router.go(-1);
};
</script>

<style lang="scss" scoped>
@use "assets/scss/_mixins" as m;
.product-info {
   width: 32.813vw;
   @include bp-xxl {
      width: 100%;
   }
}
.product-info {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 60px;
   @include bp-md {
      gap: 40px;
   }
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
      @include bp-md {
         font-size: 36px;
         line-height: 44px;
      }
   }
   &__capacity {
      line-height: 22px;
      display: flex;
      align-items: center;
      gap: 4px;
      @include bp-md {
         font-size: 14px;
         line-height: 18px;
      }
   }
   &__capacity-value {
      font-weight: 700;
   }
   &__characteristics {
      width: 100%;
   }
   &__footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 32px 20px;
      @include bp-xl {
         width: 100%;
         gap: 20px;
      }
   }
   &__prices {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 12px;
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
   &__stores {
      @include bp-md {
         width: 100%;
      }
   }
}
.product-characteristics {
   &__list {
      @include m.reset-list;
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
      padding: 4px 0 5px;
      @include bp-md {
         font-size: 14px;
         line-height: 18px;
      }
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
