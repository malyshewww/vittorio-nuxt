export const useOrderStore = defineStore("order", () => {
   const formData = reactive({
      email: "",
      name: "",
      phone: "",
      address: "",
      mailing: 0,
      agree: 0,
   });
   const model = reactive({
      name: {
         val: "",
      },
      phone: {
         val: "",
      },
      email: {
         val: "",
      },
      address: {
         val: "",
      },
      mailing: {
         val: 0,
      },
      agree: {
         val: 0,
      },
   });
   const formStatus = reactive({
      name: {
         isValid: true,
         message: "",
      },
      phone: {
         isValid: true,
         message: "",
      },
      email: {
         isValid: true,
         message: "",
      },
      address: {
         isValid: true,
         message: "",
      },
      agree: {
         isValid: true,
         message: "",
      },
      mailing: {
         isValid: true,
         message: "",
      },
   });
   return {
      formData,
      model,
      formStatus,
   };
});
