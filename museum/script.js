//Welcome Slider vars
const leftBtn = document.querySelector(".slider-button-left");
const rightBtn = document.querySelector(".slider-button-right");
const viewWindow = document.querySelector(".welcome-slider-viewer");
const slider = document.querySelector(".welcome-slider");
const sliderLen = slider.querySelectorAll(".welcome-slider-image").length;
const markerList = document.querySelectorAll(".slider-marker");
const counter = document.querySelector(".slider-counter");
const viewWidth = viewWindow.clientWidth;
//Ticket form vars
const ticketOpen = document.querySelector('.buy');
const ticketClose = document.querySelector('.exitbtn');
const ticketForm = document.querySelector('.ticket-form');
const overLay = document.querySelector('.overlay');
//Burger button vars
const burgerBtn = document.querySelector('.burger-button');
const topNav = document.querySelector('.head-nav');
const menuLinks = document.querySelectorAll('.menu-link');
//Video-player vars
let video = document.querySelector(".vid");
const player = document.querySelector('.player');
const progressAll = document.querySelectorAll('.progress');
const bigPlayBtn = document.querySelector(".big-play-icon");
const playBtn = document.querySelector(".play-button");
const progressBar = document.querySelector(".progress-bar");
const volumeBtn = document.querySelector(".volume-button");
const volumeBar = document.querySelector(".volume-bar");
const fullScrBtn = document.querySelector(".fullscreen-button");

/*let vidLoadProgUpdate = function(){
  let video = document.querySelector(".vid")
  alert (video.duration)
  progressBar.setAttribute("max", video.duration);
  }
vidLoadProgUpdate()*/
//Explore comparison sllider vars

//Welcome Slider 

activeMarker = markerList[0]
activeMarker.style.backgroundColor = '#9D8665'
let activeSlide = 0

window.addEventListener('resize', () =>{
 slider.style.left = `-${viewWindow.offsetWidth}px` /*-1000px*/  

})
slider.style.left = `-${viewWindow.offsetWidth}px` /*-1000px*/

leftBtn.addEventListener('click', () => {
switchSlides('left')
})

rightBtn.addEventListener('click', () => {
    switchSlides('right')
    })


slider.addEventListener('transitionend', CheckI)

//Ticket Form

ticketOpen.addEventListener('click', () =>{
closeTicketForm()
})

ticketClose.addEventListener('click', () =>{
closeTicketForm()    
})
overLay.addEventListener('click', () => {
    closeTicketForm()
})


// Burger button
burgerBtn.addEventListener('click', () =>{
burgerBtn.classList.toggle('cross')
topNav.classList.toggle('hide-menu')    
})
menuLinks.forEach((el) => el.addEventListener('click', () =>{
    burgerBtn.classList.toggle('cross')
    topNav.classList.toggle('hide-menu')    
    }  
))
document.addEventListener('click', function(e) {
    if(!e.target.classList.contains('head-nav') && !e.target.classList.contains('burger-button')  && !e.target.classList.contains('social-pics')){
        burgerBtn.classList.remove('cross')
        topNav.classList.add('hide-menu')  
    }
})





/*markerList.forEach((el) => el.addEventListener('click', (e) => {
activeMarker.style.backgroundColor = 'white'
activeMarker = e.target
console.log(markerList.findIndex((el) => {if (el === activeMarker) {return el}}))
activeMarker.style.backgroundColor = '#9D8665'
/*activeSlide = (-markerList.indexOf(e.target))
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
}))*/

function switchSlides(direction){
slider.classList.add('visual-transition')

if (direction === "left"){
    activeSlide ++
    
}

if (direction === "right"){
    activeSlide --
    
}

slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
activeMarker.style.backgroundColor = '#9D8665'



}


function  CheckI(){
slider.classList.remove('visual-transition')
if(activeSlide > 0 ){
    activeMarker.style.backgroundColor = 'white'
    activeSlide = -4
    activeMarker = markerList[4]
    counter.textContent = `0${-activeSlide}`
    activeMarker.style.backgroundColor = '#9D8665'
    slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
    
} else if(activeSlide < -4 ){
activeMarker.style.backgroundColor = 'white'
activeSlide = 0
activeMarker = markerList[0]
counter.textContent = `0${-activeSlide +1}`
activeMarker.style.backgroundColor = '#9D8665'
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
} else {
    counter.textContent = `0${-activeSlide +1}`
    activeMarker.style.backgroundColor = 'white'
    activeMarker = markerList[-activeSlide]
    activeMarker.style.backgroundColor = '#9D8665'
}
}

function closeTicketForm () {
ticketForm.classList.toggle('hide-left')  
overLay.classList.toggle('hidden')  
} 
function detectSwipe(e){
let surface = e;
let startX = 0
let distX = 0;

surface.addEventListener('mousedown', function(e) {
    startX = e.offsetX;
})
surface.addEventListener('mouseup', function(e) {
    distX = e.offsetX
    if(distX > startX){
        switchSlides('left')
    } else {
        switchSlides('right')
    }
})
}
detectSwipe(viewWindow)


//Custom video listeners and functions




let currentVol = video.volume;


function togglePlay() {
  progressBar.setAttribute("max", video.duration)
    if (video.paused) {
      video.play();
      bigPlayBtn.setAttribute("hidden", true);
      playBtn.innerHTML = '<img src="assets/svg/pause.svg" alt="pause-button">';
    } else {
      video.pause();
      bigPlayBtn.removeAttribute("hidden");
      playBtn.innerHTML =
        '<img src="assets/svg/play-button.svg" alt="play-button">';
    }
  }
  

  function updateProgress() {
    progressBar.value = video.currentTime;
  }
  
  function updateVid() {
    video.currentTime = progressBar.value;
  }
  
  function volumeUpdate() {
    console.log(volumeBar.value);
    video.volume = volumeBar.value;
    currentVol = video.volume;
    
  }

  function updateVolBtn() {
    volumeBar.value = video.volume;
    if (video.volume > 0) {
      volumeBtn.innerHTML =
        '<img src="assets/svg/volume-button.svg" alt="volume-button">';
    } else {
      volumeBtn.innerHTML = '<img src="assets/svg/mute.svg" alt="mute-button">';
    }
    }
  
    function muteVid() {
        if (video.volume > 0) {
          video.volume = 0;
          volumeBar.value = 0;
          volumeBtn.innerHTML = '<img src="assets/svg/mute.svg" alt="mute-button">';
        } else {
          video.volume = currentVol;
          volumeBar.value = currentVol;
          volumeBtn.innerHTML =
            '<img src="assets/svg/volume-button.svg" alt="volume-button">';
        }
      }
      
      function toggleFlScr() {
        console.log("press");
        if (!document.fullscreenElement) {
          player.requestFullscreen();
          fullScrBtn.innerHTML =
            '<img src="assets/svg/fullscreen_exit.svg" alt="fullscreen-exit-button">';
        } else {
          document.exitFullscreen();
          fullScrBtn.innerHTML =
            '<img src="assets/svg/Fullscreen-icon.svg" alt="fullscreen-button">';
        }
      }

      function changePlayBackRate(direction) {
  
        if (direction === "speed-up") {
          video.playbackRate -= 0.25;
          
      
        }
        if (direction === "slow-down") {
          video.playbackRate += 0.25;
          
        }
        if (video.playbackRate < 0.25 || video.playbackRate > 2) {
          video.playbackRate = 1;
        }
        
      }
     
      /* function updRangeBG (elem){
          const value = elem.value;
          this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
      }

      // Video Player Event Listeners

      progressAll.forEach((el) => el.addEventListener('input', (e) => updRangeBG(e.target)    
      ))*/


      document.addEventListener("keypress", (e) => {
        if (e.code === "Space") {
          togglePlay();
        }
        if (e.key === "m" || e.key === "M") {
          muteVid();
        }
        if (e.key === "<") {
          changePlayBackRate("speed-up");
        }
        if (e.key === ">") {
          changePlayBackRate("slow-down");
        }
        if (e.key === "f" || e.key === "F") {
          toggleFlScr();
        }
        
      });
 video.addEventListener("volumechange", updateVolBtn);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
playBtn.addEventListener("click", togglePlay);

bigPlayBtn.addEventListener("click", togglePlay);
volumeBtn.addEventListener("click", muteVid);
volumeBar.addEventListener("mousemove", volumeUpdate);

progressBar.addEventListener("mouseup", updateVid);


fullScrBtn.addEventListener("click", toggleFlScr);

//Explore comparison Listeeners and functions
const expSlider = document.querySelector('.comparison-slider')
const comparedImg = document.querySelector('.sliding-image')

expSlider.addEventListener('input', function(){
  comparedImg.style.width = this.value + "%"
})