import data from '../../data'
import HomePage from '../home-page/home-page'
import { DataItem, Toys, Page } from '../interfaces/interfaces'
import ToysPage from '../toys-page/toys-page'
class App {
    toysPage: Toys
    data: DataItem[]
    homePage: Page
    constructor() {
        this.data = data
        this.toysPage = new ToysPage(data)
        this.homePage = new HomePage(data, this.toysPage)
    }
    start() {
        window.addEventListener('beforeunload', () => {
            this.setStorage()
        })
        this.homePage.render(this.data)
    }
    setStorage() {
        this.toysPage.setStorage()
    }
}

export default App
