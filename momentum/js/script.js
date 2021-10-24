//State vars
const state = {
  language: 'en-US',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}
let lang = "en-US";

//date vars

const clock = document.querySelector(".time");
const dateDiv = document.querySelector(".date");
const dateOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Europe/Minsk",
  hour12: false,
};
const greetSpan = document.querySelector(".greeting");

//quotes vars

const nom = document.querySelector(".name");
const quoteDiv = document.querySelector(".quote");
const authorDiv = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

//weather widget vars
let cityInput = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDesc = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

//Background image sliding vars
const leftBtn = document.querySelector(".slide-prev");
const rightBtn = document.querySelector(".slide-next");
let collection = "evening";
let bgImgNum = RandNumGen();

//Audio player vars
const audio = document.querySelector('.audio')
const playBtn = document.querySelector('.play')
const nextTrack = document.querySelector('.play-next')
const prevTrack = document.querySelector('.play-prev')
const playList = [
  {      
    title: 'Aqua Caelestis',
    src: 'assets/sounds/Aqua-Caelestis.mp3',
    duration: '00:58'
  },  
  {      
    title: 'River Flows In You',
    src: 'assets/sounds/River-Flows-In-You.mp3',
    duration: '03:50'
  },
  {      
    title: 'Ennio Morricone',
    src: 'assets/sounds/Ennio-Morricone.mp3',
    duration: '01:37'
  },
  {      
    title: 'Summer Wind',
    src: 'assets/sounds/Summer-Wind.mp3',
    duration: '01:50'
  }
]
let playNum = 0

//Settings menu vars
const settingBtn = document.querySelector('.settings-btn')
const settingMenu = document.querySelector('.settings-menu')
const settingElems = document.querySelectorAll('.setting')

// time setting function
function loadTime() {
  let date = new Date();
  let dateStr = date.toLocaleString(`${lang}`, dateOptions);
  let dateSplitArr = dateStr.split(",");
  clock.textContent = `${dateSplitArr[2]}`;
  dateDiv.textContent = `${dateSplitArr[0]}, ${dateSplitArr[1]} `;

  setTimeout(loadTime, 1000);
}
loadTime();

// greeting setting function

function loadGreeting() {
  let date = new Date();
  let hr = date.getHours();
  let greeting = "Good";
  if (hr >= 6 && hr < 12) {
    collection = "morning";
    greeting = "Good morning,";
    if(state.language === 'ru-RU'){
      greeting = "Доброе Утро, "
    }
  } else if (hr >= 12 && hr < 18) {
    collection = "afternoon";
    greeting = "Good afternoon,";
    if(state.language === 'ru-RU'){
      greeting = "Добрый День, "
    }
  } else if (hr >= 18 && hr <= 23) {
    collection = "evening";
    greeting = "Good evening,";
    if(state.language === 'ru-RU'){
      greeting = "Добрый Вечер, "
    }
  } else if (hr >= 0 && hr < 6) {
    collection = "night";
    greeting = "Good night,";
    if(state.language === 'ru-RU'){
      greeting = "Доброй Ночи, "
    }
  }
  greetSpan.textContent = greeting;
}
loadGreeting();

// functions and listeners for  saving the name and settings  to local storage and loading it

function setStorage() {
  localStorage.setItem("name", nom.value);
  localStorage.setItem("settings", state)
}

function loadStorage() {
  if (localStorage.getItem("name")) {
    nom.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("settings")) {
    nom.value = localStorage.getItem("settings");
  }
}
window.addEventListener("beforeunload", setStorage);
window.addEventListener("load", loadStorage);

// quotes

async function loadQuotes() {
  let quotes
  if(state.language ==="ru-RU"){
   quotes = "quotes.json";
  }
  if (state.language === "en-US"){
  quotes = "quotes-eng.json"  
  }
  const res = await fetch(quotes);
  const data = await res.json();
  let quote = data[Math.round(Math.random() * (data.length - 1 - 0) + 0)];
  quoteDiv.textContent = quote.text;
  authorDiv.textContent = quote.author;
  changeQuote.addEventListener("click", () => {
    quote = data[Math.round(Math.random() * (data.length - 1 - 0) + 0)];
    quoteDiv.textContent = quote.text;
    authorDiv.textContent = quote.author;
  });
}
loadQuotes();

//weather widget

async function loadWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${state.language[0]}${state.language[1]}&appid=14ea945df3b3517b12a5d7dfc6a3f40b&units=metric`;
  let res = await fetch(url);
  if (!res.ok) {
    weatherError.textContent = `Error! city not found for "${cityInput.value}"`;
    weatherIcon.classList.remove(`owf`);
    temperature.textContent = ``;
    weatherDesc.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
  } else {
    weatherError.textContent = ``;
    let data = await res.json();
    console.log(url);
    console.log(
      data.weather[0].id,
      data.weather[0].description,
      data.main.temp,
      data.main.humidity,
      data.wind.speed
    );
    if (state.language === "en-US") {
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherIcon.classList.add(`owf`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDesc.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${data.wind.speed} m/s `;
      humidity.textContent = `Humidity: ${data.main.humidity}`;
    } else if (state.language === "ru-RU") {
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherIcon.classList.add(`owf`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDesc.textContent = data.weather[0].description;
      wind.textContent = `Скорость ветра: ${data.wind.speed} м/с `;
      humidity.textContent = `Влажность: ${data.main.humidity}`;
    }
  }
}

loadWeather();

cityInput.addEventListener("input", loadWeather);

// bg image slider
function RandNumGen() {
  let randNum = `${Math.round(Math.random() * (20 - 1 - 1) + 1)}`.padStart(
    2,
    "0"
  );
  return randNum;
}

function setBg() {
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Nikita1814/stage1-tasks/assets/images/${collection}/${bgImgNum}.jpg')`;
}
setBg();

function slideBg(direction) {
  if (direction === "left") {
    bgImgNum = `${Number(bgImgNum) - 1}`.padStart(2, "0");
    if (Number(bgImgNum) === 0) {
      bgImgNum = "20";
    }
  }
  if (direction === "right") {
    bgImgNum = `${Number(bgImgNum) + 1}`.padStart(2, "0");
    if (Number(bgImgNum) === 21) {
      bgImgNum = "01";
    }
  }
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Nikita1814/stage1-tasks/assets/images/${collection}/${bgImgNum}.jpg')`;
}
leftBtn.addEventListener('click', ()=>{
    slideBg('left') 
})
rightBtn.addEventListener('click', ()=>{
    slideBg('right') 
})

console.log(Number("01"));

//Audio player
audio.currentTime = 0;


audio.src = playList[playNum].src
function playAudio() {
  
  if (audio.paused) {
    audio.play();
    playBtn.classList.add('pause')
  } else {
    audio.pause();
    playBtn.classList.remove('pause')
  }
}

playBtn.addEventListener('click', playAudio)

audio.addEventListener('ended', () =>{
playNum++
if(playNum > 3){
playNum = 0  
}
audio.src = playList[playNum].src
playAudio()
})

nextTrack.addEventListener('click', () =>{
playNum++
if(playNum > 3){
playNum = 0  
}
audio.src = playList[playNum].src
playAudio()
})
prevTrack.addEventListener('click', () =>{
  playNum--
  if(playNum < 0){
  playNum = 3  
  }
  audio.src = playList[playNum].src
  playAudio()
  })
  console.log(playList[playNum].src)


  //Setting menu functions

  settingBtn.addEventListener('click', () =>{
  console.log(`doing stuff`)  
  settingBtn.classList.toggle('buttn-rotate')
  settingMenu.classList.toggle('settings-seen')
  settingElems.forEach((el) => {
    el.classList.toggle('settings-seen')
  })
  })