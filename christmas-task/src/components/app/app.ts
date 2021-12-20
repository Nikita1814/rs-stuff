import data from "../../data";
import { AppСlass, DataItem, Toys } from "../interfaces/interfaces";
import ToysPage from "../toys-page/toys-page";
/*localStorage.clear()*/
class App implements AppСlass {
  /*TODO propper types and interfaces*/
  /*private homePage;*/
  toysPage: Toys;
  /*private treePage;*/
  /*private header;*/
  data: Array<DataItem>;


  constructor() {
    /*this.homePage = {};*/
    this.toysPage = new ToysPage(data) ;
    /*this.treePage = {};*/
    /*this.header={}*/
    this.data = data;
  }
  start() {
    window.addEventListener('beforeunload', ()=>{
      this.setStorage()
    });
   /*console.log(localStorage)*/
   /*console.log(this.filters)*/
    /*this.loadStorage();*/
    console.log(this.toysPage.filters)
    this.toysPage.render(this.data);
    /*TODO a function initializing the app, setting up header listeners for page transfer and sending the data object down to the other classes, while calling render functions*/
  }
  setStorage(){
    this.toysPage.setStorage()
  }
  /*loadStorage(){
    this.toysPage.loadStorage()
  }*/
}

export default App