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

nuxtApp.hook("page:loading:end", () => {
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    const targetElem = document.getElementById(route.query.anchor);
    if (route.query.anchor) {
      const targetElemPosition =
        targetElem.getBoundingClientRect().top + bodyScrollBar.scrollTop;
      bodyScrollBar.scrollTo(0, targetElemPosition, 600);
    }
  }
});

function anchorSection(hash) {
  console.log(hash);
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
            innerHeight * 6.31
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
    bodyScrollBar.scrollTo(0, pos, 800);
  }
}

const { $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const scroller = ref(null);

const initialPosition = ref(0);
const currentPosition = ref(0);

function scrollNav() {
  const sections = document.querySelectorAll("#panels .note-sections");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= 150) {
      router.replace({ path: "/", query: { anchor: section.id } });
      // router.replace({ query: { anchor: `#${section.id}` } });
      // window.location.hash = "#" + section.id;
      // navLinks.forEach(link => {
      // 	link.classList.remove('current');
      // 	if (link.getAttribute('href').substring(1) === section.id) {
      // 		link.classList.add('current');
      // 	}
      // });
    }
  });
  // window.addEventListener("scroll", scrollNav);
}

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
    // Делегируем событие прокрутки в окно
    // window.dispatchEvent(
    //   new CustomEvent("scroll", {
    //     detail: { scrollTop: offset.y },
    //   })
    // );
  });
  // scrollNav();
  // Получаем все секции
  // sections.forEach((section, index) => {
  //   section.setAttribute("data-index", index + 1);
  //   section.setAttribute(
  //     "data-top",
  //     bodyScrollBar.scrollTop +
  //       section.getBoundingClientRect().top +
  //       section.clientHeight * index +
  //       1
  //   );
  // });

  // Функция обратного вызова при пересечении
  // const callback = (entries) => {
  //   entries.forEach((entry) => {
  //     const targetInfo = entry.boundingClientRect;
  //     const rootBoundsInfo = entry.rootBounds;
  //   });
  // };
  // const observer = new IntersectionObserver(callback, {
  //   rootMargin: "0px",
  //   threshold: 0,
  // });
  // sections.forEach((section) => {
  //   observer.observe(section);
  // });
  // if (route.hash) {
  //   anchorSection(route.hash);
  // }

  watch(
    () => route.fullPath,
    (newVal, oldVal) => {
      if (!route.query.anchor && !oldVal.includes("products")) {
        setTimeout(() => {
          bodyScrollBar.scrollTop = 0;
          appStore.isHeaderVisible = true;
        }, 200);
      }
    }
  );

  // watch(
  //   () => route.path,
  //   (newVal, oldVal) => {
  //     if (oldVal.includes("products")) {
  //       const last = oldVal.split("/").pop();
  //       const arrTitle = last?.split("-");
  //       if (arrTitle) {
  //         const str = arrTitle[0].trim().toLowerCase();
  //         appStore.currentHash = `${str}`;
  //         console.log(str);
  //         anchorSection(`${str}`);
  //       }
  //     }
  //   }
  // );
});

onUnmounted(() => {
  console.log("unmounted");
  // window.removeEventListener("scroll", scrollNav);
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
