import data from '../../data'
import { AppСlass, DataItem, Toys } from '../interfaces/interfaces'
import ToysPage from '../toys-page/toys-page'

class App implements AppСlass {
    toysPage: Toys

    data: Array<DataItem>

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
