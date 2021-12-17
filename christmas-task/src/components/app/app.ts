import data from "../../data";
import { DataItem } from "../interfaces/interfaces";
import ToysPage from "../toys-page/toys-page";
class App {
  /*TODO propper types and interfaces*/
  private homePage;
  private toysPage;
  private treePage;
  private header;
  private data: Array<DataItem>;


  constructor() {
    this.homePage = {};
    this.toysPage = new ToysPage ;
    this.treePage = {};
    this.header={}
    this.data = data;
  }
  start() {
    this.toysPage.render(this.data)
    /*TODO a function initializing the app, setting up header listeners for page transfer and sending the data object down to the other classes, while calling render functions*/
  }
}

export default App