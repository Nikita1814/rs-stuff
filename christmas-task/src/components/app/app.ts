import data from '../../data'
import { DataItem, Toys } from '../interfaces/interfaces'
import ToysPage from '../toys-page/toys-page'
class App {
    toysPage: Toys
    data: DataItem[]

    constructor() {
        this.data = data
        this.toysPage = new ToysPage(data)
    }
    start() {
        window.addEventListener('beforeunload', () => {
            this.setStorage()
        })
        this.toysPage.render(this.data, this.toysPage.favs)
    }
    setStorage() {
        this.toysPage.setStorage()
    }
}

export default App
