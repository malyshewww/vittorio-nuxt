<template lang="pug">
	Teleport(to="body")
		AppPopup(class="popup-subscribe" :is-open="isOpen" @close-popup="closePopup" :popup-key)
			.popup__body
				.popup__heading
					.popup__title Спасибо за подписку!
					.popup__sub-title На Ваш e-mail отправлено письмо с дальнейшими инструкциями
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
