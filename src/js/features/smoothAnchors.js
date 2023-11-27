export const smoothScrollTo = () => {
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = anchor.getAttribute("href");
      document.querySelector(String(sectionId)).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
};
