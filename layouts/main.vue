<template lang="pug">
	SectionMainHeroVideo(v-if="route.name === 'index'")
	AppHeader
	div(ref="scroller").scroller
		.page
			slot
		AppFooter
	UiButtonScrollUp
	NotesNavigation
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const nuxtApp = useNuxtApp();

const route = useRoute();

nuxtApp.hook("page:loading:end", () => {
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    if (route.query.anchor) {
      const targetElem = document.getElementById(route.query.anchor);
      const targetElemPosition =
        targetElem.getBoundingClientRect().top + bodyScrollBar.scrollTop;
      bodyScrollBar.scrollTo(0, targetElemPosition, 600);
    }
  }
});

const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const scroller = ref(null);

const initialPosition = ref(0);
const currentPosition = ref(0);

onMounted(() => {
  const { bodyScrollBar } = useScrollbar();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
  ScrollTrigger.scrollerProxy(scroller.value, {
    scrollTop(value) {
      if (arguments.length > 0) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
  });
  bodyScrollBar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: scroller.value });
  initialPosition.value = bodyScrollBar.offset.y;
  bodyScrollBar.addListener(({ offset }) => {
    if (route.name !== "index") {
      // appStore.scrollY = offset.y;
      currentPosition.value = offset.y;
      appStore.isHeaderVisible =
        initialPosition.value <= currentPosition.value ? false : true;
      initialPosition.value = currentPosition.value;
    }
    // Делегируем событие прокрутки в окно
    window.dispatchEvent(
      new CustomEvent("scroll", {
        detail: { scrollTop: offset.y },
      })
    );
  });

  watch(
    () => route.path,
    () => {
      if (!route.query.anchor)
        setTimeout(() => {
          bodyScrollBar.scrollTop = 0;
          appStore.isHeaderVisible = true;
        }, 200);
    }
  );
});
</script>

<style lang="scss">
.scroller {
  height: 100vh;
  overflow: hidden;
}
.scrollbar-track-x {
  display: none !important;
}
.scrollbar-track-y {
  z-index: 30 !important;
}
.scrollbar-track {
  z-index: 30 !important;
}
</style>
