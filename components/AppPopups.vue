<template lang="pug">
	AppPopupPolitic(:is-open="popupStore.popupPolitic.isOpen" @close-popup="closePopupPolitic" :popup-key="popupStore.popupPolitic")
	AppPopupNoticeSuccess(:is-open="popupStore.popupNotice.isOpen" @close-popup="closePopupNotice" :popup-key="popupStore.popupNotice")
	AppPopupNoticeError(:is-open="popupStore.popupNoticeError.isOpen" @close-popup="closePopupNoticeError" :popup-key="popupStore.popupNotice")
	AppPopupOrderSuccess(:is-open="popupStore.popupOrderSuccess.isOpen" @close-popup="closePopupOrderSuccess" :popup-key="popupStore.popupOrderSuccess")
	AppPopupSubscribe(:is-open="popupStore.popupSubscribe.isOpen" @close-popup="closePopupSubscribe" :popup-key="popupStore.popupSubscribe")
</template>

<script setup>
import { usePopupStore } from "~/stores/popups";
import { useCartStore } from "~/stores/cart";

const popupStore = usePopupStore();
const cartStore = useCartStore();

// eslint-disable-next-line
const closePopupNotice = () => {
  popupStore.closePopup(popupStore.popupNotice);
  bodyLockRemove();
};

// eslint-disable-next-line
const closePopupNoticeError = () => {
  popupStore.closePopup(popupStore.popupNoticeError);
  if (!cartStore.isOpenCart) {
    bodyLockRemove();
  }
};
// eslint-disable-next-line
const closePopupPolitic = () => {
  popupStore.closePopup(popupStore.popupPolitic);
  bodyLockRemove();
};
// eslint-disable-next-line
const closePopupOrderSuccess = () => {
  popupStore.closePopup(popupStore.popupOrderSuccess);
  bodyLockRemove();
};
// eslint-disable-next-line
const closePopupSubscribe = () => {
  popupStore.closePopup(popupStore.popupSubscribe);
  bodyLockRemove();
};
</script>
