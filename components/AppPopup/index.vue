<template lang="pug">
	.popup(:class="{ 'open-popup': isOpen }" @click="closePopup")
		.popup__wrapper 
			.popup__content(@click.stop)
				button(type="button" @click="closePopup").popup__close
				slot
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

<style lang="scss">
@use "assets/scss/vars" as *;
.popup {
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100dvh;
   background: rgba(#24221f, 0.2);
   opacity: 0;
   visibility: hidden;
   overflow-y: auto;
   overflow-x: hidden;
   transition: all 0.3s ease 0s;
   z-index: 50;
   pointer-events: none;
   &::-webkit-scrollbar {
      background: none;
      width: 0;
      height: 0;
   }
   &::-webkit-scrollbar-thumb,
   &::-webkit-scrollbar-track {
      background: none;
      width: 0;
      height: 0;
   }
   &.open-popup {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      & .popup__content {
         opacity: 1;
      }
   }
   &__wrapper {
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 16px;
      transition: all 0.5s ease 0s;
   }
   &__content {
      border-radius: 0px;
      max-width: 650px;
      min-height: 230px;
      background-color: var(--bg-white);
      width: 100%;
      padding: 72px 60px;
      position: relative;
      opacity: 0;
      transition: all $time * 2 ease 0s;
      .popup-politic & {
         max-width: 1000px;
      }
      @include bp-md {
         padding: 30px 15px;
         border-radius: 16px;
      }
   }
   &__close {
      position: absolute;
      top: 0;
      right: 0;
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      background-color: transparent;
      z-index: 2;
      &::before {
         content: "";
         display: block;
         width: 28px;
         height: 28px;
         mask-image: url("/images/icons/close.svg");
         mask-repeat: no-repeat;
         mask-position: center;
         background-color: var(--text-gray);
         mask-size: 18px 18px;
         transition: background-color 0.25s ease 0s;
      }
      @include hover {
         &:hover {
            cursor: pointer;
            &::before {
               background-color: var(--bg-smoke);
            }
         }
      }
   }
   &__body {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 20px;
      .popup-politic & {
         text-align: left;
      }
   }
   &__heading {
      display: flex;
      flex-direction: column;
      gap: 20px;
   }
   &__title {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 36px;
      line-height: 44px;
      text-transform: uppercase;
   }
   &__content {
      line-height: 22px;
   }
   & .btn {
      align-self: center;
      margin-top: 8px;
   }
}
</style>
