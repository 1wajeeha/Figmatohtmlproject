const product = document.querySelector(".product");
const frames = document.querySelector(".frames");
const arrowBtns = document.querySelectorAll(".row2 i");
const firstframesWidth= product.querySelector(".frames").offsetWidth;
const productChildrens = [...product.children];


let isDragging =false,startX,startScrollLeft,timeoutId;


let framesPerView=Math.round(product.offsetWidth/firstframesWidth);

productChildrens.slice(-framesPerView).reverse().forEach (frames => {
product.insertAdjacentHTML("afterbegin",frames.outerHTML);
});

productChildrens.slice(0,framesPerView).forEach (frames => {
    product.insertAdjacentHTML("beforeend",frames.outerHTML);
    });

arrowBtns.forEach(btn =>
    {
btn.addEventListener("click",() =>
{

product.scrollLeft += btn.id === "left" ? -firstframesWidth : firstframesWidth;
});
    });

const dragStart =(e)=>
{
     isDragging =true;
     product.classList.add("dragging");
     startX = e.pageX;
     startScrollLeft = product.scrollLeft;
}
const dragging =(e)=>
{
    if (!isDragging) return; 
    product.scrollLeft  =  startScrollLeft - (e.pageX - startX);
}

const dragStop =()=>
{
     isDragging =false;
     product.classList.remove("dragging");
}

 const autoplay =()=>
{
    if (window.innerWidth < 800 || !autoplay) return; 
  timeoutId = setTimeout(
    () => (product.scrollLeft += product),
    2500
  );
};
autoplay();


const infiniteScroll=() =>
{
    if (product.scrollLeft === 0) {
        // console.log("u have reached the left end");


        product.classList.add("no-transition");
        product.scrollLeft=product.scrollWidth - (2*product.offsetWidth);
        
        product.classList.remove("no-transition");
    }
    else if (Math.ceil(product.scrollLeft) === product.scrollWidth - product.offsetWidth)
    {
        product.classList.add("no-transition");
        product.scrollLeft=product.offsetWidth ;   
        product.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    // if(!frames.matches(":hover"))autoplay();

}





product.addEventListener("mousedown",dragStart);
product.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
product.addEventListener("scroll",infiniteScroll);
frames.addEventListener("mouseenter",()=> clearTimeout(timeoutId));
frames.addEventListener("mouseleave",autoplay);





const allRatingContainers = document.querySelectorAll('.rating');
        
        allRatingContainers.forEach(ratingContainer => {
            const stars = ratingContainer.querySelectorAll('.fa-star');
            let rating = 0;

            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const starRating = parseInt(star.getAttribute('data-star'));
                    setRating(starRating);
                });
            });

            function setRating(starRating) {
                rating = starRating;
                updateStarsUI();
            }

            function updateStarsUI() {
                stars.forEach((star, index) => {
                    if (index < rating) {
                    
                        star.classList.add('rated');
                    } else {
                        
                        star.classList.remove('rated');
                    }
                });
            }
        });
        const productImage = document.getElementById('productImage');
        let isBackgroundChanged = false;
        
