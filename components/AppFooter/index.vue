<template lang="pug">
  .footer-wrap
    span.footer-noise
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
                ul.footer-contacts__list(v-if="field_e_mail || field_phone")
                  li.footer-contacts__item
                    a(:href="`tel:${formatPhone(field_phone)}`").footer-contacts__link {{ field_phone }}
                  li.footer-contacts__item
                    a(:href="`mailto:${field_e_mail}`").footer-contacts__link {{ field_e_mail }}
                .footer-contacts__bottom
                  .footer-contacts__label Ароматы Vittorio можно приобрести в магазинах
                  UiStores(class-names="footer-stores" :isFooterStores="true" :link-letu="links.field_leturu" :link-apple="links.field_goldapple")
          AppFooterBottom
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";

const mainInfoStore = useMainInfoStore();

// eslint-disable-next-line
const { links } = mainInfoStore;

// eslint-disable-next-line
const { field_e_mail, field_phone } = links;

// eslint-disable-next-line
const route = useRoute();

const footer = ref(null);
const className = ref("");

onMounted(() => {
  const toggleClassName = (isVisible) => {
    if (isVisible) {
      className.value = "active";
    } else {
      className.value = "";
    }
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      toggleClassName(entry.isIntersecting);
    });
  });
  observer.observe(footer.value);
});
</script>

<style lang="scss">
@use "assets/scss/vars" as *;
.footer-wrap {
  position: relative;
  background-color: var(--bg-milk);
  isolation: isolate;
}
.footer-noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent url("/images/main-noise.png") repeat-y 0 0;
  background-repeat: repeat;
  background-blend-mode: soft-light;
  pointer-events: none;
  z-index: -1;
}
.footer {
  position: relative;
  @include bp-xl {
    margin: 0 20px;
    overflow: hidden;
    & .container {
      padding: 0;
    }
  }
  .page--contacts & {
    &::before,
    &::after {
      content: none;
    }
  }
  .page--home & {
    padding-bottom: 40px;
    @include bp-xl {
      padding-bottom: 0;
    }
  }
  &.active {
    &::before {
      animation-play-state: running;
      animation: animLineFooterLeft 1s ease 0s forwards;
    }
    &::after {
      animation: animLineFooterRight 1s ease 0.8s forwards;
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
    @include bp-xl {
      transform: translateX(-120%);
    }
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
}
.main-footer {
  padding: 100px 0 80px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 20px;
  @include bp-xl {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 100px 0 40px;
  }
  @include bp-md {
    padding: 72px 0 0;
  }
  &__middle {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    @include bp-xl {
      order: -1;
      margin: 0;
    }
    @include bp-md {
      gap: 24px;
    }
  }
  &__logo {
    @include bp-md {
      width: 107px;
      height: 52px;
    }
  }
}
.footer-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-transform: uppercase;
  @include bp-md {
    font-size: 22px;
    line-height: 28px;
  }
}
.footer-contacts {
  height: 100%;
  display: flex;
  width: 480px;
  margin-left: auto;
  flex-grow: 1;
  @include bp-xxxl {
    width: 350px;
  }
  @include bp-xl {
    width: 100%;
    margin-top: 16px;
    height: auto;
  }
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 24px;
    height: 100%;
    @include bp-xl {
      align-items: flex-start;
    }
    @include bp-md {
      align-items: center;
      text-align: center;
      gap: 12px;
    }
  }
  &__list {
    @include reset-list;
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
    @include hover {
      &:hover {
        color: var(--text-gray);
      }
    }
    @include bp-md {
      font-size: 14px;
      line-height: 18px;
    }
  }
  &__bottom {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    text-align: right;
    @include bp-xl {
      text-align: left;
      align-items: flex-start;
    }
    @include bp-md {
      margin-top: 8px;
      align-items: center;
      text-align: center;
      gap: 16px;
      & .stores {
        width: auto;
      }
    }
  }
  &__label {
    line-height: 22px;
  }
}
</style>
