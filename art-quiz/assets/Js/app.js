
//iports
import Home from "./Home.js";
import Settings from "./Settings.js";
import Category from "./Category.js";
//variables
const home = new Home
const settings = new Settings
const authorsCat = new Category('artistQuestions')
const paintingsCat = new Category('pictureQuestions')
let curPage = home;
const app = document.querySelector(".app");



//Functions


//category data generation




//page switching

function SwitchPage() {
  app.innerHTML = curPage.html;
  addListeners();
}

SwitchPage();



// listener set-up
function addListeners() {
  if (document.querySelector(".open-settings")) {
    document.querySelector(".open-settings").addEventListener("click", () => {
      curPage = settings;
      SwitchPage();
    });
  }

  if (document.querySelector(".save-btn")) {
    document.querySelector(".save-btn").addEventListener("click", () => {
      curPage = home;
      SwitchPage();
    });
  }
  if(document.querySelector(".artists")){
   document.querySelector(".artists").addEventListener("click", () => {
      curPage = authorsCat;
      SwitchPage();
    });
  }

  if(document.querySelector(".pictures")){
   document.querySelector(".pictures").addEventListener("click", () => {
      curPage = paintingsCat;
      SwitchPage();
    });
  }
  if (document.querySelector(".home-btn")) {
   document.querySelector(".home-btn").addEventListener("click", () => {
     curPage = home;
     SwitchPage();
   });
  }
}

// 