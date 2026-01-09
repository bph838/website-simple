
/**
 * Smoothly scrolls the page to the specified element, accounting for a fixed navbar height.
 *
 * @param {HTMLElement} element - The target DOM element to scroll to.
 */

export function scrollToElement(element) {
  const header = document.querySelector(".navbar");
  const offset = header?.offsetHeight || 0;

  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
  console.log(`scrollToElement ${y}`);

  window.scrollTo({
    top: Math.max(0, y),
    behavior: "smooth",
  });
}


