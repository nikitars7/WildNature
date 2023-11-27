"use strict";
export const spoilerInit = () => {
  const spoilersArray = document.querySelectorAll("[data-spollers]");
  const spoilerItems = document.querySelectorAll('.spollers-questions__item');
  if (spoilersArray.length > 0) {
    // Получение обычных слайдеров
    const spoilersRegular = Array.from(spoilersArray).filter(function (
      item,
      index,
      self
    ) {
      return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных спойлеров
    if (spoilersRegular.length > 0) {
      initSpoilers(spoilersRegular);
    }
    // Получение спойлеров с медиа запросами
    const spoilersMedia = Array.from(spoilersArray).filter(function (
      item,
      index,
      self
    ) {
      return item.dataset.spollers.split(",")[0];
    });

    // Инициализация спойлеров с медиа запросами
    if (spoilersMedia.length > 0) {
      const breakpointsArray = [];
      spoilersMedia.forEach((item) => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
        return (
          "(" +
          item.type +
          "-width: " +
          item.value +
          "px)," +
          item.value +
          "," +
          item.type
        );
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        // Объекты с нужными условиями
        const spoilersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        // Событие
        matchMedia.addListener(function () {
          initSpoilers(spoilersArray, matchMedia);
        });
        initSpoilers(spoilersArray, matchMedia);
      });
    }
    // Initialization
    function initSpoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach((spoilersBlock) => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
        if (matchMedia.matches || !matchMedia) {
          spoilersBlock.classList.add("_init");
          initSpoilerBody(spoilersBlock);
          spoilersBlock.addEventListener("click", setSpoilerAction);
        } else {
          spoilersBlock.classList.remove("_init");
          initSpoilerBody(spoilersBlock, false);
          spoilersBlock.removeEventListener("click", setSpoilerAction);
        }
      });
    }
    // Работа с контентом
    function initSpoilerBody(spoilersBlock, hideSpoilersBody = true) {
      const spoilersTitles = spoilersBlock.querySelectorAll("[data-spoller]");
      if (spoilersTitles.length > 0) {
        spoilersTitles.forEach((spoilersTitle) => {
          if (hideSpoilersBody) {
            spoilersTitle.removeAttribute("tabindex");
            if (!spoilersTitle.classList.contains("_active")) {
              spoilersTitle.nextElementSibling.hidden = true;
            }
          } else {
            spoilersTitle.setAttribute("tabindex", "-1");
            spoilersTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpoilerAction(e) {
      const el = e.target;
      if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
        const spoilersTitle = el.hasAttribute("data-spoller")
          ? el
          : el.closest("[data-spoller]");
        const spoilersBlock = spoilersTitle.closest("[data-spollers]");
        const oneSpoiler = spoilersBlock.hasAttribute("data-one-spoller")
          ? true
          : false;
        if (!spoilersBlock.querySelectorAll("._slide").length) {
          if (oneSpoiler && !spoilersTitle.classList.contains("_active")) {
            hideSpoilersBody(spoilersBlock);
          }
          spoilersTitle.classList.toggle("_active");
          _slideToggle(spoilersTitle.nextElementSibling, 500);
        }
        e.preventDefault();
      }
    }
    function hideSpoilersBody(spoilersBlock) {
      const spoilerActiveTitle = spoilersBlock.querySelector(
        "[data-spoller]._active"
      );
      if (spoilerActiveTitle) {
        spoilerActiveTitle.classList.remove("_active");
        _slideUp(spoilerActiveTitle.nextElementSibling, 500);
      }
    }
  }
  //addOpenClass
 const addOpenClass = () => {
  spoilerItems.forEach(item =>
    item.addEventListener('click',(e)=> {
      item.classList.toggle('open')
    }))
 }
addOpenClass();
  //slide

  let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height , margin , padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = target.offsetHeight + "px";
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };

  let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height , margin , padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
};

/*Для родителя слайдеров пишем атрибут data-spoilers
Для заголовков спойлеров пишем атрибут data-spoiler
Если нужно включать выключать работу слайдеров на разных размеров экранов пишем параметры ширины и типы брейкпоинта. 
Например :
data-spoilers ="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spoilers ="768,min" - спойлеры будут работать только на экранах больше или равно 768px

если нужно чтобы в блоке открывался только один сполер добавляет атрибут data-one-spoiler






*/
