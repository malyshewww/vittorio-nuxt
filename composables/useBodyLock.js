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
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    bodyScrollBar.updatePluginOptions("lock", { lock: true });
    bodyScrollBar.track.yAxis.hide();
  } else {
    const body = document.querySelector("body");
    const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    const lockPadding = document.querySelectorAll(".lock-padding");
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.marginRight = lockPaddingValue;
      }
    }
    body.style.marginRight = lockPaddingValue;
    body.classList.add("lock");
  }
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, delay);
}
export function bodyLockRemove(delay = 1000) {
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    setTimeout(function () {
      bodyScrollBar.updatePluginOptions("lock", { lock: false });
      bodyScrollBar.track.yAxis.show();
    }, delay);
  } else {
    const body = document.querySelector("body");
    const lockPadding = document.querySelectorAll(".lock-padding");
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.marginRight = "0px";
        }
      }
      body.style.marginRight = "0px";
      body.classList.remove("lock");
    }, delay);
  }
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, delay);
}
