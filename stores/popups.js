export const usePopupStore = defineStore("popup", () => {
   const popupNotice = reactive({
      isOpen: false,
   });
   const popupNoticeError = reactive({
      isOpen: false,
   });
   const popupOrderSuccess = reactive({
      isOpen: false,
   });
   const popupPolitic = reactive({
      isOpen: false,
   });
   const popupSubscribe = reactive({
      isOpen: false,
   });
   const openPopup = (popup) => {
      popup.isOpen = true;
   };
   const closePopup = (popup) => {
      popup.isOpen = false;
   };
   return {
      popupNotice,
      popupNoticeError,
      popupOrderSuccess,
      popupPolitic,
      popupSubscribe,
      openPopup,
      closePopup,
   };
});
