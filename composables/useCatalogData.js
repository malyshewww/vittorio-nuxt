import { useAsyncData } from "nuxt/app";

export const useCatalogData = () => {
   const runtimeConfig = useRuntimeConfig();
   const url = `${runtimeConfig.public.apiBase}/products?_format=json`;
   //    const { data, status, error } = useAsyncData(url, () => $fetch(url));
   const { data, error, status } = useAsyncData(
      url,
      async () => {
         const response = await $fetch(url);
         return response;
      },
      {
         transform: (res) => {
            const { data, breadcrumb, links, meta, metatag, text } = res;
            return {
               breadcrumb,
               products: data,
               text,
               metatag,
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
