import Swiper from "swiper";
import {Navigation} from 'swiper/modules';
export const swiper = () => {
  if (document.querySelector('.hero__slider')) {
    new Swiper('.hero__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides:true,
      // autoHeight: true,
      speed: 800,
      // pagination: {
      //   el: '.reviews__bullets',
      //   clickable: true,
      // },
      navigation: {
        prevEl: '.hero__arrow--left',
        nextEl: '.hero__arrow--right',
      },
    })
  }
}