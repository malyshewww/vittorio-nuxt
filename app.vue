<template lang="pug">
	NuxtLayout
		NuxtPage
	AppCart
	AppPopups
</template>

<script setup>
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
</script>

<style lang="scss">
@use "assets/scss/vars";
@use "assets/scss/fonts";
@use "assets/scss/nullstyle";
@use "assets/scss/keyframes";
@use "assets/scss/common";
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
