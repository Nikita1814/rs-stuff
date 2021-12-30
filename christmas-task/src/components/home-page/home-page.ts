import { PageInterface } from '../interfaces/interfaces'

class HomePage implements PageInterface {
    public favsAmount: number
    constructor(favsAmount: number) {
        this.favsAmount = favsAmount
    }
    render() {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
<div class=" page start-page" >
<h1 class="start-page-title">Новогодняя игра "Наряди елку"</h1>
<a href="#toy-page" class="begin-btn">Начать</a>
</div>
`
        ;(document.querySelector('.favorite-count') as HTMLElement).innerHTML = `${this.favsAmount}`
    }
}

export default HomePage
