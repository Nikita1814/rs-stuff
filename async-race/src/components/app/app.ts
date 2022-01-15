import GaragePage from './garage-page/garage-page'
import WinnersPage from './winners-page/winners-page'

class App {
    garagePage: GaragePage
    winnersPage: WinnersPage
    header: Header
    constructor() {
        this.garagePage = new GaragePage()
        this.winnersPage = new WinnersPage()
        this.header = new Header()
    }
    run() {
        this.header.render()
        this.garagePage.render()
    }
}
export default App
