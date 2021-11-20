
//iports
import Home from "./Home.js";
import Settings from "./Settings.js";
import {Category, Question } from "./Category.js";

//variables
const home = new Home
const settings = new Settings
const artistsCat = new Category('artistQuestions')
const picturesCat = new Category('pictureQuestions')
const app = document.querySelector(".app");
let catType
/*let qTracker = [...Array(24)].map((e)=> new Array)*/

artistsCat.testfun()
//Functions


//category data generation




//page switching

function SwitchPage(curPage) {
  app.innerHTML = curPage.html;
  addListeners();
}

SwitchPage(home);



// listener set-up
function addListeners() {
  if (document.querySelector(".open-settings")) {
    document.querySelector(".open-settings").addEventListener("click", () => {
  
      SwitchPage(settings);
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
      SwitchPage(picturesCat);
    });
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
         console.log(catType.qTracker[catType.catId])
         alert(catType.qTracker[catType.catId])

        } else{
         catType.updQtracker(catType.catId,'wrong')
         console.log(catType.qTracker[catType.catId])
         alert(catType.qTracker[catType.catId])
        }

        catType.qid += 1
        if(catType.qid === 10){
          catType.qid = 0
          SwitchPage(catType)
        } else{
        let question =new Question(catType, catType.catId, catType.qid)
        SwitchPage(question)
        question.setCorrect()
        question.updPagination()
        }
     } )
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