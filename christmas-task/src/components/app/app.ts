import data from '../../data'
import { DataItem, Toys } from '../interfaces/interfaces'
import ToysPage from '../toys-page/toys-page'

class App {
    toysPage: Toys

    data: DataItem[]

    constructor() {
        this.toysPage = new ToysPage(data)

        this.data = data
    }
    start() {
        window.addEventListener('beforeunload', () => {
            this.setStorage()
        })

        this.toysPage.render(this.data)
    }
    setStorage() {
        this.toysPage.setStorage()
    }
}

export default App
