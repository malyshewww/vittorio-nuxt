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

nuxtApp.hook("page:finish", () => {
  if (!route.hash) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

watch(
  () => route.hash,
  (hash) => {
    appStore.currentHash = hash;
    console.log("new hash", hash);
  }
);

const onScroll = () => {
  const sections = document.querySelectorAll("#panels .note-sections");
  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    let scrollPosition = window.scrollY;
    if (
      element &&
      element.getBoundingClientRect().top + window.scrollY <= scrollPosition
    ) {
      console.log(element);
      router.push({ hash: `#${section.id}` });
    }
  });
};

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
    () => {
      appStore.isHeaderVisible = true;
      if (!route.hash) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  );
  // scrollNav();
  // if (route.hash) {
  //   appStore.currentHash = route.hash;
  //   const element = document.querySelector(appStore.currentHash);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // }
  // window.addEventListener("scroll", onScroll);
  // if (appStore.currentHash != "") {
  //   appStore.currentHash = route.hash;
  //   const target = document.querySelector(`${appStore.currentHash}`);
  //   if (target) {
  //     window.scrollTo({
  //       top: target.getBoundingClientRect().top,
  //       behavior: "smooth",
  //     });
  //   }
  // }
});
// onUnmounted(() => {
//   window.removeEventListener("scroll", onScroll);
// });
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
