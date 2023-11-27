'use strict';

const ratings =  document.querySelectorAll('.rating');
// if(ratings.length > 0){
//    initRatings();
// }

//Main function
export function initRatings(){
   let ratingActive,ratingValue;
   for(let i = 0; i<ratings.length;i++){
   const rating = ratings[i];
   initRating(rating);
   }
//Initialize rating
   function initRating(rating){
    initRatingVars(rating);
    setRatingActiveWidth();
    if(rating.classList.contains('rating__set')){
      setRating(rating);
    }
   }
   //Init vars
   function initRatingVars(rating){
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
   }
   //Changing active width
   function setRatingActiveWidth(index = ratingValue.innerHTML){
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
   }
   //Possibility of point rating
   function  setRating (rating) {
   const ratingItems = rating.querySelectorAll('.rating__item');
   for(let i = 0; i<ratingItems.length;i++){
      const ratingItem = ratingItems[i];
      ratingItem.addEventListener('mouseenter',(e)=>{
         //Updating vars
         initRatingVars(rating);
         //Updating active start
         setRatingActiveWidth(ratingItem.value)
      });
      ratingItem.addEventListener('mouseleave',(e)=>{
        setRatingActiveWidth();
      });
      ratingItem.addEventListener('click',(e)=>{
         //Updating vars
          initRatingVars(rating);
          if(rating.dataset.ajax){
            //deploy 
            //setRatingvalue(ratingItem.value,rating);
          }else{
            //Visualize rating
            ratingValue.innerHTML = i + 1;
            setRatingActiveWidth();
          }
       });
   }
   }
}

//Initialize variables 
