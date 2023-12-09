import { openMenu } from './features/burger.js';
import {useDynamicAdapt} from './features/dynamicAdapt.js';
import { smoothScrollTo } from './features/smoothAnchors.js';
import { isTitleAnimated, sectionInterObserver } from './features/sectionObserver.js';
import { swiper} from './features/swiper.js';
import { initRatings } from './features/rating.js';
// import { spoilerInit } from './features/spoiler.js';
import { scrollHeader } from './features/headerScroll.js';
import * as ndevFunctions from './modules/functions.js';
// import { ibg } from './features/ibg.js';

ndevFunctions.isWebp();


openMenu();
scrollHeader();
useDynamicAdapt();
smoothScrollTo();
isTitleAnimated();
sectionInterObserver();
swiper();
// ibg();
initRatings();
// spoilerInit();


