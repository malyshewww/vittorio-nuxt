<template lang="pug">
	.fragrances__header.header-fragrances
		h2.header-fragrances__title 
			span.header-fragrances__label
			span.header-fragrances__text Мир ароматов #[br] Vittorio
		.header-fragrances__content-inner
			.header-fragrances__content
				p Витторио — парфюмер-путешественник, чьи шаги прочерчивают карту мира в поисках самых неповторимых ароматов. Из далёких уголков планеты он приносит с собой не только запахи, но и истории, культуры, и вдохновение. Парфюмерный бренд Vittorio — мост между мирами, соединяющий экзотику и роскошь, ставящий в центр внимания уникальность и качество. Для тех, кто ищет нечто большее, чем просто аромат — для тех, кто жаждет погружения в мир чувств и приключений. Добро пожаловать в мир ароматов, добро пожаловать в мир Vittorio.
				UiLinkLine(text="Узнать больше" :isAnchor="true" path="#welcome")
</template>
<style lang="scss">
.header-fragrances {
   display: flex;
   flex-direction: column;
   padding: 0 150px;
   &__content-inner {
      max-width: 62.96%;
      margin-top: -72px;
      margin-left: auto;
   }
   &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 36px;
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
      color: var(--bg-smoke);
   }
   &__title {
      font-weight: 500;
      font-size: 5vw;
      line-height: 6.458vw;
      text-transform: uppercase;
      color: var(--bg-smoke);
      position: relative;
      font-family: var(--second-family);
      max-width: 764px;
   }
   &__label {
      display: block;
      width: 200px;
      height: 100px;
      background-image: url("/images/sections/fragrances/signature.svg");
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: -77px;
      transform: translateX(-50%);
   }
}
</style>
