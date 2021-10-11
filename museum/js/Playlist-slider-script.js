const vidLeftBtn = document.querySelector(".video-slider-left");
const vidRightBtn = document.querySelector(".video-slider-right");
const vidViewWindow = document.querySelector(".video-slider");
const vidSlider = document.querySelector('.video-sliding');
const vidSliderLen = document.querySelectorAll(".video-placeholder").length
const vidSlideList = document.querySelectorAll("iframe")
const vidSlide = document.querySelector('.video-placeholder')
const vidMarkerList = document.querySelectorAll(".video-slider-marker");
const vidViewWidth = vidViewWindow.clientWidth;



let vidActiveMarker = vidMarkerList[0]
vidActiveMarker.style.backgroundColor = '#333333'
let vidActiveSlide = 0
vidLeftBtn.addEventListener('click', () => {
    vidSwitchSlides('left')
    })
    
vidRightBtn.addEventListener('click', () => {
       vidSwitchSlides('right')
        })

    vidSlideList.forEach((sl) => sl.addEventListener('click', () =>{
        alert('here it is')
        }))

        function vidSwitchSlides(direction){
            /*vidSlider.classList.add('visual-transition')*/
           
            if (direction === "left"){
                vidActiveSlide ++
                if(vidActiveSlide > 0 ) {
                    vidActiveSlide = -2
                }
            }
            
            if (direction === "right"){
               vidActiveSlide --
              if (vidActiveSlide <  -2) {
                vidActiveSlide = 0
            }
            }

            vidSlider.style.transform = `translateX(${vidActiveSlide * 497 }px)`
            vidActiveMarker.style.backgroundColor = '#333333'
        }
 function stopIframe(el){
 let contElem = el;
 let ifr = el.querySelector('iframe')
 let ifrVid = el.querySelector('video')
 if ( ifr) {
    let ifrSrc = ifr.src;
    ifr.src = ifrSrc; 
}
if ( ifrVid) {
    ifrVid.pause();
}
 }