import AppController from "../controller/controller";
import { AppView } from "../view/appView";

class App {
  private controller: AppController;
  private view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document.querySelector(".sources")?.addEventListener("click", (e) => {
      this.controller.getNews(e, (data) => this.view.drawNews(data));
      document.querySelector(".sources")?.classList.toggle("hide-menu");
    });
    document.querySelector(".menu-btn")?.addEventListener("click", () => {
      document.querySelector(".sources")?.classList.toggle("hide-menu");
    });
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
