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
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('active-link'))
                link.classList.toggle('active-link')
                console.log(link.classList[1])
                switch (link.classList[1]) {
                    case 'main-menu-link':
                        this.homePage.render(this.data)
                        break
                    case 'toy-page-link':
                        this.toysPage.render(this.data)
                        break
                }
            })
        })
        this.homePage.render(this.data)
    }
    setStorage() {
        this.toysPage.setStorage()
    }
}

export default App
