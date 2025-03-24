function scrollToSection(targetElement, speed) {
  const { bodyScrollBar } = useScrollbar();
  if (targetElement) {
    const panelsSection = document.querySelector("#panels");
    const id = targetElement.getAttribute("id");
    const { innerHeight } = window;
    let pos;
    switch (id) {
      case "legend":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop);
        break;
      case "santal":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 2.07);
        break;
      case "protagonist":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 4.19);
        break;
      case "musk":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 6.32);
        break;
      case "essay":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 8.44);
        break;
      case "ethnos":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 10.57);
        break;
      case "erato":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 12.69);
        break;
      case "voice":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 14.82);
        break;
      case "velvet":
        pos = parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + innerHeight * 16.94);
        break;
      default:
        break;
    }
    // let previousItem = targetElement.previousElementSibling;
    // let arrHeight = [];
    // while (previousItem) {
    //   arrHeight.push(previousItem.offsetHeight);
    //   previousItem = previousItem.previousElementSibling;
    // }
    // let sum = arrHeight.reduce(function (a, b) {
    //   return a + b;
    // }, 0);
    // console.log(parseInt(panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop + sum));
    bodyScrollBar.scrollTo(0, pos, speed);
  }
}

export default scrollToSection;
