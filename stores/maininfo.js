import { defineStore } from "pinia";

export const useMainInfoStore = defineStore("maininfo", () => {
  const links = ref("");
  const menuMain = ref("");
  const menuProduct = ref("");
  const other = ref("");
  async function setData(response) {
    const { data } = response;
    try {
      links.value = data.site_info[0];
      menuMain.value = data.menu_main;
      menuProduct.value = data.menu_product;
      other.value = data.other;
    } catch (error) {
      throw new Error("error", error);
      // console.log("It's Error", error);
    }
  }
  return {
    setData,
    menuMain,
    menuProduct,
    links,
    other,
  };
});
