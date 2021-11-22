
//iports
import Home from "./Home.js";
import Settings from "./Settings.js";
import {Category, Question } from "./Category.js";
import Score from "./Score.js"


//variables
let state = {
  settingValues : {
      volume: 'checked',
      vVal:1,
      timer: 'checked',
      tVal:30,
      },
   qTracker:{
    artistQuestions:[...Array(12)].map((e)=> new Array),
    pictureQuestions:[...Array(12)].map((e)=> new Array)
  
   }
  }
const home = new Home
let settings = new Settings(state)
const artistsCat = new Category('artistQuestions', state)
const picturesCat = new Category('pictureQuestions', state)
let app = document.querySelector(".app");
let catType
let score
let interval
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
  settings.updSound()
  SwitchPage(home)
  
})

/*localStorage.clear()*/
//page switching

function SwitchPage(curPage) {
  app.children[0].style ='opacity:0.01;'
 
    app.innerHTML = curPage.html;
    addListeners();
    app.children[0].style ='opacity:0.01;'
  
 setTimeout(()=>{app.children[0].style ='opacity:1;'}, 1000)
 /*app.children[0].style ='opacity:1;'*/
 clearInterval(interval)

}

//audio playing
function playAudio(name) {
  document.querySelector(`.${name}`).play();
}

//timer fuction

function timer() {
  
  if (state.settingValues.timer === "checked" ){
    let counter = state.settingValues.tVal;
    interval = setInterval(() => {
      document.querySelector(".timer-tracker").innerHTML = "00:" + counter;
      counter--;
    
     
    if (counter === 0 && document.querySelector(`question`)) {
      clearInterval(interval);
      catType.updQtracker(catType.catId, "wrong");
      if (settings.settingValues.volume === "checked") {
        playAudio(`wrong-sound`);
      }
      document.querySelector(".answer-result").classList.toggle("hide-elem");
      document.querySelector(
        ".answer-symbol"
      ).innerHTML = `<i class="ans-icon fas fa-times"></i>`;
      document.querySelector(".answer-result").style = `z-index:2; opacity:1;`;
    } 
    
    if (
      document.querySelector(`.answer-result`).classList.contains("done") || document.querySelector('.total-result').classList.contains('done')
    ) {
      clearInterval(interval);
    }
    if(!document.querySelector('.question')){
      clearInterval(interval);
    }
   }, 1000); 
  }
  
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
      catType = new Category('artistQuestions', state)
      SwitchPage(catType);
    });
  }

  if(document.querySelector(".pictures")){
   document.querySelector(".pictures").addEventListener("click", () => {
      catType = new Category('pictureQuestions', state)
      console.log(state.qTracker[catType.catType][0])
      SwitchPage(catType);
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
  if(document.querySelector('.timer-range')){
    document.querySelector('.timer-range').addEventListener('mousemove', ()=> {
      settings.updTimer()
    })
    }
    if (document.querySelector('.timer-check')){
      document.querySelector('.timer-check').addEventListener('click', () => {
        settings.turnTimer()
      })
    }

  if (document.querySelector(".home-btn")) {
   document.querySelector(".home-btn").addEventListener("click", () => {
     SwitchPage(home);
   });
  }
   if (document.querySelector(".cat-btn")) {
    document.querySelector(".cat-btn").addEventListener("click", () => {
      catType.qid = 0
      let temp = catType.catType
      catType = new Category(temp, state)
      SwitchPage(catType)
    });
  }
  if (document.querySelector(".categories-wrapper")){
     document.querySelector(".categories-wrapper").addEventListener("click", (e) => {
        if(e.target.id && e.target.classList.contains('category-image')){
           catType.catId = e.target.id
           state.qTracker[catType.catType][e.target.id] = []
           let question =new Question(catType, e.target.id, 0, state)
           SwitchPage(question)
           question.setCorrect()
           timer()
        }   
        if(e.target.id && e.target.classList.contains('score-total')){
          catType.catId = e.target.id
          score = new Score(catType, e.target.id, state)
          SwitchPage(score)
          score.colorIn()
       }   
     
     })
  }
  if(document.querySelector(".question-wrapper")){
     document.querySelector(".question-wrapper").addEventListener('click', (e)=>{
        if (e.target.classList.contains('correct')){
         catType.updQtracker(catType.catId,'correct')
     
         
         if(settings.settingValues.volume==='checked' ){
         playAudio(`good-sound`)
         }
         document.querySelector('.answer-result').classList.toggle('hide-elem')
         document.querySelector('.answer-result').classList.add('done')
         document.querySelector('.answer-symbol').innerHTML = `<i class="ans-icon fas fa-check"></i>`
         document.querySelector('.answer-result').style = `z-index:2; opacity:1;`

        } else {
         catType.updQtracker(catType.catId,'wrong')
         if(settings.settingValues.volume==='checked'){
         playAudio(`wrong-sound`)
         }
         document.querySelector('.answer-result').classList.toggle('hide-elem') 
         document.querySelector('.answer-result').classList.add('done')
         document.querySelector('.answer-symbol').innerHTML = `<i class="ans-icon fas fa-times"></i>`
         document.querySelector('.answer-result').style = `z-index:2; opacity:1;`
        }

     } )
  }
  if (document.querySelector(".answer-result") && document.querySelector('.question')){
      document.querySelector(".answer-result").addEventListener('click', ()=>{
        catType.qid += 1
        if(catType.qid === 10){
      document.querySelector('.result-num').innerHTML = `${document.querySelectorAll('.right').length}/10`
        if(settings.settingValues.volume==='checked'){
        playAudio(`cheering`)
        }
      
     document.querySelector(".total-result").classList.toggle('hide-elm')
     document.querySelector('.answer-result').classList.add('done')
     document.querySelector(".total-result").style="z-index:3; opacity:1;"
        } else{
        let question =new Question(catType, catType.catId, catType.qid, state)
        SwitchPage(question)
        question.setCorrect()
        question.updPagination()
        timer()
        }
      })
  }
 if (document.querySelector(".total-result")){
  document.querySelector(".total-result").addEventListener('click', ()=>{
    catType.qid = 0
    let temp = catType.catType
    catType = new Category(temp, state)
    SwitchPage(catType)
  })
}
if (document.querySelector('.total')){
  document.querySelector('.total').addEventListener('click', (e)=>{
    if(e.target.id){
      document.querySelector('.question-image').style =`background-image:url(assets/img/${catType.questions[catType.catType][catType.catId][e.target.id].imageNum}.jpg);`
      document.querySelector('.picture-name').innerHTML = `${catType.questions[catType.catType][catType.catId][e.target.id].name}`
      document.querySelector('.picture-author').innerHTML = `${catType.questions[catType.catType][catType.catId][e.target.id].author}`
      document.querySelector('.picture-year').innerHTML = `${catType.questions[catType.catType][catType.catId][e.target.id].year}`
         document.querySelector('.answer-result').classList.toggle('hide-elem')
         document.querySelector('.answer-result').style = `z-index:2; opacity:1;`
    }
    if(document.querySelector('.answer-result')){
      document.querySelector('.answer-result').addEventListener('click',()=>{
        document.querySelector('.answer-result').style = 'z-index:2; opacity:0;'
        document.querySelector('.answer-result').style = 'z-index:-1;'
        document.querySelector('.answer-result').classList.toggle('hide-elem')
      })
    
    }
  })
}
}

