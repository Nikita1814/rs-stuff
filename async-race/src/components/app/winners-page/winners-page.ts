import ApiService, { CarItem } from '../api-service/api-service'
import { WinnerItem } from '../interfaces'

class WinnersPage {
    currentPage: number
    pageTotal: number
    sort: string
    order: string
    service: ApiService
    constructor(service: ApiService) {
        this.service = service
        this.currentPage = 1
        this.pageTotal = 1
        this.sort = 'id'
        this.order = 'DESC'
    }
    render(): void {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
      <div class="winners-page"">
            <h1 class ="winner-count">Winners()!</h1>
            <div class="winners-table">
                <div class="winners-table-top winners-table-row">
                    <p data-sort="id" data-order="DESC" active-sort>Number</p>
                    <p>Car</p>
                    <p>Name</p>
                    <p data-sort="wins" data-order="DESC">Wins</p>
                    <p data-sort="time" data-order="DESC">Time (seconds)</p>
                </div>
                <div class="table-page" data-page-num=${this.currentPage}>
                </div>
                <div class="winners-table-row">
                    <button class="garage-button winner-change button-green" data-direction="previous">Prev</button>
                    <h2 class="winner-page-header">Page #${this.currentPage}</h2>
                    <button class="garage-button winner-change button-green" data-direction="next">Next</button>
                </div>
            </div>
        </div>
      `
        this.getWinners()
        this.addListneners()
    }
    async getWinners(): Promise<void> {
        const res = (await this.service.requestWinnerPage(this.currentPage, this.sort, this.order)) as Response
        const total = [...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]
        ;(document.querySelector('.winner-count') as HTMLElement).innerHTML = `Winners(${total})`
        this.pageTotal = Math.ceil(Number(total) / 10)
        const arr = await res.json()
        this.showWinners(arr)
    }
    async getTotal(): Promise<void> {
        this.pageTotal = await this.service.requestWinnerTotal()
    }
    async showWinners(winArr: Array<WinnerItem>) {
        const page = document.querySelector('.table-page') as HTMLElement
        page.innerHTML = ``
        page.dataset.pageNum = `${this.currentPage}`
        for (const winner of winArr) {
            await this.drawWinner(winner.id, winner, page)
        }
    }
    async drawWinner(id: number, winner: WinnerItem, page: HTMLElement): Promise<void> {
        const car = (await this.service.requestCar(id)) as CarItem
        page.innerHTML += ` 
            <div data-car-id="${car.id}" class="winners-table-winner winners-table-row">
            <p>${car.id}</p>
            <div class="car winner-car"style="background-color:${car.color}"></div>
            <p>${car.name}</p>
            <p>${winner.wins}</p>
            <p>${winner.time} s</p>
        </div>
            `
    }
    addListneners(): void {
        document.querySelectorAll('[data-sort]')?.forEach((elem) => {
            elem.addEventListener('click', async (e) => {
                document.querySelectorAll('[data-sort]')?.forEach((el) => {
                    el.classList.remove('active-sort')
                })

                const sortCriteria = e.target as HTMLElement
                sortCriteria.classList.add('active-sort')
                this.sort = sortCriteria.dataset.sort as string
                this.order = sortCriteria.dataset.order as string
                sortCriteria.dataset.order = sortCriteria.dataset.order === 'DESC' ? 'ASC' : 'DESC'
                await this.getWinners()
            })
        })
        document.querySelectorAll('.winner-change')?.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.switchPage(`${(e.target as HTMLElement)?.dataset.direction}`)
            })
        })
    }
    switchPage(direction: string): void {
        this.getTotal()
        if (direction === 'next') {
            if (this.currentPage < this.pageTotal) {
                this.currentPage += 1
                this.getWinners()
            } else {
                this.currentPage = 1
                this.getWinners()
            }
        } else {
            if (this.currentPage > 1) {
                this.currentPage -= 1
                this.getWinners()
            } else {
                this.currentPage = this.pageTotal
                this.getWinners()
            }
        }
        ;(document.querySelector('.winner-page-header') as HTMLElement).innerHTML = `
        Page #${this.currentPage}
        `
    }
}
export default WinnersPage
