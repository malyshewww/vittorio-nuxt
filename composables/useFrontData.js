import { useAsyncData } from "nuxt/app";

export const useFrontData = () => {
   const runtimeConfig = useRuntimeConfig();
   const url = `${runtimeConfig.public.apiBase}/wsapi/packs/front?_format=json`;
   //    const { data, status, error } = useAsyncData(url, () => $fetch(url));
   const { data, error, status } = useAsyncData(
      url,
      async () => {
         const response = await $fetch(url);
         return response;
      },
      {
         transform: (res) => {
            const { data, links, meta, metatag } = res;
            const countries = computed(() => {
               return data.country_front.map((item) => {
                  const arrTitle = item.title.split(" ");
                  return {
                     ...item,
                     key: arrTitle[0].trim().toLowerCase(),
                  };
               });
            });
            const products = computed(() => {
               return data.product_front.map((item) => {
                  const arrTitle = item.title.split(" ");
                  return {
                     ...item,
                     key: arrTitle[0].trim().toLowerCase(),
                  };
               });
            });
            return {
               countries,
               products,
               text: data.text_front[0],
            };
         },
      }
   );
   //    const processedData = ref(null);
   //    watch(rawData, (newData) => {
   //       if (newData.value) {
   //          // Пример обработки данных
   //          processedData.value = newData.value.map((item) => ({
   //             id: item.id,
   //             name: item.name.toUpperCase(),
   //          }));
   //       }
   //    });
   return {
      data,
      status,
      error,
   };
};
