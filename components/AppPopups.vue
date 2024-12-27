<template lang="pug">
	AppPopupPolitic(:is-open="popupStore.popupPolitic.isOpen" @close-popup="closePopupPolitic" :popup-key="popupStore.PopupPolitic")
	AppPopupNoticeSuccess(:is-open="popupStore.popupNotice.isOpen" @close-popup="closePopupNotice" :popup-key="popupStore.popupNotice")
	AppPopupNoticeError(:is-open="popupStore.popupNoticeError.isOpen" @close-popup="closePopupNoticeError" :popup-key="popupStore.popupNotice")
	AppPopupOrderSuccess(:is-open="popupStore.popupOrderSuccess.isOpen" @close-popup="closePopupOrderSuccess" :popup-key="popupStore.popupOrderSuccess")
	AppPopupSubscribe(:is-open="popupStore.popupSubscribe.isOpen" @close-popup="closePopupSubscribe" :popup-key="popupStore.popupSubscribe")
</template>

<script setup>
import { usePopupStore } from "~/stores/popups";

const popupStore = usePopupStore();

const closePopupNotice = () => {
   popupStore.closePopup(popupStore.popupNotice);
   bodyLockRemove();
};
const closePopupNoticeError = () => {
   popupStore.closePopup(popupStore.popupNoticeError);
   bodyLockRemove();
};
const closePopupPolitic = () => {
   popupStore.closePopup(popupStore.popupPolitic);
   bodyLockRemove();
};
const closePopupOrderSuccess = () => {
   popupStore.closePopup(popupStore.popupOrderSuccess);
   bodyLockRemove();
};
const closePopupSubscribe = () => {
   popupStore.closePopup(popupStore.popupSubscribe);
   bodyLockRemove();
};
</script>
