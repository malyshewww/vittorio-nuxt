<template lang="pug">
	NuxtLayout(:name="layout")
		NuxtPage
	AppCart
	AppPopups
</template>

<script setup>
import { throttle } from "lodash-es";
import { useMainInfoStore } from "~/stores/maininfo.js";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

// Тест Модалки
// import { usePopupStore } from "~/stores/popups";

// const popupStore = usePopupStore();

// const openPopupNotice = () => {
//    popupStore.openPopup(popupStore.popupOrderSuccess);
//    bodyLockAdd();
// };

const mainInfoStore = useMainInfoStore();

const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.apiBase}/wsapi/packs/site_info`;

const { data: mainInfoData } = await useFetch(url);

onServerPrefetch(async () => {
   try {
      // const token = useToken();
      // cartStore.setCartToken(token);
      await mainInfoStore.setData(mainInfoData.value);
   } catch (error) {
      console.log("Error", error);
   }
});

//логика лейаута
const device = useDevice();
const layout = ref("");

const replaceDevice = () => {
   layout.value = window.innerWidth > 1024 ? "main" : "default";
};

const loadCart = () => {
   cartStore.getCartItems();
};

onMounted(() => {
   loadCart();
   replaceDevice();
   const watchResize = throttle(function () {
      replaceDevice();
      // here you should mutate your `device_type` via a Vuex mutation/action
      // and make your axios call by preferably fetching either a const/let variable
      // or a global vuex state
   }, 1000);
   window.addEventListener("resize", watchResize);
});
</script>

<style lang="scss">
@use "assets/scss/vars";
@use "assets/scss/fonts";
@use "assets/scss/nullstyle";
@use "assets/scss/keyframes";
@use "assets/scss/common";
@use "assets/scss/mixins" as m;

.page {
   padding: calc(var(--header-height) + 80px) 0 180px;
   @include bp-xl {
      padding: calc(var(--header-height) + 40px) 0 140px;
   }
   @include bp-md {
      padding: calc(var(--header-height) + 28px) 0 100px;
   }
   .page--contacts & {
      padding-bottom: 0;
   }
   .page--card & {
      padding: calc(var(--header-height) + 100px) 0 162px;
      @include bp-xl {
         padding: calc(var(--header-height) + 60px) 0 140px;
      }
      @include bp-md {
         padding: calc(var(--header-height) + 48px) 0 100px;
      }
   }
   .page--home & {
      padding: 0;
   }
}

.popup-btn {
   position: fixed;
   top: 0;
   left: 0;
   z-index: 30;
   width: 200px;
   height: 100px;
   background-color: black;
   color: white;
}
.app-cart {
   // background-color: white;
}
// html.has-scroll-smooth {
//    overflow: hidden;
// }
// html.has-scroll-dragging,
// html.has-scroll-dragging * {
//    -webkit-user-select: none;
//    -moz-user-select: none;
//    -ms-user-select: none;
//    user-select: none;
// }
// .has-scroll-smooth body {
//    overflow: hidden;
// }
// .c-scrollbar {
//    position: absolute;
//    right: 0;
//    top: 0;
//    width: 5px;
//    height: 100vh;
//    transform-origin: center right;
//    transition: transform 0.3s, opacity 0.3s;
//    opacity: 0;
// }
// .c-scrollbar:hover {
//    transform: scaleX(1);
// }
// .c-scrollbar:hover,
// .has-scroll-dragging .c-scrollbar,
// .has-scroll-scrolling .c-scrollbar {
//    opacity: 1;
// }
// .c-scrollbar_thumb {
//    position: absolute;
//    top: 0;
//    right: 0;
//    background-color: #fdc65d;
//    width: 5px;
//    margin: 2px;
//    cursor: -webkit-grab;
//    cursor: grab;
// }
// .has-scroll-dragging .c-scrollbar_thumb {
//    cursor: -webkit-grabbing;
//    cursor: grabbing;
// }
</style>
