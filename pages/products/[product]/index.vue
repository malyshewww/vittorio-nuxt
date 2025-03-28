<template lang="pug">
	div
		main.main.product-card
			.container
				.product-card__wrapper
					UiButtonLine(v-if="$device.isMobile" class-names="btn-line-mobile" text="назад" @button-action="goBack")
					ProductMainCardSlider(:images="productData.info.field_images")
					ProductMainCardInfo(:info="productData.info" :images="productData.info.field_images" :options="productData.options")
				.product-card__content
					.content
						h3 История создания аромата
						ContentBlock(:content="productData.info.body[0]")
</template>

<script setup>
const route = useRoute();

// eslint-disable-next-line
const goBack = () => {
  useRouter().go(-1);
  if (!route.hash) {
    window.scrollTo(0, 0);
  }
};

const { product } = useRoute().params;
const runtimeConfig = useRuntimeConfig();

const url = `${runtimeConfig.public.apiBase}/products/${product}?_format=json`;

const { data: productData } = await useAsyncData("productData", () => $fetch(url, {}), {
  transform: (res) => {
    const { breadcrumb, data, metatag } = res;
    const arrOptions = computed(() => {
      const options = [];
      const top = data.field_top_notes || "";
      const base = data.field_base_notes || "";
      const heart = data.field_heart_notes || "";
      const fragrance = data.field_fragrance_group || "";
      if (fragrance) {
        options.push(fragrance);
      }
      if (top) {
        options.push(top);
      }
      if (heart) {
        options.push(heart);
      }
      if (base) {
        options.push(base);
      }
      return options;
    });
    // const optionsTitle = [
    //    "группа аромата",
    //    "верхние ноты",
    //    "ноты сердца",
    //    "базовые ноты",
    // ];
    const metadata = useMetatags(metatag.html_head);
    return {
      breadcrumb,
      info: data,
      options: arrOptions,
      metadata,
    };
  },
});
useHead({
  ...productData.value.metadata,
  bodyAttrs: {
    class: "page--card",
  },
});
</script>

<style lang="scss" scoped>
.product-card {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    padding-right: 150px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: -80px;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--bg-smoke);
      @include bp-xl {
        top: -55px;
      }
      @include bp-md {
        top: -35px;
      }
    }
    @include bp-big-xl {
      padding-right: 0;
    }
    @include bp-xxl {
      flex-direction: column;
      align-items: flex-start;
    }
    @include bp-md {
      gap: 24px;
    }
  }
  &__content {
    display: flex;
    justify-content: center;
    margin-top: 104px;
    @include bp-xl {
      margin-top: 80px;
    }
    @include bp-md {
      margin-top: 40px;
      justify-content: flex-start;
    }
  }
  & .content {
    max-width: 890px;
    & h3 {
      margin-bottom: 30px;
      @include bp-md {
        margin-bottom: 20px;
        font-size: 28px;
        line-height: 36px;
      }
    }
  }
}
.btn-line-mobile {
  display: none;
  @include bp-xl {
    display: flex;
  }
}
</style>
