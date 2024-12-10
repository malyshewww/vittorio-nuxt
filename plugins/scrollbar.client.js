import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

export default defineNuxtPlugin(() => {
   class ModalPlugin extends ScrollbarPlugin {
      static pluginName = "modal";
      static defaultOptions = {
         open: false,
      };
      transformDelta(delta) {
         return this.options.open ? { x: 0, y: 0 } : delta;
      }
   }
   class LockPlugin extends ScrollbarPlugin {
      static pluginName = "lock";
      static defaultOptions = {
         lock: false,
      };
      transformDelta(delta) {
         return this.options.lock ? { x: 0, y: 0 } : delta;
      }
   }
   class AnchorPlugin extends ScrollbarPlugin {
      static pluginName = "anchor";
      onHashChange = () => {
         this.jumpToHash(window.location.hash);
      };
      onClick = (event) => {
         const { target } = event;
         if (target.tagName !== "A") {
            return;
         }
         const hash = target.getAttribute("href").replace("/", "");
         if (!hash || hash.charAt(0) !== "#") {
            return;
         }
         this.jumpToHash(hash);
      };
      jumpToHash = (hash) => {
         // console.log("hash:", hash);
         const { scrollbar } = this;
         let offset = 0;
         let itemY = 0;
         if (!hash) {
            // console.log("not hash sale");
            return;
         }
         if (hash == "#sale") {
            // console.log("sale");
            itemY =
               scrollbar.offset.y +
               document.querySelector(hash)?.getBoundingClientRect().top;
            // scrollbar.scrollTop;
            // scrollbar.offset.y - document.querySelector(hash).clientHeight;
            // scrollbar.setMomentum(0, -scrollbar.scrollTop);
            // console.log("hash sale");
         }
         // else {
         //    console.log("scrollTop:", scrollbar.containerEl.scrollTop);
         //    scrollbar.scrollIntoView(document?.querySelector(hash), {
         //       offsetTop: -scrollbar.containerEl.scrollTop - 100,
         //    });
         //    scrollbar.containerEl.scrollTop = 0;
         // }
         // // reset scrollTop
         // scrollbar.containerEl.scrollTop = 0;
         if (document?.querySelector(hash).getBoundingClientRect().top > 0) {
            if (
               window
                  .getComputedStyle(document?.querySelector(hash), null)
                  .paddingTop.replace("px", "") < 100
            ) {
               // window.scrollTo(0, itemY - offset);
               scrollbar.scrollTo(0, itemY - offset, 600);
            } else {
               // window.scrollTo(0, itemY + offset);
               scrollbar.scrollTo(0, itemY + offset, 600);
            }
         } else {
            if (
               window
                  .getComputedStyle(document?.querySelector(hash), null)
                  .paddingTop.replace("px", "") < 100
            ) {
               // window.scrollTo(0, itemY - headerHeight - offset);
               scrollbar.scrollTo(0, itemY - offset, 600);
            } else {
               // window.scrollTo(0, itemY - headerHeight + offset);
               scrollbar.scrollTo(0, itemY + offset, 600);
            }
         }
      };
      onInit() {
         this.jumpToHash(window.location.hash);
         window.addEventListener("hashchange", this.onHashChange);
         this.scrollbar.contentEl.addEventListener("click", this.onClick);
      }
      onDestory() {
         window.removeEventListener("hashchange", this.onHashChange);
         this.scrollbar.contentEl.removeEventListener("click", this.onClick);
      }
   }
   Scrollbar.use(ModalPlugin, LockPlugin);
   return {
      provide: {
         Scrollbar,
         ScrollbarPlugin,
      },
   };
});
