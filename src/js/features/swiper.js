import Swiper from "swiper";
import {Navigation,Controller,Parallax} from 'swiper/modules';
export const swiper = () => {
  if (document.querySelector('.hero__slider')) {
   const mainSlider = new Swiper('.hero__slider', {
      modules: [Navigation,Controller,Parallax],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      parallax:true,
      spaceBetween: 30,
      loop:true,
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
      on:{
        init:(slider)=>{
          slider.slides.forEach(slide => {
            const imageSrc = slide.querySelector('.slide-hero__image').getAttribute('src');
            const topImage = `
            <div class="slide-hero__top-image">
            <img src=${imageSrc} alt="sliderimg">
          </div>
            `;
            const slideContent = slide.querySelector('.slide-hero__content');
            slideContent.insertAdjacentHTML('beforeend',topImage)
          })
        }
      }
    })
  //  const miniSwiper =  new Swiper('.hero__mini-slider', {
  //     modules: [Navigation,Controller],
  //     observer: true,
  //     observeParents: true,
  //     slidesPerView: 1,
  //     spaceBetween: 20,
  //     slideToClickedSlide:true,
  //     loop:true,
  //     loopAdditionalSlides:10,
  //     centeredSlides:true,
  //     // autoHeight: true,
  //     speed: 800,
  //     // pagination: {
  //     //   el: '.reviews__bullets',
  //     //   clickable: true,
  //     // },
  //     // navigation: {
  //     //   prevEl: '.hero__arrow--left',
  //     //   nextEl: '.hero__arrow--right',
  //     // },
  //     on:{
  //       init:(slider)=>{
  //         slider.slides.forEach(slide => {
  //           const imageSrc = slide.querySelector('.slide-hero__image').getAttribute('src');
  //           const topImage = `
  //           <div class="slide-hero__top-image">
  //           <img src=${imageSrc} alt="sliderimg">
  //         </div>
  //           `
  //           slide.insertAdjacentHTML('beforeend',topImage)
  //         })
  //       }
  //     }
  //   })
    // mainSlider.controller.control = miniSwiper; // привязка слайдеров
    // miniSwiper.controller.control = mainSlider;
  }
  const quoteSlider =  new Swiper('.quote-contacts__slider', {
    modules: [Navigation],
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    slideToClickedSlide:true,
    // loop:true,
    // loopAdditionalSlides:10,
    centeredSlides:true,
    // autoHeight: true,
    speed: 800,
    // pagination: {
    //   el: '.reviews__bullets',
    //   clickable: true,
    // },
    navigation: {
      prevEl: '.quote__arrow--left',
      nextEl: '.quote__arrow--right',
    },
  })
}
