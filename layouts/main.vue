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

const router = useRouter();

const { scrollbar } = useScrollbar();

const isBack = ref(false);

nuxtApp.hook("page:loading:end", () => {
  if (window.innerWidth > 1024) {
    const targetElem = document.getElementById(route.query.anchor);
    const { bodyScrollBar } = useScrollbar();
    if (route.query.anchor) {
      const targetElemPosition =
        targetElem.getBoundingClientRect().top + bodyScrollBar.scrollTop;
      bodyScrollBar.scrollTo(0, targetElemPosition, 600);
    }
    if (isBack.value === true) {
      anchorSection(appStore.currentHash);
      // bodyScrollBar.scrollTo(0, 5000, 0);
    }
  }
});

function anchorSection(hash) {
  const { bodyScrollBar } = useScrollbar();
  const targetElement = document.querySelector(hash);
  if (targetElement) {
    const panelsSection = document.querySelector("#panels");
    const id = targetElement.getAttribute("id");
    const { innerHeight } = window;
    let pos;
    switch (id) {
      case "legend":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop
        );
        break;
      case "santal":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 2.07
        );
        break;
      case "protagonist":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 4.19
        );
        break;
      case "musk":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 6.32
        );
        break;
      case "essay":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 8.44
        );
        break;
      case "ethnos":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 10.57
        );
        break;
      case "erato":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 12.69
        );
        break;
      case "voice":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 14.82
        );
        break;
      case "velvet":
        pos = parseInt(
          panelsSection.getBoundingClientRect().top +
            bodyScrollBar.scrollTop +
            innerHeight * 16.94
        );
        break;
      default:
        break;
    }
    bodyScrollBar.scrollTo(0, pos, 200);
  }
}

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
      currentPosition.value = offset.y;
      appStore.isHeaderVisible =
        initialPosition.value <= currentPosition.value ? false : true;
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
      if (!route.query.anchor && !oldPath.includes("products")) {
        setTimeout(() => {
          bodyScrollBar.scrollTop = 0;
          appStore.isHeaderVisible = true;
        }, 200);
      }
      if (oldPath.includes("products")) {
        const lastPath = oldPath.split("/").pop();
        const arrPath = lastPath.split("-");
        if (arrPath.length) {
          const str = arrPath[0].trim().toLowerCase();
          isBack.value = true;
          appStore.currentHash = `#${str}`;
        }
      } else {
        isBack.value = false;
      }
    }
  );
});

onUnmounted(() => {
  if (scrollbar) {
    scrollbar.destroy();
  }
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
