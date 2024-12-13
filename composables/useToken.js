const useToken = () => {
   if (process.client) {
      if (!localStorage.getItem("cartToken")) {
         localStorage.setItem(
            "cartToken",
            Math.random().toString(36).substr(2)
         );
      }
      const cartToken = localStorage.getItem("cartToken");
      return cartToken;
   }
};

export default useToken;
