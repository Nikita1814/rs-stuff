import { Toys, Page, DataItem } from '../interfaces/interfaces'

class HomePage implements Page {
    toysPage: Toys
    data: DataItem[]
    constructor(data: DataItem[], toysPage: Toys) {
        this.toysPage = toysPage
        this.data = data
    }
    render(data: DataItem[]) {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
<div class="hidden page start-page" >
<h1 class="start-page-title">Новогодняя игра "Наряди елку"</h1>
<button class="begin-btn">Начать</button>
</div>
`
        this.addListeners()
        ;(document.querySelector('.favorite-count') as HTMLElement).innerHTML = `${this.toysPage.favs.size}`
    }
    addListeners() {
        document.querySelector('.begin-btn')?.addEventListener('click', () => {
            this.toysPage.render(this.data)
        })
    }
}

export default HomePage
