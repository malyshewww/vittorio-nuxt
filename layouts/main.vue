<template lang="pug">
	div
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

import scrollToSection from "~/utils/ScrollToSection";

const appStore = useAppStore();

const nuxtApp = useNuxtApp();

const route = useRoute();

const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

nuxtApp.hook("page:loading:end", () => {
  if (window.innerWidth > 1024) {
    const targetElem = document.getElementById(route.query.anchor);
    const { bodyScrollBar } = useScrollbar();
    if (route.query.anchor) {
      const targetElemPosition = targetElem.getBoundingClientRect().top + bodyScrollBar.scrollTop;
      bodyScrollBar.scrollTo(0, targetElemPosition, 600);
    }
    if (appStore.isBackWithAroma === true && appStore.currentHash !== "") {
      anchorSection(appStore.currentHash);
    }
  }
});

function anchorSection(hash) {
  const targetElement = document.querySelector(hash);
  scrollToSection(targetElement, 200);
}

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
      currentPosition.value = offset.y;
      appStore.isHeaderVisible = initialPosition.value <= currentPosition.value ? false : true;
      initialPosition.value = currentPosition.value;
    }
    appStore.scrollY = offset.y;
    // Делегируем событие прокрутки в окно
    // window.dispatchEvent(
    //   new CustomEvent("scroll", {
    //     detail: { scrollTop: offset.y },
    //   })
    // );
  });

  watch(
    () => route.path,
    (newPath, oldPath) => {
      if (!route.query.anchor || oldPath.split("/").length > 1) {
        bodyScrollBar.scrollTop = 0;
        setTimeout(() => {
          appStore.isHeaderVisible = true;
        }, 1);
      }
      if (oldPath.includes("products") && appStore.currentHash) {
        const lastPath = oldPath.split("/").pop();
        const arrPath = lastPath.split("-");
        appStore.isBackWithAroma = true;
        if (arrPath.length) {
          // const str = arrPath[0].trim().toLowerCase();
          // appStore.currentHash = `#${str}`;
        } else {
          appStore.isBackWithAroma = false;
        }
      } else {
        appStore.isBackWithAroma = false;
      }
      // console.log("appStore.isBackWithAroma", appStore.isBackWithAroma);
      // console.log("appStore.currentHash", appStore.currentHash);
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
