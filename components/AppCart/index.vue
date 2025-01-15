<template lang="pug">
	.app-cart(ref="appCart" :class="{active: cartStore.isOpenCart}" @click="closeCart")
		.app-cart__wrapper(@click.stop)
			AppCartLoader
			div(v-if="cartStore.orderItems.length > 0")
				.app-cart__body
					UiButtonLine(text="Скрыть" @click="closeCart")
					.app-cart__products
						.app-cart__caption.cart-caption Корзина
						.app-cart__items
							AppCartItem(v-for="(item, index) in cartStore.orderItems" :key="item.id" :item.sync="item")
						AppCartPromocode
					AppCartOrder
					AppCartTotal
				UiButtonPrimary(title="Оформить заказ" class-names="app-cart-button" @button-action="formSend")
			div(v-else)
				.app-cart__body(@click.stop)
					UiButtonLine(text="Скрыть" @click="closeCart")
					AppCartEmpty
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
import { useMenuStore } from "~/stores/menu";
import { useOrderStore } from "~/stores/cart-order";
import { usePopupStore } from "~/stores/popups";

const cartStore = useCartStore();
const menuStore = useMenuStore();
const orderStore = useOrderStore();
const popupStore = usePopupStore();

// eslint-disable-next-line
const closeCart = () => {
  cartStore.closeCart();
  if (!menuStore.isOpen) {
    bodyLockRemove();
  }
};
// eslint-disable-next-line
const { formData } = orderStore;

const model = orderStore.model;
const formStatus = orderStore.formStatus;

const initialFormStatus = () => {
  formStatus.name.message = "";
  formStatus.name.isValid = true;

  formStatus.email.message = "";
  formStatus.email.isValid = true;

  formStatus.phone.message = "";
  formStatus.phone.isValid = true;

  formStatus.address.message = "";
  formStatus.address.isValid = true;

  formStatus.agree.message = "";
  formStatus.agree.isValid = true;
};

const resetValues = () => {
  model.name.val = "";
  model.phone.val = "";
  model.email.val = "";
  model.address.val = "";
  model.agree.val = false;
  model.mailing.val = false;
};

const token = useToken();

const runtimeConfig = useRuntimeConfig();

const errors = ref(0);

// eslint-disable-next-line
async function formSend() {
  const { error } = formValidate();
  if (error === 0) {
    const options = {
      data: {
        type: "order--default",
        meta: {
          name: model.name.val,
          phone: model.phone.val,
          email: model.email.val,
          address: model.address.val,
          mailing: model.mailing.val ? 1 : 0,
          agree: model.agree.val ? 1 : 0,
        },
      },
    };
    const response = await fetch(
      `${runtimeConfig.public.apiBase}/jsonapi/checkout-parfum/${cartStore.ORDER_ID}`,
      {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          "Commerce-Cart-Token": token,
        },
        method: "POST",
        body: JSON.stringify(options),
      }
    );
    if (response.ok) {
      const result = await response.json();
      cartStore.closeCart();
      popupStore.openPopup(popupStore.popupOrderSuccess);
      cartStore.orderItems = [];
      cartStore.totalCount = 0;
      initialFormStatus();
      resetValues();
      console.log("result", result);
    } else {
      popupStore.openPopup(popupStore.popupNoticeError);
      setTimeout(() => {
        popupStore.closePopup(popupStore.popupNoticeError);
      }, 3000);
    }
  } else {
    popupStore.openPopup(popupStore.popupNoticeError);
    setTimeout(() => {
      popupStore.closePopup(popupStore.popupNoticeError);
    }, 3000);
    // alert("Заполните обязаьтельные поля");
  }
}

/* eslint-disable no-useless-escape */
function formValidate() {
  errors.value = 0;
  initialFormStatus();
  if (model.name.val.length === 0) {
    formStatus.name.isValid = false;
    formStatus.name.message = "поле Имя обязательно для заполнения";
    errors.value++;
  }
  if (model.address.val.length === 0) {
    formStatus.address.isValid = false;
    formStatus.address.message = "поле Адрес обязательно для заполенния";
    errors.value++;
  }
  if (
    model.email.val.length === 0 ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(model.email.val)
  ) {
    formStatus.email.isValid = false;
    formStatus.email.message = "некорректный email";
    errors.value++;
  }
  if (model.agree.val === 0 || model.agree.val === false) {
    formStatus.agree.isValid = false;
    formStatus.agree.message = "поле обязательно для заполнения";
    errors.value++;
  }
  if (model.phone.val.length === 0 || model.phone.val.length < 18) {
    formStatus.phone.isValid = false;
    formStatus.phone.message = "неверно введен телефон";
    errors.value++;
  }
  return {
    error: errors.value,
  };
}

// eslint-disable-next-line
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}

watch(
  () => cartStore.isOpenCart,
  () => {
    if (cartStore.isOpenCart) {
      loadCart();
    }
  }
);
const loadCart = () => {
  cartStore.getCartItems();
};

onMounted(() => {});
</script>

<style lang="scss">
@use "assets/scss/vars.scss" as *;
.app-cart {
  position: fixed;
  z-index: 30;
  top: 0;
  right: 0;
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background: rgba(#24221f, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity $time $ttm;
  &.active {
    opacity: 1;
    pointer-events: all;
    & .app-cart__wrapper {
      transform: translateX(0%);
    }
  }
  &__wrapper {
    background: var(--bg-milk);
    width: 36.823vw;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    transform: translateX(100%);
    transition: transform $time * 2 $ttm;
    &::-webkit-scrollbar {
      display: none;
    }
    @include bp-xxxl {
      width: 50%;
    }
    @include bp-xl {
      width: 100%;
    }
  }
  &__body {
    display: grid;
    grid-template-columns: 100%;
    gap: 80px;
    padding: 30px 50px 60px;
    @include bp-xl {
      padding: 30px;
      gap: 40px;
    }
    @include bp-md {
      padding: 20px 15px;
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
  &__items {
    padding-top: 8px;
    border-top: 1px solid var(--bg-smoke);
    display: grid;
    grid-template-columns: 100%;
    align-items: start;
    gap: 7px;
  }
  & .btn-line {
    justify-self: end;
    position: sticky;
    top: 20px;
  }
}
.cart-caption {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-transform: uppercase;
  margin-bottom: 40px;
  .app-cart__order & {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 36px;
    text-transform: lowercase;
    @include bp-md {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 20px;
    }
  }
  @include bp-md {
    font-size: 22px;
    line-height: 28px;
    margin-bottom: 20px;
  }
}
.app-cart-button.btn {
  position: sticky;
  z-index: 5;
  width: 100%;
  bottom: 0;
  right: 0;
  border-radius: 0;
  min-height: 56px;
}
</style>
