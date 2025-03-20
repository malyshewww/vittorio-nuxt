<template lang="pug">
	.notes-navigation(:class="{active: isVisible}")
		nav.notes-navigation__nav
			.swiper(ref="slider")
				ul.notes-navigation__list.swiper-wrapper
					li.notes-navigation__item.swiper-slide(v-for="(item, index) in list" :key="index")
						a(:href="item.path" @click.prevent="scrollToSection($event)").notes-navigation__link {{item.title}}
		UiButtonPrimary(:is-link="true" title="Полная коллекция" path="/products" class-names="btn-small")
</template>

<script setup>
import { useAppStore } from "~/stores/app";

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const appStore = useAppStore();

const slider = ref("");
const swiper = ref(null);

const isVisible = ref(appStore.isNavigationVisible);

const initializeSwiper = () => {
  swiper.value = new Swiper(slider.value, {
    freeMode: true,
    spaceBetween: 16,
    slidesPerView: "auto",
    breakpoints: {
      767.98: {},
      1200: {
        slidesPerView: "auto",
      },
    },
  });
};

const router = useRouter();

// eslint-disable-next-line
const scrollToSection = (e) => {
  const { bodyScrollBar } = useScrollbar();
  const target = e.target;
  if (!target) return;
  const targetId = target.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  // По возможности переписать костыль для десктопа
  if (targetElement) {
    const panelsSection = document.querySelector("#panels");
    const id = targetElement.getAttribute("id");
    const { innerHeight } = window;
    let pos;
    switch (id) {
      case "legend":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop);
        break;
      case "santal":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 2.07);
        break;
      case "protagonist":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 4.19);
        break;
      case "musk":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 6.32);
        break;
      case "essay":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 8.44);
        break;
      case "ethnos":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 10.57);
        break;
      case "erato":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 12.69);
        break;
      case "voice":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 14.82);
        break;
      case "velvet":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 16.94);
        break;
      default:
        break;
    }
    bodyScrollBar.scrollTo(0, pos, 800);
  }
};

const route = useRoute();

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  if (route.query.anchor) {
    observeNavigation();
  }
});

watch(
  () => route.fullPath,
  () => {
    observeNavigation();
  }
);

watch(
  () => isVisible.value,
  (visible) => {
    if (visible) {
      appStore.isButtonUpMode = true;
    } else {
      appStore.isButtonUpMode = false;
    }
  }
);

const observeNavigation = () => {
  const noteCards = document.querySelector(".notes");
  const handleIntersection = ([entry]) => {
    const targetInfo = entry.boundingClientRect;
    const rootBoundsInfo = entry.rootBounds;
    const { isIntersecting } = entry;
    if (isIntersecting) {
      isVisible.value = true;
    } else {
      if (targetInfo.top > rootBoundsInfo.bottom) {
        isVisible.value = false;
      }
    }
  };
  const scroller = document.querySelector(".scroller");
  const observer = new IntersectionObserver(handleIntersection, {
    root: scroller ? scroller : window,
    threshold: 0,
  });
  if (noteCards) {
    observer.observe(noteCards);
  }
};

onMounted(() => {
  initializeSwiper();
  observeNavigation();
  if (route.query.anchor) {
    observeNavigation();
  }
});

// eslint-disable-next-line
const list = [
  {
    title: "Legend № 11.01",
    path: "#legend",
  },
  {
    title: "Santal & Leather",
    path: "#santal",
  },
  {
    title: "Protagonist",
    path: "#protagonist",
  },
  {
    title: "Musk melody",
    path: "#musk",
  },
  {
    title: "Essay",
    path: "#essay",
  },
  {
    title: "Ethnos V",
    path: "#ethnos",
  },
  {
    title: "Erato",
    path: "#erato",
  },
  {
    title: "Voice of the sea",
    path: "#voice",
  },
  {
    title: "Velvet Peony",
    path: "#velvet",
  },
];
</script>

<style lang="scss" scoped>
.notes-navigation {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid var(--bg-smoke);
  border-top: 1px solid var(--bg-smoke);
  height: 52px;
  background: var(--bg-milk);
  padding: 6px 50px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  transform: translateY(120%);
  pointer-events: none;
  transition: transform calc(var(--time) * 2) var(--ttm);
  &.active {
    transform: translateY(0);
    pointer-events: all;
  }
  @include bp-big-xl {
    padding: 6px 20px;
  }
  @include bp-xl {
    // display: none;
  }
  &__nav {
    width: 81vw;
    @include bp-xxl {
      width: 75vw;
    }
  }
  & .swiper {
    //   margin-right: calc(332px - 16px);
  }
  &__list {
    @include reset-list;
  }
  &__item {
    flex-shrink: 0;
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-transform: lowercase;
    width: auto;
    &:not(:last-child) {
      display: flex;
      align-items: center;
      gap: 16px;
      &::after {
        content: "";
        display: block;
        width: 20px;
        height: 24px;
        flex-shrink: 0;
        background-image: url("/images/icons/star-s.svg");
        background-repeat: no-repeat;
        background-position: 0 0;
      }
    }
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  & .btn {
    position: sticky;
    right: 50px;
    flex-shrink: 0;
    @media screen and (max-width: 1600px) {
      right: 20px;
    }
  }
}
body:not(.page--home) .notes-navigation {
  display: none;
}
</style>
