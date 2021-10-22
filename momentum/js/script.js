const clock = document.querySelector('.time')
const dateDiv = document.querySelector('.date')
const dateOptions = {weekday:'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', timeZone: 'Europe/Minsk', hour12: false,};
let lang = "en-US"


function loadTime (){
let date = new Date
let dateStr = date.toLocaleString(`${lang}`, dateOptions)
let dateSplitArr = dateStr.split(',')
clock.textContent = `${dateSplitArr[2]}`
dateDiv.textContent = `${dateSplitArr[0]}, ${dateSplitArr[1]} `

setTimeout(loadTime, 1000)
}
loadTime()