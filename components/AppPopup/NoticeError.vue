<template lang="pug">
	Teleport(to="body")
		AppPopup(class="popup-notice" :is-open="isOpen" @close-popup="closePopup" :popup-key="popupKey")
			.popup__body
				.popup__heading
					.popup__title Форма Не может быть отправлена
					.popup__sub-title Пожалуйста, проверьте корректность введенных данных и отправьте форму еще раз
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  popupKey: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const emit = defineEmits(["closePopup"]);

// eslint-disable-next-line
const closePopup = () => {
  emit("closePopup", props.popupKey);
};
</script>

<style lang="scss"></style>
