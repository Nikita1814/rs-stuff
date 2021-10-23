
//lang var
let lang = "en-US"


//date vars

const clock = document.querySelector('.time')
const dateDiv = document.querySelector('.date')
const dateOptions = {weekday:'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', timeZone: 'Europe/Minsk', hour12: false,};
const greetSpan = document.querySelector('.greeting')

//quotes vars

const nom = document.querySelector('.name')
const quoteDiv = document.querySelector('.quote')
const authorDiv = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

//weather widget vars
let cityInput = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDesc = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherError = document.querySelector('.weather-error')

// time setting function 
function loadTime (){
let date = new Date
let dateStr = date.toLocaleString(`${lang}`, dateOptions)
let dateSplitArr = dateStr.split(',')
clock.textContent = `${dateSplitArr[2]}`
dateDiv.textContent = `${dateSplitArr[0]}, ${dateSplitArr[1]} `

setTimeout(loadTime, 1000)
}
loadTime()


// greeting setting function

function loadGreeting(){
    let date = new Date
    let hr = date.getHours()
    let greeting = 'Good'
   if(hr >=6 && hr< 12){
    greeting = 'Good morning,'
   } else if( hr >=12 && hr < 18){
    greeting = 'Good afternoon,' 
   }  else if( hr >=18 && hr <=23){
    greeting = 'Good evening,' 
   }  else if( hr >=0 && hr < 6){
    greeting = 'Good night,' 
   }
 greetSpan.textContent = greeting
}
loadGreeting()

// functions and listeners for  saving the name to local storage and loading it

function setStorage () {
    localStorage.setItem('name', nom.value); 
}

function loadStorage (){
    if(localStorage.getItem('name')) {
        nom.value = localStorage.getItem('name');
      }

}
window.addEventListener('beforeunload', setStorage)
window.addEventListener('load', loadStorage)

// quotes

async function loadQuotes(){
    const quotes = 'quotes.json'
    const res = await fetch(quotes)
    const data = await res.json();
    let quote = data[Math.round(Math.random() * ((data.length -1) - 0) + 0)]
    quoteDiv.textContent = quote.text
    authorDiv.textContent =quote.author 
    changeQuote.addEventListener('click', () =>{
        quote = data[Math.round(Math.random() * ((data.length -1) - 0) + 0)]
    quoteDiv.textContent = quote.text
    authorDiv.textContent =quote.author 
    }) 
}
loadQuotes()

//weather widget

async function loadWeather(){
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${lang[0]}${lang[1]}&appid=14ea945df3b3517b12a5d7dfc6a3f40b&units=metric`
let res = await fetch(url)
if(!res.ok){
 weatherError.textContent = `Error! city not found for "${cityInput.value}"`   
 weatherIcon.classList.remove(`owf`)
 temperature.textContent = ``
 weatherDesc.textContent = ``
 wind.textContent =``
 humidity.textContent =``
} else {
weatherError.textContent = ``   
let data = await res.json()
console.log(url)
console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.main.humidity, data.wind.speed);
if (lang === 'en-US'){

    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    weatherIcon.classList.add(`owf`)
    temperature.textContent = `${data.main.temp}°C`
    weatherDesc.textContent = data.weather[0].description
    wind.textContent =`Wind speed: ${data.wind.speed} m/s `
    humidity.textContent =`Humidity: ${data.main.humidity}`
    
    
    
} else if (lang === 'ru-RU'){

    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    weatherIcon.classList.add(`owf`)
    temperature.textContent = `${data.main.temp}°C`
    weatherDesc.textContent = data.weather[0].description
    wind.textContent =`Скорость ветра: ${data.wind.speed} м/с `
    humidity.textContent =`Влажность: ${data.main.humidity}` 
    
}
}
}

 loadWeather()

cityInput.addEventListener('input', loadWeather)


/*console.log(`${lang[0]}${lang[1]}`)
console.log(`${cityInput.value}`)*/
