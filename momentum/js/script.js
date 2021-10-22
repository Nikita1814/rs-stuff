const clock = document.querySelector('.time')
const dateDiv = document.querySelector('.date')
const dateOptions = {weekday:'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', timeZone: 'Europe/Minsk', hour12: false,};
let lang = "en-US"
const greetSpan = document.querySelector('.greeting')
const nom = document.querySelector('.name')
const quoteDiv = document.querySelector('.quote')
const authorDiv = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')
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