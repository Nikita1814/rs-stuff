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


activeMarker = markerList[0]
activeMarker.style.backgroundColor = '#9D8665'
let activeSlide = 0
slider.style.left = "-1000px"

leftBtn.addEventListener('click', () => {
switchSlides('left')
})

rightBtn.addEventListener('click', () => {
    switchSlides('right')
    })


slider.addEventListener('transitionend', CheckI)


ticketOpen.addEventListener('click', () =>{
closeTicketForm()
})

ticketClose.addEventListener('click', () =>{
closeTicketForm()    
})
overLay.addEventListener('click', () => {
    closeTicketForm()
})




markerList.forEach((el) => el.addEventListener('click', (e) => {
activeMarker.style.backgroundColor = 'white'
activeMarker = e.target
/*alert(markerList.indexOf(e.target))*/
activeMarker.style.backgroundColor = '#9D8665'
/*activeSlide = (-markerList.indexOf(e.target))
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`*/
}))

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
    counter.textContent = `0 ${-activeSlide}| 05`
    activeMarker.style.backgroundColor = '#9D8665'
    slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
    
} else if(activeSlide < -4 ){
activeMarker.style.backgroundColor = 'white'
activeSlide = 0
activeMarker = markerList[0]
counter.textContent = `0 ${-activeSlide +1}| 05`
activeMarker.style.backgroundColor = '#9D8665'
slider.style.transform = `translateX(${activeSlide * viewWidth}px)`
} else {
    counter.textContent = `0 ${-activeSlide +1}| 05`
    activeMarker.style.backgroundColor = 'white'
    activeMarker = markerList[-activeSlide]
    activeMarker.style.backgroundColor = '#9D8665'
}
}

function closeTicketForm () {
ticketForm.classList.toggle('hide-left')  
overLay.classList.toggle('hidden')  
} 