<template lang="pug">
	NuxtLayout
		NuxtPage
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo.js";

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
</script>

<style lang="scss">
@import "~/assets/scss/nullstyle.scss";
@import "~/assets/scss/keyframes.scss";
@import "~/assets/scss/mixins.scss";
@import "~/assets/scss/fonts.scss";
@import "~/assets/scss/common.scss";
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
