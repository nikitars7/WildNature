const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll('a[href*="#"]');
const titles = document.querySelectorAll(".block-header__title");
export const sectionInterObserver = () => {
  const callBack = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        links.forEach((link) => link.classList.remove("active"));
        const activeId = entry.target.id;
        const activeLink = document.querySelector(`a[href="#${activeId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  const sectionObserver = new IntersectionObserver(callBack, {
    threshold: [0.3, 0.5, 0.8],
  });
  sections.forEach((s) => sectionObserver.observe(s));
};

export const isTitleAnimated = () => {
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  };
  const titleObserver = new IntersectionObserver(callback, {
    threshold: [1, 0.8, 0.7],
  });
  titles.forEach((s) => titleObserver.observe(s));
};
