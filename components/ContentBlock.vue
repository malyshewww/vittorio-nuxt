<template lang="pug">
	.content-blocks
		.content(ref="content" v-html="props.content")
</template>

<script setup>
// eslint-disable-next-line
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

const device = useDevice();

onMounted(() => {
  if (device.isMobileOrTablet) {
    const tables = document.querySelectorAll(".content table");
    for (const table of tables) {
      const tableWrap = document.createElement("div");
      tableWrap.classList.add("table-wrap");
      table.parentNode.insertBefore(tableWrap, table);
      tableWrap.appendChild(table);
    }
  }
});
</script>

<style lang="scss">
@use "assets/scss/vars" as *;
.content-blocks {
  display: grid;
  gap: 80px;
}
.content-table {
  margin: 80px 0 0;
  @include bp-md {
    margin: 40px 0 0;
  }
}
.content {
  max-width: 1355px;
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & table caption {
    font-family: var(--second-family);
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 28px;
    @include bp-md {
      margin-bottom: 20px;
    }
  }
  & h1 {
    font-size: 72px;
    line-height: 86px;
    @include bp-md {
      font-size: 36px;
      line-height: 44px;
    }
  }
  & h2 {
    font-size: 44px;
    line-height: 56px;
    @include bp-md {
      font-size: 32px;
      line-height: 36px;
    }
  }
  & h3 {
    font-size: 36px;
    line-height: 44px;
    @include bp-md {
      font-size: 22px;
      line-height: 28px;
    }
  }
  & h4 {
    font-size: 28px;
    line-height: 36px;
    @include bp-md {
      font-size: 20px;
      line-height: 24px;
    }
  }
  & h5 {
    font-size: 20px;
    line-height: 24px;
    @include bp-md {
      font-size: 18px;
      line-height: 22px;
    }
  }
  & p {
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 16px;
    font-family: var(--font-family);
    @include bp-md {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 12px;
    }
  }
  * + h2,
  * + h3,
  * + h4,
  * + h5,
  * + h6 {
    margin-top: 20px;
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
  ol {
    counter-reset: num;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  ol li {
    display: flex;
    gap: 10px;
    counter-increment: num;
    &::before {
      content: counter(num) ")";
      // min-width: 17px;
    }
  }
  ul li,
  ol li {
    @include bp-md {
      font-size: 14px;
      line-height: 18px;
    }
  }

  & table {
    border-collapse: collapse;
    margin-bottom: 80px;
    margin-top: 80px;
    width: 100%;
    & caption {
      text-align: left;
      font-size: 36px;
      line-height: 44px;
    }
    @include bp-md {
      margin-bottom: 0px;
      margin-top: 0px;
    }
    & p {
      margin-bottom: 0;
    }
    & tr {
    }
    & td,
    & th {
      padding: 11px 24px;
      font-size: 16px;
      line-height: 22px;
      min-height: 46px;
      border-bottom: 1px solid var(--bg-smoke);
      @include bp-md {
        font-size: 14px;
        line-height: 18px;
      }
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
  a {
    // font-size: 16px;
    // line-height: 22px;
    color: var(--text-gray);
    border-bottom: 1px solid currentColor;
    transition: color $time, border-color $time;
    @media (any-hover: hover) {
      &:hover {
        border-color: var(--bg-smoke);
        color: var(--bg-smoke);
      }
      &:active {
        border-color: #682579;
        color: #682579;
      }
    }
    &:active {
      border-color: #682579;
      color: #682579;
    }
  }
  * + .align-left,
  * + .align-right {
    margin-top: 0;
  }
}
blockquote {
  border-top: 1px solid var(--bg-smoke);
  border-bottom: 1px solid var(--bg-smoke);
  padding: 20px 0;
  text-align: center;
  margin: 40px 0;
  & > *:last-child {
    margin-bottom: 0;
    @include bp-md {
      margin-bottom: 0;
    }
  }
  & > *:first-child {
    font-size: 18px;
    line-height: 26px;
  }
  & p {
    font-weight: 700;
    &:nth-child(2) {
      margin-bottom: 4px;
      font-weight: 400;
      @include bp-md {
        margin-bottom: 4px;
      }
    }
  }
}
.table-wrap {
  @include bp-xl {
    overflow-x: auto;
    overflow-y: hidden;
    margin: 40px -30px;
    width: 100vw;
    &::-webkit-scrollbar {
      display: none;
      height: 0;
      width: 0;
    }
  }
  @include bp-md {
    margin: 40px -20px;
  }
}
.align-left {
  margin: 32px 40px 16px 0px;
  float: left;
  @include bp-md {
    float: none;
    margin: 20px 0;
    width: 100%;
  }
}
.align-right {
  margin: 0 0 36px 40px;
  float: right;
  @include bp-md {
    float: none;
    margin: 20px 0;
    width: 100%;
  }
}
</style>
