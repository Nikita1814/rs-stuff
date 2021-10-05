const leftBtn = document.querySelector(".slider-button-left")
const rightBtn = document.querySelector(".slider-button-right")
const viewWindow = document.querySelector(".welcome-slider-viewer")
const slider = document.querySelector(".welcome-slider")
const sliderLen = slider.querySelectorAll(".welcome-slider-image").length
const markerList = document.querySelectorAll(".slider-marker")
const counter = document.querySelector(".slider-counter")
const viewWidth = viewWindow.clientWidth

const ticketOpen = document.querySelector('.buy')
const ticketClose = document.querySelector('.exitbtn')
const ticketForm = document.querySelector('.ticket-form')
const overLay = document.querySelector('.overlay')
const allProgress = document.querySelectorAll('.progress')
const burgerBtn = document.querySelector('.burger-button')
const topNav = document.querySelector('.head-nav')
const menuLinks = document.querySelectorAll('.menu-link')

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

/*.progressAll.forEach((el) => el.addEventListener('input', function(e) {
    const value = e.target.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
}))*/



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