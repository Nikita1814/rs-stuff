import { WinnerItem } from '../garage-page/garage-grid/garage-grid'
import { CarItem } from '../Interfaces/interfaces'

class WinnersPage {
    currentPage: number
    pageTotal: number
    sort: string
    order: string
    constructor() {
        this.currentPage = 1
        this.pageTotal = 1
        this.sort = 'id'
        this.order = 'DESC'
    }
    render() {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
      <div class="winners-page"">
            <h1 class ="winner-count">Winners()!</h1>
            <div class="winners-table">
                <div class="winners-table-top winners-table-row">
                    <p data-sort="id" data-order="DESC">Number</p>
                    <p>Car</p>
                    <p>Name</p>
                    <p data-sort="wins" data-order="DESC">Wins</p>
                    <p data-sort="time" data-order="DESC">Best Time(seconds)</p>
                </div>
                <div class="table-page" data-page-num=${this.currentPage}>
                </div>
                <div class="winners-table-row">
                    <button class="garage-button previous button-green"> Prev</button>
                    <h2 class="winner-page-header">Page #${this.currentPage}</h2>
                    <button class="garage-button previous button-green">Next</button>
                </div>
            </div>
        </div>
      `
        this.getWinners()
    }
    async getWinners() {
        const res = await fetch(
            `http://127.0.0.1:3000/winners?_page=${this.currentPage}&_sort=${this.sort}&_order=${this.order}_limit=7`
        )
        if (res.ok) {
            const total = [...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]
            ;(document.querySelector('.winner-count') as HTMLElement).innerHTML = `Winners(${total})`
            this.pageTotal = Number(total)
            const arr = await res.json()
            this.showWinners(arr)
        } else {
            console.log('an error occured')
        }
    }
    async showWinners(winArr: Array<WinnerItem>) {
        const page = document.querySelector('.table-page') as HTMLElement
        page.innerHTML = ``
        page.dataset.pageNum = `${this.currentPage}`
        for (let winner of winArr) {
            await this.drawWinner(winner.id, winner, page)
        }
    }
    async drawWinner(id: number, winner: WinnerItem, page: HTMLElement) {
        const res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'GET',
        })
        if (res.ok) {
            const car = await res.json()
            console.log(car)
            console.log(winner)
            page.innerHTML += ` 
            <div data-car-id="${car.id}" class="winners-table-winner winners-table-row">
            <p>${car.id}</p>
            <div class="car winner-car"style="background-color:${car.color}"></div>
            <p>${car.name}</p>
            <p>${winner.wins}</p>
            <p>${winner.time}</p>
        </div>
            `
        }
    }
    addListneners() {}
}
export default WinnersPage
