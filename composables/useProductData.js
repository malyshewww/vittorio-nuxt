import { useAsyncData } from "nuxt/app";

export const useProductData = (id) => {
   const runtimeConfig = useRuntimeConfig();
   const url = `${runtimeConfig.public.apiBase}/products/${id}?_format=json`;
   //    const { data, status, error } = useAsyncData(url, () => $fetch(url));
   const { data, error, status } = useAsyncData(
      url,
      async () => {
         const response = await $fetch(url);
         return response;
      },
      {
         transform: (res) => {
            const { data, breadcrumb } = res;
            // const options = [];
            // const newProductData = computed(() => {
            //    return data.map((item) => {
            //       options.push(item.field_top_notes);
            //       options.push(item.field_base_notes);
            //       options.push(item.field_heart_notes);
            //       options.push(item.field_fragrance_group);
            //       return {
            //          ...item,
            //          options,
            //       };
            //    });
            // });
            return {
               breadcrumb,
               product: data,
            };
         },
      }
   );
   return {
      data,
      status,
      error,
   };
};
