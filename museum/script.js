const leftBtn = document.querySelector(".slider-button-left")
const rightBtn = document.querySelector(".slider-button-right")
const viewWindow = document.querySelector(".welcome-slider-viewer")
const slider = document.querySelector(".welcome-slider")
const sliderLen = slider.querySelectorAll(".welcome-slider-image").length
const viewWidth = viewWindow.clientWidth


let activeSlide = 0
slider.style.left = "-1000px"

leftBtn.addEventListener('click', () => {
switchSlides('left')
})

rightBtn.addEventListener('click', () => {
    switchSlides('right')
    })

slider.addEventListener('transitionend', CheckI)



function switchSlides(direction){
slider.classList.add('visual-transition')

if (direction === "left"){
    activeSlide ++
}

if (direction === "right"){
    activeSlide --
}
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
}


function  CheckI(){
slider.classList.remove('visual-transition')
if(activeSlide > 0 ){
    activeSlide = -4
    slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
}
if(activeSlide < -4 ){
activeSlide = 0
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
}
}