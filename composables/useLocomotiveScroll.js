import { ref, onMounted, onBeforeUnmount } from "vue";
import LocomotiveScroll from "locomotive-scroll";

export const useLocomotiveScroll = (scroller) => {
   const scrollInstance = ref(null);
   onMounted(() => {
      if (typeof window !== "undefined") {
         // Ensure the code runs only on the client-side
         scrollInstance.value = new LocomotiveScroll({
            // el: scroller,
            smooth: true,
            // Add other options as needed
         });
      }
   });
   onUnmounted(() => {
      if (scrollInstance.value) {
         scrollInstance.value.destroy();
      }
   });

   return { scrollInstance };
};
