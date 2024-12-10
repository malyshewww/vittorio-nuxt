import { defineStore } from "pinia";

export const useMainInfoStore = defineStore("maininfo", () => {
   const links = ref("");
   const menuMain = ref("");
   const menuProduct = ref("");
   //    Reactive not working???
   //    const state = reactive({
   //       menuMain: [],
   //       menuProduct: [],
   //       links: "",
   //    });
   async function setData(response) {
      const { data } = response;
      try {
         links.value = data.site_info[0];
         menuMain.value = data.menu_main;
         menuProduct.value = data.menu_product;
      } catch (error) {
         console.log("Oh my Error", error);
      }
   }
   return {
      setData,
      menuMain,
      menuProduct,
      links,
   };
});
