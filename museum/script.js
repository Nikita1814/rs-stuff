const leftBtn = document.querySelector(".slider-button-left")
const rightBtn = document.querySelector(".slider-button-right")
const viewWindow = document.querySelector(".welcome-slider-viewer")
const slider = document.querySelector('.welcome-slider')
const sliderLen = document.querySelectorAll(".welcome-slider-image")
const viewWidth = viewWindow.clientWidth

let activeSlide = 0
slider.syle.left = '1000px'

leftBtn.addEventListener('click', () => {
switchSlides('left')
})
rightBtn.addEventListener('click', () => {
    switchSlides('right')
    })
function switchSlides(direction){
slider.classList.add('visual-transition')

if (direction === "left"){
    activeSlide --    
}

if (direction === "right"){
    activeSlide ++
}
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
}

