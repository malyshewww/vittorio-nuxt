function scrollToAnchor(target) {
  if (window.innerWidth > 1024) {
    const { bodyScrollBar } = useScrollbar();
    const href = target?.getAttribute("href");
    if (href.includes("#")) {
      const id = href.replace("/#", "");
      const targetElement = document.getElementById(id);
      useRouter().push({ path: "/", query: { anchor: id } });
      if (targetElement) {
        const scrollToPosition = () => {
          const targetElementPosition = targetElement.getBoundingClientRect().top + bodyScrollBar.scrollTop - 10;
          bodyScrollBar.scrollTo(0, targetElementPosition, 500);
        };
        requestAnimationFrame(() => {
          setTimeout(scrollToPosition, 1200);
        });
      }
    }
  }
}

export default scrollToAnchor;
