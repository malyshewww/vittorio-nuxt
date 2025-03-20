<template lang="pug">
	.contacts__actions.actions-contacts
		.actions-contacts__item(v-if="links.field_phone")
			.actions-contacts__caption Телефон
			a(:href="`tel:${formatPhone(links.field_phone)}`").actions-contacts__link {{links.field_phone}}
		.actions-contacts__item(v-if="links.field_e_mail")
			.actions-contacts__caption Электронная почта
			a(:href="`mailto:${links.field_e_mail}`").actions-contacts__link {{links.field_e_mail}}
		.actions-contacts__item
			.actions-contacts__caption Мы в соцсетях
			UiSocial
		.actions-contacts__item(v-if="links.field_goldapple || links.field_leturu")
			.actions-contacts__caption Ароматы Vittorio можно приобрести в магазинах
			UiStores(:isFooterStores="false" :link-apple="links.field_goldapple" :link-letu="links.field_leturu")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo.js";
const mainInfoStore = useMainInfoStore();

// eslint-disable-next-line
const { links } = mainInfoStore;
</script>

<style lang="scss" scoped>
.actions-contacts {
  display: grid;
  grid-template-columns: 100%;
  gap: 40px;
  max-width: 34.323vw;
  @include bp-xxxl {
    max-width: 100%;
  }
  @include bp-md {
    gap: 20px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    &:last-child {
      gap: 20px;
    }
  }
  &__caption {
    line-height: 22px;
    color: var(--bg-smoke);
  }
  &__link {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    text-transform: uppercase;
    color: var(--bg-smoke);
    transition: color calc(var(--time) * 2) var(--ttm);
    @include hover {
      &:hover {
        color: var(--text-gray);
      }
    }
    @include bp-xl {
      font-size: 22px;
      line-height: 28px;
    }
  }
}
</style>
