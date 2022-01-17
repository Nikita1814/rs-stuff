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
    addControls() {
        console.log('I started working')

        document.querySelectorAll('.activation-btns').forEach((el) => {
            el.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                if (target.classList.contains('activation-btn') && !target.classList.contains('car-control-active')) {
                    el.querySelectorAll(`.activation-btn`).forEach((btn) => {
                        btn.classList.toggle(`car-control-active`)
                    })
                    this.toggleEngine(
                        Number((el as HTMLElement).dataset.carId),
                        target.dataset.status as 'started' | 'stopped'
                    )
                    if (target.dataset.status === 'started') {
                        this.toggleDrive(Number((el as HTMLElement).dataset.carId)).catch((err) => {
                            console.log(err)
                            el.querySelectorAll(`.activation-btn`).forEach((btn) => {
                                btn.classList.toggle(`car-control-active`)
                            })
                            this.toggleEngine(Number((el as HTMLElement).dataset.carId), 'stopped')
                        })
                    }
                }
            })
        })
    }
    async getTotal() {
        const res = await fetch(`http://127.0.0.1:3000/garage?_limit=2`)
        this.pageTotal = Math.ceil(Number([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]) / 2)
        console.log(this.pageTotal)
    }
    async getCars() {
        const res = await fetch(`http://127.0.0.1:3000/garage?_page=${this.currentPage}&_limit=2`)
        if (res.ok) {
            ;(document.querySelector('.car-count') as HTMLElement).innerHTML = `Garage(${
                [...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]
            })`
            const arr = await res.json()
            this.showCars(arr)
        } else {
            console.log('an error occured')
        }
    }
    showCars(arr: Array<CarItem>) {
        const page = document.querySelector('.garage-grid-page') as HTMLElement
        page.dataset.pageNum = `${this.currentPage}`
        page.innerHTML = `<h2>Page #${this.currentPage}</h2>`
        arr.forEach((car: CarItem) => {
            page.innerHTML += `
        <div data-track-name=${car.name} data-track-id=${car.id} class="car-track">
        <div class="car-track-top">
            <button class="garage-button car-select button-white">Select</button>
            <button class="garage-button car-remove button-white">Remove</button>
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
            this.addControls()

            /* btn?.addEventListener('click',(e) =>{
            const target = e.target as HTMLElement
            console.log(target)
            track?.querySelectorAll(`.activation-btn`).forEach((b) =>{
                b.classList.toggle( `car-control-active`)
            })
            /*const stats = this.ToggleEngine(car, target.dataset.status as 'started' | 'stopped')
            console.log(stats)*/
            // })
        })
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
    async toggleEngine(carId: number, status: 'started' | 'stopped') {
        const res = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=${status}`, {
            method: 'PATCH',
        })
        if (res.ok) {
            console.log(await res.json())
        }
    }
    async toggleDrive(carId: number) {
        const resTwo = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=drive`, {
            method: 'PATCH',
        })
        if (resTwo.status === 500) {
            throw new Error('It broke :o')
        }
        if (resTwo.ok) {
            document
                .querySelector(`[data-car-id="${carId}"]`)
                ?.querySelectorAll(`.activation-btn`)
                .forEach((btn) => {
                    btn.classList.toggle(`car-control-active`)
                })
            this.toggleEngine(carId, 'stopped')
        }
    }
}
export default GarageGrid
