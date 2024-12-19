<template lang="pug">
	footer.footer(ref="footer" :class="className")
		.container
			.footer__body 
				.footer__main.main-footer(v-if="route.name !== 'contacts'")
					AppFooterSubscribeForm
					.main-footer__middle
						nuxt-link(to="/").main-footer__logo
							img(:src="`/images/footer-logo.svg`" alt="логотип")
						UiSocial(class-names="footer-social")
					.main-footer__contacts.footer-contacts
						.footer-contacts__body
							.footer-contacts__title.footer-title Связаться с нами
							ul.footer-contacts__list
								li.footer-contacts__item
									a(href="tel:88006009404").footer-contacts__link 8 800 600-94-04
								li.footer-contacts__item
									a(href="mailti:info@s-parfum.ru").footer-contacts__link info@s-parfum.ru
							.footer-contacts__bottom
								.footer-contacts__label Ароматы Vittorio можно приобрести в магазинах
								UiStores(class-names="footer-stores" :isFooterStores="true" :link-letu="links.field_leturu" :link-apple="links.field_goldapple")
				.footer__bottom.bottom-footer
					.bottom-footer__item
						.footer__copy © {{getYear}}. Vittorio 
					.bottom-footer__item.bottom-footer__item--politic
						UiLinkUnderLine(text="Политика конфиденциальности" path="/page/politic" :is-blank="true")
					.bottom-footer__item.company-footer
						.company-footer__caption Создание сайта:
						a(href="https://webshop.ru/" target="_blank").company-footer__logo
							img(:src="`/images/icons/webshop-logo.svg`" alt="логотип компании")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";

const mainInfoStore = useMainInfoStore();

const { links } = mainInfoStore;
console.log(links);

const getYear = computed(() => {
   return new Date().getFullYear();
});
const route = useRoute();

const footer = ref(null);
const className = ref("");

onMounted(() => {
   const toggleClassname = (isVisible) => {
      if (isVisible) {
         className.value = "active";
      } else {
         className.value = "";
      }
   };
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         toggleClassname(entry.isIntersecting);
      });
   });
   observer.observe(footer.value);
});
</script>

<style lang="scss">
@use "assets/scss/_vars" as *;
@use "assets/scss/_mixins" as m;
.footer {
   position: relative;
   background-color: var(--bg-milk);
   .page--contacts & {
      &::before,
      &::after {
         content: none;
      }
   }
   &.active {
      &::before {
         animation-play-state: running;
         animation: animLineFooterLeft 1s ease 1s forwards;
      }
      &::after {
         animation: animLineFooterRight 2.5s ease 1s forwards;
         animation-play-state: running;
      }
   }
   &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 1px;
      background-color: var(--bg-smoke);
      pointer-events: none;
      transform: translateX(-100%);
   }
   &::after {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 50%;
      width: 0px;
      height: 0px;
      border: 0px solid var(--bg-smoke);
      border-right: 0;
      border-bottom: 0;
      pointer-events: none;
      transform: translateX(-100%);
   }
   &__body {
   }
   &__main {
   }
   &__copy {
   }
}
.main-footer {
   padding: 100px 0 80px;
   display: grid;
   grid-template-columns: 1fr auto 1fr;
   align-items: start;
   gap: 20px;
   &__subscribe {
      max-width: 480px;
   }
   &__middle {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
   }
   &__contacts {
      flex-grow: 1;
   }
   &__logo {
   }
}
.footer-title {
   font-family: var(--second-family);
   font-weight: 500;
   font-size: 36px;
   line-height: 44px;
}
.footer-contacts {
   height: 100%;
   display: flex;
   width: 480px;
   margin-left: auto;
   &__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 24px;
      height: 100%;
   }
   &__list {
      @include m.reset-list;
      display: flex;
      align-items: center;
      gap: 12px;
   }
   &__item {
      & + & {
         padding-left: 12px;
         border-left: 1px solid var(--bg-smoke);
      }
   }
   &__link {
      font-weight: 700;
      line-height: 22px;
      transition: color $time * 2 $ttm;
      @media (any-hover: hover) {
         &:hover {
            color: var(--text-gray);
         }
      }
   }
   &__bottom {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 20px;
      text-align: right;
   }
   &__label {
      line-height: 22px;
   }
}
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
   }
}
</style>
