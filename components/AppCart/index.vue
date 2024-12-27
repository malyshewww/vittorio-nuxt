<template lang="pug">
	.app-cart(:class="{active: cartStore.isOpenCart}" @click="closeCart")
		.app-cart__wrapper(@click.stop)
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
				UiButtonPrimary(title="Оформить заказ" class-names="app-cart-button" @button-action="submitFormOrder")
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

const closeCart = () => {
   cartStore.closeCart();
   if (!menuStore.isOpen) {
      bodyLockRemove();
   }
};

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

async function submitFormOrder() {
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
   try {
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
      const result = await response.json();
      if (response.ok) {
         console.log("response ok");
         cartStore.closeCart();
         popupStore.openPopup(popupStore.popupOrderSuccess);
         cartStore.orderItems = [];
         cartStore.totalCount = 0;
         initialFormStatus();
         resetValues();
      } else {
         initialFormStatus();
         if (result.errors) {
            if (result.errors.name) {
               formStatus.name.message = result.errors.name;
               formStatus.name.isValid = false;
            }
            if (result.errors.email) {
               formStatus.email.message = result.errors.email;
               formStatus.email.isValid = false;
            }
            if (result.errors.phone) {
               formStatus.phone.message = result.errors.phone;
               formStatus.phone.isValid = false;
            }
            if (result.errors.address) {
               formStatus.address.message = result.errors.address;
               formStatus.address.isValid = false;
            }
            if (result.errors.agree) {
               formStatus.agree.message = result.errors.agree;
               formStatus.agree.isValid = false;
            }
         }
      }
   } catch (error) {
      console.log("error");
      console.log(error);
   } finally {
   }
}

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
   () => cartStore.orderItems,
   () => {
      console.log("change order items");
   }
);
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
