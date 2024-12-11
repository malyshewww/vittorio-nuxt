//function for lock/unlock scroll
let delay = 1000;
let unlock = true;
export function bodyLock(isLock, delay) {
   if (isLock) {
      bodyLockAdd(delay);
   } else {
      bodyLockRemove(delay);
   }
}
export function bodyLockAdd(delay = 1000) {
   const { bodyScrollBar } = useScrollbar();
   bodyScrollBar.updatePluginOptions("lock", { lock: true });
   bodyScrollBar.track.yAxis.hide();
   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, delay);
}
export function bodyLockRemove(delay = 1000) {
   const { bodyScrollBar } = useScrollbar();
   setTimeout(function () {
      bodyScrollBar.updatePluginOptions("lock", { lock: false });
   }, delay);
   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, delay);
}
