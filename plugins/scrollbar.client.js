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
   Scrollbar.use(ModalPlugin, LockPlugin);
   return {
      provide: {
         Scrollbar,
         ScrollbarPlugin,
      },
   };
});
