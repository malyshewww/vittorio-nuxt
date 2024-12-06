<template lang="pug">
	SectionMainFragrances(:countries="data.countries")
	SectionMainNotes(:products="data.products")
	SectionMainWelcome(:text="data.text")
</template>

<script setup>
import { useFrontData } from "@/composables/useFrontData";
// import { LocomotiveScroll } from "locomotive-scroll";

// const { $LocomotiveScroll: LocomotiveScroll } = useNuxtApp();

definePageMeta({
   layout: "main",
   bodyAttrs: {
      class: "page--home",
   },
});

const { data, status, error } = useFrontData();

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
