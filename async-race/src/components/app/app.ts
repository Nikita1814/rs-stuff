import ApiService from './api-service/api-service'
import { GaragePage } from './garage-page/garage-page'
import PageHeader from './header/header'
import WinnersPage from './winners-page/winners-page'

class App {
    garagePage: GaragePage
    winnersPage: WinnersPage
    header: PageHeader
    service: ApiService
    constructor() {
        this.service = new ApiService()
        this.garagePage = new GaragePage(this.service)
        this.winnersPage = new WinnersPage(this.service)
        this.header = new PageHeader(this.garagePage, this.winnersPage)
    }
    run(): void {
        console.log(` `)
        this.header.render()
        this.garagePage.render()
        window.location.hash = 'garage'
    }
}
export default App
