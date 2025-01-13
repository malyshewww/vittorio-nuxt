export const useOrderStore = defineStore("order", () => {
  const formData = reactive({
    email: "",
    name: "",
    phone: "",
    address: "",
    mailing: false,
    agree: false,
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
      val: false,
    },
    agree: {
      val: false,
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
