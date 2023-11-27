const iconMenu = document.querySelector(".icon__menu");
const menuBody = document.querySelector(".menu__body");
export const openMenu = () => {
  if (iconMenu) {
    iconMenu.addEventListener("click", () => {
      document.body.classList.toggle("lock");
      iconMenu.classList.toggle("active");
      menuBody.classList.toggle("active");
    });
  }
};
