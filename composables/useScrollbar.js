import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

export const useScrollbar = () => {
   let bodyScrollBar;
   let scroller;
   scroller = document.querySelector(".scroller");
   if (scroller) {
      bodyScrollBar = Scrollbar.init(scroller, {
         damping: 0.1,
         delegateTo: scroller,
         alwaysShowTracks: true,
         renderByPixels: true,
         continuousScrolling: true,
         thumbMinSize: 20,
         syncCallbacks: true,
      });
   }
   return { bodyScrollBar, scroller };
};

export default useScrollbar;
