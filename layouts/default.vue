<template lang="pug">
	div.wrapper
		AppHeader
		.page
			.page__body
				slot
		AppFooter
	UiButtonScrollUp
</template>

<script setup>
import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

const route = useRoute();

const router = useRouter();

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:loading:end", () => {
  if (!route.hash) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // if (isBack.value === true) {
  //   anchorSectionMobile(appStore.currentHash);
  // }
});

function anchorSectionMobile(hash) {
  const header = document.querySelector(".header");
  const targetElement = document.querySelector(hash);
  window.scrollTo({
    top:
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      header.clientHeight,
    behavior: "smooth",
  });
}

// watch(
//   () => route.hash,
//   (hash) => {
//     appStore.currentHash = hash;
//   }
// );

let initialPosition = 0;

const scroll = () => {
  let currentPosition = window.scrollY;
  if (route.name !== "index") {
    if (currentPosition > initialPosition && initialPosition > 0) {
      appStore.isHeaderVisible = false;
    } else {
      appStore.isHeaderVisible = true;
    }
    // if (initialPosition <= currentPosition && initialPosition > 0) {
    //   appStore.isHeaderVisible = false;
    // } else {
    //   appStore.isHeaderVisible = true;
    // }
  }
  initialPosition = currentPosition;
};

onMounted(() => {
  window.addEventListener("scroll", scroll);
  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      appStore.isHeaderVisible = true;
      if (!route.hash) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      // if (oldPath.includes("products")) {
      //   const lastPath = oldPath.split("/").pop();
      //   const arrPath = lastPath.split("-");
      //   if (arrPath.length) {
      //     const str = arrPath[0].trim().toLowerCase();
      //     isBack.value = true;
      //     appStore.currentHash = `#${str}`;
      //   }
      // } else {
      //   isBack.value = false;
      // }
    }
  );
  if (route.hash) {
    anchorSectionMobile(route.hash);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", scroll);
});
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: clip;
}
.page {
  flex: 1 1 auto;
}
body.lock {
  overflow: hidden;
}
// .scroller {
//    height: 100vh;
//    overflow: hidden;
// }
// .scrollbar-track-x {
//    display: none !important;
// }
// .scrollbar-track {
//    z-index: 30 !important;
// }
</style>
