<template lang="pug">
	Teleport(to="body")
		AppPopup(class="popup-notice" :is-open="isOpen" @close-popup="closePopup" :popup-key="popupKey")
			.popup__body
				.popup__heading
					.popup__title Форма успешно отправлена
					.popup__sub-title В ближайшее время с Вами свяжется менеджер
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
