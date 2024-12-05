<template lang="pug">
	.breadcrumbs 
		.container
			nav.breadcrumbs__body
				ul.breadcrumbs__list
					li.breadcrumbs__item(v-for="item, index in list")
						nuxt-link(:to="item.path" :class="{ disabled: index === list.length - 1 }").breadcrumbs__link {{item.title}}
</template>

<script setup>
defineProps({
   list: {
      type: Array,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
// @import "../assets/scss/mixins.scss";
.breadcrumbs {
   margin-bottom: 20px;
   &__list {
      @include reset-list;
      display: flex;
      align-items: center;
      gap: 12px;
   }
   &__item {
      position: relative;
      & + & {
         padding-left: 12px;
         &::before {
            content: "";
            display: block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: currentColor;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            left: 0;
         }
      }
   }
   &__link {
      font-size: 14px;
      line-height: 18px;
   }
   //    &__item {
   //       @media screen and (max-width: $xl) {
   //          &:not(:last-child) {
   //             display: none;
   //          }
   //       }
   //    }
   //    &__link {
   //       display: grid;
   //       place-items: center;
   //       text-align: center;
   //       gap: 12px;
   //       padding: 3px 15px;
   //       min-height: 27px;
   //       border: 1px solid var(--bg-gray);
   //       border-radius: 100px;
   //       font-size: 14px;
   //       line-height: 130%;
   //       color: var(--text-gray);
   //       transition: border-color $time ease 0s, color $time ease 0s;
   //       &.disabled {
   //          background-color: var(--bg-white-dirt);
   //          color: var(--text-midnight-100);
   //          border-color: transparent;
   //          pointer-events: none;
   //       }
   //       @media (any-hover: hover) {
   //          &:hover {
   //             border-color: var(--text-gray);
   //             color: var(--text-midnight-100);
   //          }
   //       }
   //    }
}
</style>
