<template lang="pug">
	section.fragrances
		.container
			.fragrances__body
				SectionMainFragrancesHeading
				.fragrances__location.location-fragrances(ref="locationBlock" :class="className")
					.location-fragrances__wrapper
						SectionMainFragrancesSlider(:countries="countries" :isEnableAutoplay="state.isEnableAutoplay" :current-slide-index="state.currentSlideIndex" @change-area="changeArea")
						.location-fragrances__map-wrap
							.location-fragrances__line
							.location-fragrances__map
								img(:src="`/images/sections/fragrances/map.png`" alt="карта")
								SectionMainFragrancesMap(:active-area="activeArea" :countries="countries" @stop-autoplay="stopAutoplay" @start-autoplay="startAutoplay")
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

const locationBlock = ref(null);
const className = ref("");

onMounted(() => {
   const toggleClassname = (isVisible) => {
      if (isVisible) {
         className.value = "active";
      } else {
         className.value = "";
      }
   };
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         toggleClassname(entry.isIntersecting);
      });
   });
   observer.observe(locationBlock.value);
});

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
   padding: 257px 0 140px;
   background-color: var(--bg-milk);
   &__body {
      display: flex;
      flex-direction: column;
      gap: 140px;
   }
}
.location-fragrances {
   position: relative;
   &__wrapper {
      display: flex;
      align-items: flex-start;
   }
   &__map-wrap {
      position: relative;
      padding-top: 50px;
      padding-left: 50px;
      &::before {
         content: "";
         display: block;
         position: absolute;
         top: 0;
         left: 0;
         width: 0%;
         height: 1px;
         background-color: var(--bg-smoke);
         pointer-events: none;
      }
   }
   &__map {
      position: relative;
   }
   &.active {
      & .location-fragrances__map-wrap::before {
         animation: animLineRight 1s ease 2.5s forwards;
      }
      & .fragrances-slider::before {
         animation: animLine 3s ease 1s forwards;
      }
   }
}
</style>
