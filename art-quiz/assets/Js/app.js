
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
           let question =new Question(catType, e.target.id, 0)
           SwitchPage(question)

           if(document.getElementById(`#ans-${question.correctAnswer}`)){
              question.setCorrect()
           }
        }   
     })
  }
  if(document.querySelector(".question-wrapper")){
     document.querySelector(".question-wrapper").addEventListener('click', (e)=>{
        if (e.target.classList.contains('correct')){
         catType.qid += 1 
         catType.updQtracker(catType.catId,'correct')
         let question =new Question(catType, catType.catId, catType.qid)
         question.testfun()
         console.log(catType.qTracker[catType.catId])
         SwitchPage(question)

        } else{
         catType.qid += 1 
         catType.updQtracker(catType.catId,'wrong')
         let question =new Question(catType, catType.catId, catType.qid)
         alert(catType.qTracker[catType.catId])
         SwitchPage(question)
        }
     } )
  }
}

// 