<template lang="pug">
	section.fragrances
		.container
			.fragrances__body
				SectionMainFragrancesHeading
				.fragrances__location.location-fragrances(ref="locationBlock" :class="className")
					.location-fragrances__wrapper
						SectionMainFragrancesSlider(:countries="countries" :isEnableAutoplay="state.isEnableAutoplay" :current-slide-index="state.currentSlideIndex" @change-area="changeArea")
						.location-fragrances__map-wrap
							UiButtonPrimary(title="полная коллекция" :is-link="true" path="/products")
							//- .location-fragrances__line
							//- .map-mobile
							//- 	img(:src="`/images/sections/fragrances/map-mobile.png`" alt="map")
							.location-fragrances__map-container
								.location-fragrances__map
									//- NuxtPicture(:src="`/images/sections/fragrances/map.png`" alt="map")
									img(:src="`/images/sections/fragrances/map.png`" alt="map")
									SectionMainFragrancesMap(:active-area="activeArea" :countries="countries" @stop-autoplay="stopAutoplay" @start-autoplay="startAutoplay")
</template>

<script setup>
import { throttle } from "lodash-es";

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

const isAdaptive = ref(false);

const replaceDevice = () => {
   isAdaptive.value = window.innerWidth <= 1400 ? true : false;
};

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

   function initDraggable() {
      if (window.innerWidth <= 1400) {
         var image = document.querySelector(".location-fragrances__map");
         var container = document.querySelector(
            ".location-fragrances__map-container"
         );

         var isDragging = false;
         var startX, startY, initialLeft, initialTop;

         function startDrag(e) {
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            startY = e.pageY || e.touches[0].pageY;
            initialLeft = parseInt(window.getComputedStyle(image).left) || 0;
            initialTop = parseInt(window.getComputedStyle(image).top) || 0;

            // e.preventDefault();
            image.style.transition = "none";
         }

         function drag(e) {
            if (isDragging) {
               var dx = (e.pageX || e.touches[0].pageX) - startX;
               var dy = (e.pageY || e.touches[0].pageY) - startY;

               var newLeft = initialLeft + dx;
               var newTop = initialTop + dy;

               // Ограничиваем перемещение изображения в пределах контейнера
               var containerWidth = container.clientWidth;
               var containerHeight = container.clientHeight;
               var imageWidth = image.clientWidth;
               var imageHeight = image.clientHeight;

               // Проверяем границы
               if (newLeft > 0) newLeft = 0; // Левый край
               if (newLeft < containerWidth - imageWidth)
                  newLeft = containerWidth - imageWidth; // Правый край
               if (newTop > 0) newTop = 0; // Верхний край
               if (newTop < containerHeight - imageHeight)
                  newTop = containerHeight - imageHeight; // Нижний край

               image.style.left = newLeft + "px";
               image.style.top = newTop + "px";
            }
         }

         function endDrag() {
            isDragging = false; // Останавливаем перетаскивание
            image.style.transition = "top 0.3s ease 0s, left 0.3s ease 0s";
         }

         image.addEventListener("mousedown", startDrag);
         document.addEventListener("mousemove", drag);
         document.addEventListener("mouseup", endDrag);
         // Обработка касания для мобильных устройств
         image.addEventListener("touchstart", startDrag);
         document.addEventListener("touchmove", drag);
         document.addEventListener("touchend", endDrag);
      }
   }
   initDraggable();
});
</script>

<style lang="scss" scoped>
@use "assets/scss/vars" as *;
.fragrances {
   padding: 257px 0 140px;
   background-color: var(--bg-milk);
   &__body {
      display: flex;
      flex-direction: column;
      gap: 140px;
      @include bp-xxl {
         gap: 100px;
      }
      @include bp-xl {
         gap: 60px;
      }
   }
   @include bp-xxxl {
      padding: 140px 0;
   }
   @include bp-xl {
      padding: calc(var(--header-height) + 40px) 0 60px;
   }
}
.location-fragrances {
   position: relative;
   &__wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      @include bp-xxl {
         flex-direction: column;
         align-items: center;
         gap: 32px;
      }
   }
   &__map-wrap {
      position: relative;
      padding-top: 50px;
      padding-left: 50px;
      min-height: 705px;
      // width: 100%;
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
         @include bp-xxl {
            content: none;
         }
      }
      & .btn {
         position: absolute;
         right: 0;
         bottom: 4px;
         z-index: 5;
         @include bp-md {
            display: none;
         }
      }
      @include bp-xxxl {
         width: 100%;
         overflow: hidden;
         min-height: auto;
      }
      @include bp-xxl {
         padding: 0;
      }
      @include bp-md {
         overflow: visible;
      }
   }
   &__map-container {
      position: relative;
      @include bp-xxxl {
         width: 100%;
         min-height: 705px;
      }
      @include bp-md {
         min-height: 400px;
      }
   }
   &__map {
      position: relative;
      @include bp-xxxl {
         position: absolute;
         // top: 50px;
         // left: 50px;
         width: 1310px;
         height: 100%;
         transition: top $time ease 0s, left $time ease 0s;
         & img {
            display: none;
         }
      }
      @include bp-md {
         width: 742px;
         left: calc(50% - 371px);
      }
   }
   &.active {
      & .location-fragrances__map-wrap::before {
         animation: animLineRight 1s ease 2.5s forwards;
      }
      & .fragrances-slider::before {
         animation: animLine 3s ease 1s forwards;
      }
      & .fragrances-slider::after {
         animation: animLine 3s ease 1s forwards;
      }
   }
}
</style>
