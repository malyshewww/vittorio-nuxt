<template lang="pug">
	.content-blocks
		.content(ref="content" v-html="props.content")
</template>

<script setup>
const props = defineProps({
   content: {
      type: String,
      required: false,
      default: "",
   },
});

const content = ref("");

defineExpose({
   content,
});
</script>

<style lang="scss">
.content-blocks {
   display: grid;
   gap: 80px;
}
.content {
   max-width: 1355px;
   & h1,
   & h2,
   & h3,
   & h4,
   & h5,
   & h6 {
      font-family: var(--second-family);
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 28px;
   }
   & h1 {
      font-size: 72px;
      line-height: 86px;
   }
   & h2 {
      font-size: 44px;
      line-height: 56px;
   }
   & h3 {
      font-size: 36px;
      line-height: 44px;
   }
   & h4 {
      font-size: 28px;
      line-height: 36px;
   }
   & h5 {
      font-size: 20px;
      line-height: 24px;
   }
   & p {
      font-weight: 400;
      line-height: 22px;
      margin-bottom: 16px;
   }
   & ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
   }
   & ul li {
      padding-left: 32px;
      line-height: 22px;
      position: relative;
      &::before {
         content: "";
         position: absolute;
         display: block;
         top: 0;
         left: 0;
         width: 22px;
         height: 22px;
         background-image: url("/images/icons/star-s.svg");
         background-repeat: no-repeat;
         background-position: center;
      }
   }
   & table {
      border-collapse: collapse;
      & tr {
         display: grid;
         grid-template-columns: repeat(3, 1fr);
      }
      & td,
      & th {
         padding: 11px 24px;
         font-size: 16px;
         line-height: 22px;
         min-height: 46px;
         border-bottom: 1px solid var(--bg-smoke);
      }
      & th {
         font-weight: 700;
         text-align: left;
      }
   }
   & > *:last-child {
      margin-bottom: 0;
   }
   & > *:first-child {
      margin-top: 0;
   }
}
.blockquote {
   border-top: 1px solid var(--bg-smoke);
   border-bottom: 1px solid var(--bg-smoke);
   padding: 20px 0;
   text-align: center;
   margin: 40px 0;
   & p {
      font-weight: 700;
   }
   &__text {
      font-size: 18px;
      line-height: 26px;
   }
   &__footer {
      & p {
         margin: 0;
      }
   }
   & span {
      line-height: 22px;
   }
}
</style>
