import data from '../../data'
import HomePage from '../home-page/home-page'
import { DataItem, ToySelection, Page, TreeDecoration } from '../interfaces/interfaces'
import ToysPage from '../toys-page/toys-page'
import TreePage from '../tree-page/tree-page'
class App {
    toysPage: ToySelection
    data: DataItem[]
    homePage: Page
    treePage: TreeDecoration
    constructor() {
        this.data = data
        this.toysPage = new ToysPage(data)
        this.homePage = new HomePage(data, this.toysPage)
        this.treePage = new TreePage(data, this.toysPage.favs)
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
                    case 'tree-page-link':
                        this.treePage.render(this.data)
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
