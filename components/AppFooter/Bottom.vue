<template lang="pug">
	.footer__bottom.bottom-footer
		.bottom-footer__item
			.footer__copy © {{getFullYear}}. Vittorio 
		.bottom-footer__item.bottom-footer__item--politic
			UiLinkUnderLine(text="Политика конфиденциальности" :path="other[0].url.href" :is-blank="true")
		.bottom-footer__item.company-footer
			.company-footer__caption Создание сайта:
			a(href="https://webshop.ru/" target="_blank").company-footer__logo
				img(:src="`/images/icons/webshop-logo.svg`" alt="логотип компании")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { other } = mainInfoStore;
</script>

<style lang="scss" scoped>
.bottom-footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 41px 0;
  font-size: 14px;
  line-height: 18px;
  color: var(--text-gray);
  &__item {
    flex: 0 1 400px;
    &--politic {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @include bp-md {
      flex: 1 1 auto;
    }
  }
  @include bp-md {
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 32px 0;
  }
}
.company-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  &__logo {
    width: 70px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--time);
    @include hover {
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
