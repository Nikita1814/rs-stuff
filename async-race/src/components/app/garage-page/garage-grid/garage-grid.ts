import CarController from '../garage-car-controller/car-controller'
import { CarItem } from '../garage-page'

class GarageGrid {
    currentPage: number
    pageTotal: number
    controller: CarController
    constructor(controller: CarController) {
        this.controller = controller
        this.currentPage = 1
        this.pageTotal = 7
    }
    async render(): Promise<void> {
        await this.getTotal()
        await this.getCars()
    }
    addListeners(): void {
        document.querySelector('.garage-page-controls')?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (target.dataset.direction) {
                this.switchPage(target.dataset.direction)
            }
        })
    }

    async getTotal(): Promise<void> {
        const res = await fetch(`http://127.0.0.1:3000/garage?_limit=7`)
        this.pageTotal = Math.ceil(Number([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]) / 7)
    }
    async getCars() {
        const res = await fetch(`http://127.0.0.1:3000/garage?_page=${this.currentPage}&_limit=7`)
        if (res.ok) {
            ;(document.querySelector('.car-count') as HTMLElement).innerHTML = `Garage(${
                [...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]
            })`
            const arr = await res.json()
            this.showCars(arr)
        }
    }
    showCars(arr: Array<CarItem>): void {
        const page = document.querySelector('.garage-grid-page') as HTMLElement
        page.dataset.pageNum = `${this.currentPage}`
        page.innerHTML = `<h2>Page #${this.currentPage}</h2>`
        arr.forEach((car: CarItem) => {
            page.innerHTML += `
        <div data-track-name=${car.name} data-track-id=${car.id} class="car-track">
        <div class="car-track-top">
            <button data-select=${car.id} class="garage-button car-select button-white">Select</button>
            <button data-delete=${car.id} class="garage-button car-remove button-white">Remove</button>
            <h3 class="car-title">${car.name}</h3>
        </div>
        <div class="car-track-bottom">
            <div data-track-name=${car.name} data-car-id=${car.id} class="activation-btns">
                <button data-status="started" class="activation-btn start-btn">A</button>
                <button data-status="stopped" class="activation-btn stop-btn car-control-active">B</button>
                </div>
                <div class="race-car" style="background-color:${car.color};"></div>
        </div>
    </div>
        `
        })
    }
    switchPage(direction: string): void {
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

export { GarageGrid }
