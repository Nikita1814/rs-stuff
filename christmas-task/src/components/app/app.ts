import data from "../../data";
class App {
  /*TODO propper types and interfaces*/
  private homePage;
  private toysPage;
  private treePage;
  private header;
  private data: Object;


  constructor() {
    this.homePage = {};
    this.toysPage = {};
    this.treePage = {};
    this.header={}
    this.data = data;
  }
  start() {
    /*TODO a function initializing the app, setting up header listeners for page transfer and sending the data object down to the other classes, while calling render functions*/
  }
}
