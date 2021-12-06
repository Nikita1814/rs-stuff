import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller
    view
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document
            .querySelector('.sources') as HTMLElement)
            .addEventListener('click', (e) => {
                this.controller.getNews(e, (data) => this.view.drawNews(data));
                (document.querySelector('.sources') as HTMLElement).classList.toggle('hide-menu');
            });
        (document
            .querySelector('.menu-btn') as HTMLElement)
            .addEventListener('click', ()  => {
                (document.querySelector('.sources') as HTMLElement).classList.toggle('hide-menu');
            })    
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
