<template lang="pug">
	section.fragrances
		.container
			.fragrances__body
				.fragrances__header.header-fragrances
					h2.header-fragrances__title 
						span.header-fragrances__label
						span.header-fragrances__text Мир ароматов Vittorio
					.fragrances__content-inner
						.fragrances__content
							p Витторио — парфюмер-путешественник, чьи шаги прочерчивают карту мира в поисках самых неповторимых ароматов. Из далёких уголков планеты он приносит с собой не только запахи, но и истории, культуры, и вдохновение. Парфюмерный бренд Vittorio — мост между мирами, соединяющий экзотику и роскошь, ставящий в центр внимания уникальность и качество. Для тех, кто ищет нечто большее, чем просто аромат — для тех, кто жаждет погружения в мир чувств и приключений. Добро пожаловать в мир ароматов, добро пожаловать в мир Vittorio.
							UiLinkLine(text="Узнать больше" :isAnchor="true" path="#welcome")
				.fragrances__location.location-fragrances
					.location-fragrances__wrapper
						SectionMainFragrancesSlider(:countries="countries" :isEnableAutoplay="state.isEnableAutoplay" :current-slide-index="state.currentSlideIndex" @change-area="changeArea")
						.location-fragrances__map
							img(:src="`/images/sections/fragrances/map.png`" alt="карта")
							SectionMainFragrancesMap(:active-area="activeArea" @stop-autoplay="stopAutoplay" @start-autoplay="startAutoplay")
</template>

<script setup>
const activeArea = ref("legend");

const state = reactive({ isEnableAutoplay: true, currentSlideIndex: 0 });

const props = defineProps({
   countries: {
      type: Object,
      required: true,
   },
});

const changeArea = (idx) => {
   activeArea.value = idx;
};

const stopAutoplay = (newStatus, index) => {
   state.isEnableAutoplay = newStatus;
   state.currentSlideIndex = index;
};

const startAutoplay = (newStatus) => {
   state.isEnableAutoplay = newStatus;
};

// watch(
//    () => state,
//    (newValue, oldValue) => {
//       console.log(newValue, oldValue);
//    },
//    { deep: true }
// );
</script>

<style lang="scss" scoped>
.fragrances {
   padding: 252px 0 140px;
   background-color: var(--bg-white);
   &__body {
      display: flex;
      flex-direction: column;
      gap: 140px;
   }
   &__header {
   }
   &__title {
   }
   &__label {
   }
   &__text {
   }
   &__content-inner {
      max-width: 957px;
      margin-top: -68px;
      margin-left: auto;
   }
   &__content {
      display: flex;
      flex-direction: column;
      gap: 36px;
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
      color: var(--bg-smoke);
   }
}
.header-fragrances {
   display: flex;
   flex-direction: column;
   padding: 0 150px;
   &__title {
      font-weight: 500;
      font-size: 96px;
      line-height: 124px;
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
      top: -72px;
      transform: translateX(-50%);
   }
}

.location-fragrances {
   position: relative;
   &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--bg-smoke);
   }
   &__wrapper {
      display: flex;
      align-items: flex-start;
      gap: 100px;
   }
   &__map {
      position: relative;
      margin-top: 50px;
   }
}
</style>
