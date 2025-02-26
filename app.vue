<template lang="pug">
	NuxtLoadingIndicator(color="#70445C")
	AppLoader(v-if="isLoad")
	NuxtLayout(:name="layout")
		NuxtPage
	AppCart
	AppPopups
	AppCartPopup
</template>
<script setup>
import { throttle } from "lodash-es";
import { useMainInfoStore } from "~/stores/maininfo.js";
import { useCartStore } from "~/stores/cart";
import { useAppStore } from "~/stores/app";

const device = useDevice();

const isSafari = ref(device.isSafari);

const cartStore = useCartStore();

const appStore = useAppStore();

// const nuxtApp = useNuxtApp();

const isLoad = ref(true);

onNuxtReady(() => {
  isLoad.value = false;
});

// nuxtApp.hook("page:start", () => {
//   console.log("page start");
// });
// nuxtApp.hook("page:finish", () => {
//   console.log("page finish");
// });
// nuxtApp.hook("page:loading:start", () => {
//   isLoad.value = true;
// });
// nuxtApp.hook("page:loading:end", () => {
//   console.log("loading end");
// });

// addRouteMiddleware("global-loader", () => (isLoad.value = true), {
//   global: true,
// });
// nuxtApp.hook("page:finish", () => (isLoad.value = false));

const mainInfoStore = useMainInfoStore();

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/wsapi/packs/site_info`;

const { data: mainInfoData } = await useFetch(url);

onServerPrefetch(async () => {
  try {
    await mainInfoStore.setData(mainInfoData.value);
  } catch (error) {
    console.log("Error", error);
  }
});

const layout = ref("");

const replaceDevice = () => {
  layout.value = device.isDesktop ? "main" : "default";
  appStore.isMobile = device.isDesktop ? false : true;
};

const loadCart = () => {
  cartStore.getCartItems();
};

const route = useRoute();

watch(
  () => route.path,
  () => {
    if (!appStore.isDisabledButtonCart) {
      appStore.isDisabledButtonCart = true;
      setTimeout(() => {
        appStore.isDisabledButtonCart = false;
      }, 1500);
    }
  }
);

useHead({
  bodyAttrs: {
    class: `${isSafari.value ? "is-safari" : ""}`,
  },
});

onMounted(() => {
  loadCart();
  replaceDevice();
  const watchResize = throttle(function () {
    replaceDevice();
  }, 1000);
  window.addEventListener("resize", watchResize);
  addTouchClass();
  document.body.addEventListener("contextmenu", (e) => {
    const target = e.target;
    if (target.tagName === "A" || target.tagName === "IMG" || target.tagName === "VIDEO") {
      e.preventDefault();
    }
  });
});
</script>

<style lang="scss">
@use "assets/scss/vars";
@use "assets/scss/fonts";
@use "assets/scss/nullstyle";
@use "assets/scss/keyframes";
@use "assets/scss/common";

.page {
  padding: calc(var(--header-height) + 80px) 0 180px;
  @include bp-xl {
    // padding: calc(var(--header-height) + 40px) 0 140px;
    padding: 40px 0 140px;
  }
  @include bp-md {
    // padding: calc(var(--header-height) + 28px) 0 100px;
    padding: 28px 0 100px;
  }
  .page--contacts & {
    padding-bottom: 0;
  }
  .page--card & {
    padding: calc(var(--header-height) + 100px) 0 162px;
    @include bp-xl {
      // padding: calc(var(--header-height) + 60px) 0 140px;
      padding: 60px 0 140px;
    }
    @include bp-md {
      // padding: calc(var(--header-height) + 48px) 0 100px;
      padding: 48px 0 100px;
    }
  }
  .page--home & {
    padding: 0;
  }
}
body:not(.page--home) .page {
  position: relative;
  isolation: isolate;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: transparent url("/images/main-noise.png") repeat-y 0 0;
    background-repeat: repeat;
    background-blend-mode: soft-light;
    pointer-events: none;
    z-index: 0;
  }
}
</style>
