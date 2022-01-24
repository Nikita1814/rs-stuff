import { GaragePage } from './garage-page/garage-page'
import PageHeader from './header/header'
import WinnersPage from './winners-page/winners-page'

class App {
    garagePage: GaragePage
    winnersPage: WinnersPage
    header: PageHeader
    constructor() {
        this.garagePage = new GaragePage()
        this.winnersPage = new WinnersPage()
        this.header = new PageHeader(this.garagePage, this.winnersPage)
    }
    run() {
        this.header.render()
        this.garagePage.render()
        window.location.hash = 'garage'
    }
}
export default App
