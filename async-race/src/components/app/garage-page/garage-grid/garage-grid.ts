import { CarItem } from '../../Interfaces/interfaces'

class GarageGrid {
    currentPage: number
    pageTotal: number
    constructor() {
        this.currentPage = 1
        this.pageTotal = 7
    }
    render() {
        this.getTotal()
        this.getCars()
    }
    addListeners() {
        document.querySelector('.garage-page-controls')?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (target.dataset.direction) {
                this.switchPage(target.dataset.direction)
            }
        })
    }
    async getTotal() {
        const res = await fetch(`http://127.0.0.1:3000/garage?_limit=2`)
        this.pageTotal = Math.ceil(Number([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1])/2)
        console.log(this.pageTotal)
    }
    async getCars() {
        const res = await fetch(`http://127.0.0.1:3000/garage?_page=${this.currentPage}&_limit=2`)
        if (res.ok) {
            (document.querySelector('.car-count') as HTMLElement).innerHTML = `Garage(${
                [...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]
            })`;
            const arr = await res.json()
            const page = document.querySelector('.garage-grid-page') as HTMLElement
            page.dataset.pageNum = `${this.currentPage}`
            page.innerHTML = `<h2>Page #${this.currentPage}</h2>`
            arr.forEach((car: CarItem) => {
                page.innerHTML += `
            <div data-track-name=${car.name} data-track-id=${car.id}class="car-track">
            <div class="car-track-top">
                <button class="garage-button car-select button-white">Select</button>
                <button class="garage-button car-remove button-white">Remove</button>
                <h3 class="car-title">${car.name}</h3>
            </div>
            <div class="car-track-bottom">
                <div class="activation-btns">
                    <button class="activation-btn start-btn">A</button>
                    <button class="activation-btn stop-btn">B</button>
                    </div>
                    <div class="race-car" style="background-color:${car.color};"></div>
            </div>
        </div>
            `
            })
        } else {
            console.log('an error occured')
        }
    }
    switchPage(direction: string) {
        if (direction === 'next') {
            this.getTotal()
            if (this.currentPage < this.pageTotal) {
                this.currentPage += 1
                this.getCars()
            } else {
                this.currentPage = 1
                this.getCars()
            }
        } else {
            this.getTotal()
            if (this.currentPage > 1) {
                this.currentPage -= 1
                this.getCars()
            } else {
                this.currentPage = this.pageTotal
                this.getCars()
            }
        }
    }
}
export default GarageGrid
