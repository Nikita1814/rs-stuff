
//iports
import Home from "./Home.js";
import Settings from "./Settings.js";
import {Category, Question } from "./Category.js";



//variables
let state = {
  settingValues : {
      volume: 'checked',
      vVal:1,
      timer: '',
      tval:30,
      },
   qTracker:{
    artistsCat:[...Array(12)].map((e)=> new Array),
    picturesCat:[...Array(12)].map((e)=> new Array)
  
   }
  }
const home = new Home
let settings = new Settings(state)
const artistsCat = new Category('artistQuestions', state)
const picturesCat = new Category('pictureQuestions', state)
let app = document.querySelector(".app");
let catType
/*let qTracker = [...Array(24)].map((e)=> new Array)*/

//Functions

//setting Local storage and loading it


function setStorage(){
localStorage.setItem('state', JSON.stringify(state))
}

function loadStorage(){
if (localStorage.getItem('state')){
state = JSON.parse(localStorage.getItem('state'))
}
}

window.addEventListener('beforeunload', setStorage)
window.addEventListener('load', ()=>{
  loadStorage()
  SwitchPage(home)
  
})

/*localStorage.clear()*/
//page switching

function SwitchPage(curPage) {
  app.innerHTML = curPage.html;
  addListeners();
}

//audio playing
function playAudio(name) {
  document.querySelector(`.${name}`).play();
}




// listener set-up
function addListeners() {
  document.querySelector('.app').addEventListener('click', ()=>{
    if(settings.settingValues.volume === 'checked'){
    playAudio(`menu-click`)
    }
   })
  if (document.querySelector(".open-settings")) {
    document.querySelector(".open-settings").addEventListener("click", () => {
      settings = new Settings(state)
      SwitchPage(settings);
      settings.updValues()
    });
  }

  if (document.querySelector(".save-btn")) {
    document.querySelector(".save-btn").addEventListener("click", () => {
      SwitchPage(home);
    });
  }
  if(document.querySelector(".artists")){
   document.querySelector(".artists").addEventListener("click", () => {
      catType = artistsCat
      SwitchPage(artistsCat);
    });
  }

  if(document.querySelector(".pictures")){
   document.querySelector(".pictures").addEventListener("click", () => {
      catType = picturesCat
      catType.testfun()
      SwitchPage(picturesCat);
    });
  }

  /*Setting listeners*/

  if(document.querySelector('.volume-range')){
  document.querySelector('.volume-range').addEventListener('mousemove', ()=> {
    settings.updSound()
  })
  }
  if (document.querySelector('.volume-check')){
    document.querySelector('.volume-check').addEventListener('click', () => {
      settings.mute()
    })
  }

  if (document.querySelector(".home-btn")) {
   document.querySelector(".home-btn").addEventListener("click", () => {
     SwitchPage(home);
   });
  }
  if (document.querySelector(".categories-wrapper")){
     document.querySelector(".categories-wrapper").addEventListener("click", (e) => {
        if(e.target.id){
           catType.catId = e.target.id
           catType.qTracker[e.target.id] = []
           let question =new Question(catType, e.target.id, 0)
           SwitchPage(question)
           question.setCorrect()
        }   
     })
  }
  if(document.querySelector(".question-wrapper")){
     document.querySelector(".question-wrapper").addEventListener('click', (e)=>{
        if (e.target.classList.contains('correct')){
         catType.updQtracker(catType.catId,'correct')
         /*console.log(catType.qTracker[catType.catId])
         alert(catType.qTracker[catType.catId])*/
         document.querySelector('.answer-result').classList.toggle('hide-elem')
         if(settings.settingValues.volume==='checked' ){
         playAudio(`good-sound`)
         }
         document.querySelector('.answer-symbol').innerHTML = `<i class="ans-icon fas fa-check"></i>`
         document.querySelector('.answer-result').style = `z-index:2; opacity:1;`

        } else {
         catType.updQtracker(catType.catId,'wrong')
         /*console.log(catType.qTracker[catType.catId])
         alert(catType.qTracker[catType.catId])*/
         if(settings.settingValues.volume==='checked'){
         playAudio(`wrong-sound`)
         }
         document.querySelector('.answer-result').classList.toggle('hide-elem')
         document.querySelector('.answer-symbol').innerHTML = `<i class="ans-icon fas fa-times"></i>`
         document.querySelector('.answer-result').style = `z-index:2; opacity:1;`
        }

     } )
  }
  if (document.querySelector(".answer-result")){
      document.querySelector(".answer-result").addEventListener('click', ()=>{
        catType.qid += 1
        console.log(catType.qid)
        if(catType.qid === 10){
      document.querySelector('.result-num').innerHTML = `${document.querySelectorAll('.right').length}/10`
        if(settings.settingValues.volume==='checked'){
        playAudio(`cheering`)
        }
      
     document.querySelector(".total-result").classList.toggle('hide-elm')
     document.querySelector(".total-result").style="z-index:3; opacity:1;"
        } else{
        let question =new Question(catType, catType.catId, catType.qid)
        SwitchPage(question)
        question.setCorrect()
        question.updPagination()
        }
      })
  }
 if (document.querySelector(".total-result")){
  document.querySelector(".total-result").addEventListener('click', ()=>{
    catType.qid = 0
    SwitchPage(catType)
  })
}
}

// 



  
/*if (e.target.classList.contains('correct')){
  currentCat.updQtracker(dataStorage[currentCat.catType].catId,'correct')
  alert(dataStorage[currentCat.catType].qTracker[dataStorage[currentCat.catType].catId])
 } else{
   currentCat.updQtracker(dataStorage[currentCat.catType].catId,'correct')
   alert(dataStorage[currentCat.catType].qTracker[dataStorage[currentCat.catType].catId])
 }

 dataStorage[currentCat.catType].qid += 1 
 console.log(dataStorage[currentCat.catType].qid)
 if(dataStorage[currentCat.catType].qid === 10){
   dataStorage[currentCat.catType].qid  = 0
   currentCat = new Category(`picturesCat`)
   SwitchPage(currentCat)
 }
 let question =new Question(currentCat, dataStorage[currentCat.catType].catId, dataStorage[currentCat.catType].qid, dataStorage)
 SwitchPage(question)
 question.setCorrect()
} )*/