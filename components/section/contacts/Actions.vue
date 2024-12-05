<template lang="pug">
	.contacts__actions.actions-contacts
		.actions-contacts__item
			.actions-contacts__caption Телефон
			a(href="tel:88006009404").actions-contacts__link 8 800 600-94-04
		.actions-contacts__item
			.actions-contacts__caption Электронная почта
			a(href="mailto:info@s-parfum.ru").actions-contacts__link info@s-parfum.ru
		.actions-contacts__item
			.actions-contacts__caption Мы в соцсетях
			UiSocial
		.actions-contacts__item
			.actions-contacts__caption Ароматы Vittorio можно приобрести в магазинах
			UiStores(:isFooterStores="false")
</template>

<style lang="scss" scoped>
.actions-contacts {
   display: grid;
   grid-template-columns: 100%;
   gap: 40px;
   // max-width: 659px;
   max-width: 34.323vw;
   &__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
   }
   &__caption {
      line-height: 22px;
      color: var(--bg-smoke);
   }
   &__link {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 36px;
      line-height: 44px;
      text-transform: uppercase;
      color: var(--bg-smoke);
      transition: color $time * 2 $ttm;
      @media (any-hover: hover) {
         &:hover {
            color: var(--text-gray);
         }
      }
   }
}
</style>
