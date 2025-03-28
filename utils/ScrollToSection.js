function scrollToSection(targetElement, speed) {
  const { bodyScrollBar } = useScrollbar();
  if (!targetElement || !bodyScrollBar) return;
  const panelsSection = document.querySelector("#panels");
  if (!panelsSection) return;
  const id = targetElement.getAttribute("id");
  const { innerHeight } = window;
  const basePosition = panelsSection.getBoundingClientRect().top + bodyScrollBar.scrollTop;
  // Карта соответствия id и множителей высоты
  const positionMultipliers = {
    legend: 0,
    santal: 2.07,
    protagonist: 4.19,
    musk: 6.32,
    essay: 8.44,
    ethnos: 10.57,
    erato: 12.69,
    voice: 14.82,
    velvet: 16.94,
  };
  const multiplier = positionMultipliers[id];
  if (multiplier === undefined) return;
  const position = parseInt(basePosition + innerHeight * multiplier);
  bodyScrollBar.scrollTo(0, position, speed);
}

export default scrollToSection;
