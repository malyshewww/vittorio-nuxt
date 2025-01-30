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

onMounted(() => {
  let initialPosition = window.scrollY;
  let currentPosition = window.scrollY;
  window.addEventListener("scroll", () => {
    if (route.name !== "index") {
      currentPosition = window.scrollY;
      appStore.isHeaderVisible =
        initialPosition <= currentPosition ? false : true;
      initialPosition = currentPosition;
    }
  });
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
