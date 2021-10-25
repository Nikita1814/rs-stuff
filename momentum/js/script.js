//State vars
let state = {
  language: 'en-US',
  photoSource: 'github',
  blocks: [],
  boxes: [],
  tag:`nature`
}
/*let lang = "en-US";*/
const langSelect = document.querySelector('.lang-select')

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
let img

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
const trackName = document.querySelector('.track-title')
const progressBar = document.querySelector('.progress')
const durationDiv = document.querySelector('.duration')
const muteBtn = document.querySelector('.mute')
const volumeBar = document.querySelector('.volume')
const trackBtns = document.querySelectorAll('.track-name')

//Settings menu vars
const settingBtn = document.querySelector('.settings-btn')
const settingMenu = document.querySelector('.settings-menu')
const settingElems = document.querySelectorAll('.setting')
const settingChecks = document.querySelectorAll('.check') 
const sourceSelect = document.querySelector('.source-select')
const tagSelect = document.querySelector('.tag-field')

/*localStorage.clear()*/

console.log('Ваша оценка - 147 баллов\n Отзыв по пунктам ТЗ:\n Не выполненные/не засчитанные пункты:\n 1) доп функционал\n Частично выполненные пункты:\n 1) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте\n feedback: Нельзя поставить на паузу\n 2 переводится прогноз погоды в т.ч описание погоды и город по умолчанию\n feedback: Не меняется город по умолчанию \nВыполненные пункты: Все Остальное')





// time setting function
function loadTime() {
  let date = new Date();
  let dateStr = date.toLocaleString(`${state.language}`, dateOptions);
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
  if(state.language === 'ru-RU'){
    document.querySelector('.name').setAttribute('placeholder', '[Введите Имя]')
  }
  if(state.language === 'en-US'){
    document.querySelector('.name').setAttribute('placeholder', '[Enter Name]')
  }
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
  localStorage.setItem("settings", JSON.stringify(state))
  localStorage.setItem('city', cityInput.value)
}

function loadStorage() {
  if (localStorage.getItem("name")) {
    nom.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("settings")) {
    state = JSON.parse(localStorage.getItem("settings"));
  }
  if (localStorage.getItem("city")) {
    cityInput.value = localStorage.getItem("city");
  }
}
window.addEventListener("beforeunload", setStorage);
window.addEventListener("load", () =>{
loadStorage()
updSelects()
updLang()
updHide()
updPage()
setBg();
});

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
   
    if (state.language === "en-US") {
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherIcon.classList.add(`owf`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDesc.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s `;
      humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    } else if (state.language === "ru-RU") {
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherIcon.classList.add(`owf`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDesc.textContent = data.weather[0].description;
      wind.textContent = `Скорость ветра: ${data.wind.speed}м/с `;
      humidity.textContent = `Влажность: ${data.main.humidity}`;
    }
  }
}

loadWeather();

cityInput.addEventListener("input", loadWeather);

// bg image slider
function RandNumGen() {
  let randNum = `${Math.round(Math.random() * (20 - 1 - 1) + 1)}`.padStart(2,"0");
  return randNum;
}

async function getFlickImgLink() {
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=97fe91d2316327d228a3f52674e786bd&tags=${state.tag}&extras=url_l&format=json&nojsoncallback=1`
  let res =  await fetch(url)
  let data = await res.json()
  let img = new Image();
  img.src = `${data.photos.photo[Math.round(Math.random() * ((data.photos.photo.length -1 -0) + 0))]["url_l"]}`;
  img.onload = () => {      
  document.body.style.backgroundImage = `url(${img.src})`;  
  document.body.style.bacgroundSize = 'cover'
  }
  }

  async function getUnsImgLink(){
  let url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${state.tag}&client_id=CJSX2iFY_K9ntKQhu69T-sf1R9Acb3j_HRTVknGgi34`
  let res =  await fetch(url)
  data = await res.json()
  let img = new Image();
  img.src = `${data.urls.regular}`;
  img.onload = () => {      
  document.body.style.backgroundImage = `url(${img.src})`;  
  document.body.style.bacgroundSize = 'cover'
  }
}
 
 
function setBg() {
  if(state.photoSource === 'github') {
  let img = new Image();
  img.src = `https://raw.githubusercontent.com/Nikita1814/stage1-tasks/assets/images/${collection}/${bgImgNum}.jpg`;
  img.onload = () => {      
  document.body.style.backgroundImage = `url(${img.src})`;  
  document.body.style.bacgroundSize = 'cover'
  }
}
 if(state.photoSource === 'flickr'){
    getFlickImgLink()
}
if(state.photoSource === "unsplash"){
  getUnsImgLink()
}
}

function slideBg(direction) {
  if(state.photoSource === 'github'){
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
  /*document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Nikita1814/stage1-tasks/assets/images/${collection}/${bgImgNum}.jpg')`;*/
  setBg()
}
if(state.photoSource === "unsplash"){
  getUnsImgLink()
}
}
leftBtn.addEventListener('click', ()=>{
    slideBg('left') 
})
rightBtn.addEventListener('click', ()=>{
 slideBg('right')
})



//Audio player

audio.currentTime = 0;
let currentVol = audio.volume;

audio.src = playList[playNum].src
trackName.textContent =playList[playNum].title
trackBtns[playNum].classList.add('chosen')

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
switchAudio()
})

nextTrack.addEventListener('click', () =>{
playNum++
if(playNum > 3){
playNum = 0  
}
switchAudio()
})


prevTrack.addEventListener('click', () =>{
  playNum--
  if(playNum < 0){
  playNum = 3  
  }
  switchAudio()
  })


  /*const trackName = document.querySelector('.track-title')
  const progressBar = document.querySelector('.progress')
  const durationDiv = document.querySelector('.duration')
  const muteBtn = document.querySelector('.mute')
  const volumeBar = document.querySelector('.volume')*/


function setProgress(){
progressBar.setAttribute('max', audio.duration)  
progressBar.value = audio.currentTime
durationDiv.textContent = `${(audio.currentTime / 60).toFixed(2)}/${(audio.duration / 60).toFixed(2)}`
}

function updAudio(){
audio.currentTime = progressBar.value;
}

function updateVolBtn() {
  volumeBar.value = audio.volume;
  if (audio.volume > 0) {
    muteBtn.innerHTML =
      '<i class="fas fa-volume-up">';
  } else {
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
  }

  function muteAudio() {
    if (audio.volume > 0) {
      audio.volume = 0;
      volumeBar.value = 0;
      muteBtn.innerHTML = '<i class="fas fa-volume-up">';
    } else {
      audio.volume = currentVol;
      volumeBar.value = currentVol;
      muteBtn.innerHTML =
        '<i class="fas fa-volume-mute"></i>';
    }
  }

  function volumeUpdate() {
    audio.volume = volumeBar.value;
    currentVol = audio.volume;
    
  }
  function UpdBars(){
    setProgress()
    updateVolBtn()
  }

audio.addEventListener("timeupdate", setProgress)
audio.addEventListener("volumechange", updateVolBtn);
progressBar.addEventListener("mouseup",updAudio )
progressBar.addEventListener('input', ()=>{
  audio.currentTime = progressBar.value;
})
muteBtn.addEventListener("click", muteAudio);
volumeBar.addEventListener("mousemove", volumeUpdate);
trackBtns.forEach((el, index) => {
  el.addEventListener('click', () =>{
  playNum = index
  switchAudio()
  })
})

function switchAudio (){
  audio.src = playList[playNum].src
  trackName.textContent = playList[playNum].title
  UpdBars()
  trackBtns.forEach((el) => {
  el.classList.remove('chosen')
  el.querySelector('.fas').classList.remove(`fa-pause`)
  el.querySelector('.fas').classList.add(`fa-play`)   
  })
  trackBtns[playNum].classList.add('chosen')
  trackBtns[playNum].querySelector('.fas').classList.remove(`fa-play`)
  trackBtns[playNum].querySelector('.fas').classList.add(`fa-pause`)
  playAudio()
}

  //Setting menu functions

  settingBtn.addEventListener('click', () =>{ 
  settingBtn.classList.toggle('buttn-rotate')
  settingMenu.classList.toggle('settings-seen')
  settingElems.forEach((el) => {
    el.classList.toggle('settings-seen')
  })
  })

  function updLang(){
    state.language = langSelect.value
  }

  langSelect.addEventListener('change', () =>{
    updLang()
    updPage()
  })

  function updImgSrc(){
    state.photoSource = sourceSelect.value
  }

function updPage(){
  translateSettings()
  loadWeather();
  loadQuotes();
  loadGreeting();
  setBg()
}

function translateSettings(){
  if (state.language === "en-US"){
    document.querySelector('.pick-lang').textContent="Select a language"
    document.querySelector('.hide-show').textContent="Select elements to hide/show"
    document.querySelector('.pick-source').textContent="Select image source and search query (for Flickr and Unsplash)"
  }
  if (state.language === "ru-RU"){
    document.querySelector('.pick-lang').textContent="Выберите язык"
    document.querySelector('.hide-show').textContent="Скрытые элементы"
    document.querySelector('.pick-source').textContent="Выберите источник для изображений фона и тему поиска - тег (для Unsplash и Flickr)"
  }
}

function updSelects(){
  sourceSelect.value = state.photoSource
  langSelect.value = state.language
  tagSelect.value = state.tag
}

sourceSelect.addEventListener('change', () =>{
  updImgSrc()
  updPage()
})


function updTag () {
state.tag = tagSelect.value 
}

tagSelect.addEventListener('change', () => {
  updTag()
  updPage()
})

function updHide(){
  state.blocks.forEach((b) => {
  document.querySelector(`.${b}`).classList.add('hidden-elem')
  })

  state.boxes.forEach((x) => {
  document.getElementById(`${x}`).checked = true
  })
}


settingChecks.forEach((el) => el.addEventListener('click', () =>{
  if(el.checked){
document.querySelector(`.${el.value}`).classList.add('hidden-elem')
state.blocks.push(el.value)
state.boxes.push(el.id)

  } else {
    document.querySelector(`.${el.value}`).classList.remove('hidden-elem')
state.blocks = state.blocks.filter((b) =>{return b !== el.value})  

state.boxes =  state.boxes.filter((x) =>{return x !== el.id})  

  }
}))

