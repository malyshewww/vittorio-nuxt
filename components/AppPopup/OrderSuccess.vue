<template lang="pug">
	Teleport(to="body")
		AppPopup(class="popup-order" :is-open="isOpen" @close-popup="closePopup" :popup-key="popupKey")
			.popup__body
				.popup__heading
					.popup__title Заказ успешно оформлен
					.popup__sub-title В ближайшее время с Вами свяжется менеджер для уточнения деталей заказа
				UiButtonPrimary(title="Закрыть" @button-action="closePopup")
</template>

<script setup>
const props = defineProps({
   isOpen: {
      type: Boolean,
      required: true,
   },
   popupKey: {
      required: true,
   },
});

const emit = defineEmits(["closePopup"]);
// eslint-disable-next-line
const closePopup = () => {
   emit("closePopup", props.popupKey);
};
</script>

<style lang="scss"></style>
