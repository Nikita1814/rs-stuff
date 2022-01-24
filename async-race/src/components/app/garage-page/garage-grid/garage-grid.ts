import { CarItem } from '../../Interfaces/interfaces'

class Car {
    name: string | null
    color: string | null
    constructor(name: string | null, color: string | null) {
        this.name = name
        this.color = color
    }
}
export interface WinnerItem {
    id: number
    wins: number
    time: number
}
class GarageGrid {
    currentPage: number
    pageTotal: number
    carBrands: Array<string>
    carModels: Array<string>
    selectedCar: CarItem | null
    winner: WinnerItem | null
    raceStatus: boolean
    constructor() {
        this.currentPage = 1
        this.pageTotal = 7
        this.carBrands = [`Toyota`, `BMW`, `Mercedes`, `Audi`, `Kia`, `Hyundai`, `Tesla`, `Renaul`, `Ford`, `Honda`]
        this.carModels = ['Rio', 'Focus', 'Kalina', 'Vesta', 'Spark', 'Lacetti', 'Nexia', 'Matiz', 'Cobalt', 'Captiva']
        this.selectedCar = null
        this.winner = null
        this.raceStatus = false
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
        document.querySelector('.generate-btn')?.addEventListener('click', () => {
            this.generateCars(this.carBrands, this.carModels)
        })
        document.querySelector('.race-btn')?.addEventListener('click', () => {
            if (!document.querySelector('.race-btn')?.classList.contains('inactive')) {
                this.beginRace()
                document.querySelector('.race-btn')?.classList.add('inactive')
                document.querySelector('.reset-btn')?.classList.remove('inactive')
            }
            
        })
        document.querySelector('.reset-btn')?.addEventListener('click', () => {
            if (!document.querySelector('.reset-btn')?.classList.contains('inactive')) {
                this.resetRace()
                document.querySelector('.race-btn')?.classList.remove('inactive')
                document.querySelector('.reset-btn')?.classList.add('inactive')
            }
        })
    }
    addControls() {
        document.querySelectorAll('.car-select').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.selectCar(Number((e.target as HTMLElement).dataset.select))
            })
        })
        document.querySelectorAll('.car-remove').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.deleteCar(Number((e.target as HTMLElement).dataset.delete)).then(() => {
                    this.render()
                })
            })
        })
        document.querySelectorAll('.activation-btns').forEach((el) => {
            el.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                if (target.classList.contains('activation-btn') && !target.classList.contains('car-control-active')) {
                    el.querySelectorAll(`.activation-btn`).forEach((btn) => {
                        btn.classList.toggle(`car-control-active`)
                    })
                    const track = document.querySelector(
                        `[data-track-id="${(el as HTMLElement).dataset.carId}"]`
                    ) as HTMLElement
                    const carId = Number((el as HTMLElement).dataset.carId)
                    const car = track.querySelector('.race-car') as HTMLElement
                    this.toggleEngine(carId, target.dataset.status as 'started' | 'stopped').then((res) => {
                        if (target.dataset.status === 'started') {
                            this.animateCar(car, res.distance, res.velocity)
                            this.toggleDrive(carId)
                                .then(() => {
                                    this.toggleEngine(carId, 'stopped')
                                })

                                .catch((err) => {
                                    if (err) {
                                        car.getAnimations()[0].pause()
                                        this.toggleEngine(Number((el as HTMLElement).dataset.carId), 'stopped')
                                    }
                                })
                        } else {
                            car.getAnimations().forEach((anim) => anim.cancel())
                            car.style.transform = 'translateX(0px)'
                        }
                    })
                }
            })
        })
    }

    async getTotal() {
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
        } else {
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
            this.addControls()
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
            return await res.json()
        }
    }
    async toggleDrive(carId: number) {
        const resTwo = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=drive`, {
            method: 'PATCH',
        })
        if (resTwo.status === 500) {
            throw new Error('500')
        }
        if (resTwo.ok) {
            return resTwo
        }
    }
    animateCar(car: HTMLElement, distance: number, velocity: number) {
        const finishline = ((document.querySelector('.car-track-bottom') as HTMLElement).offsetWidth / 100) * 76
        /*const finishline = window.screen.width/100 * 90*/
        const anim = car.animate(
            [
                {
                    transform: `translateX(${finishline}px)`,
                },
            ],
            {
                duration: distance / velocity,
                easing: 'ease-in',
            }
        )
        anim.onfinish = () => {
            car.style.transform = `translateX(${finishline}px)`
        }
    }
    generateCars(brands: Array<string>, models: Array<string>) {
        for (let i = 1; i < 100; i++) {
            const car = new Car(
                `${brands[Math.floor(Math.random() * 9)]} ${models[Math.floor(Math.random() * 9)]}`,
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
            )
            this.createCar(car)
        }
        this.render()
    }
    async createCar(car: CarItem) {
        await fetch(`http://127.0.0.1:3000/garage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })
    }
    async beginRace() {
        document.querySelector('.header-cover')?.classList.remove('hidden')
        this.raceStatus = true;
        const elemArr = [...document.querySelectorAll('.car-track')]
        const promisArr: Array<Promise<void>> = elemArr.map((track) => {
            track.querySelector(`.start-btn`)?.classList.add(`car-control-active`)
            track.querySelector(`.stop-btn`)?.classList.remove(`car-control-active`)
            const carId = Number((track as HTMLElement).dataset.trackId)
            const car = track.querySelector('.race-car') as HTMLElement
            return this.startCarRace(carId, car)
        })
        Promise.all(promisArr).then(() => {
            console.log('race is done now')
            document.querySelector('.header-cover')?.classList.add('hidden')
            console.log('cover removed')
        })
    }
    resetRace() {
        this.winner = null
        this.raceStatus = false
        console.log(this.winner)
        document.querySelectorAll('.car-track').forEach((track) => {
            track.querySelector(`.start-btn`)?.classList.remove(`car-control-active`)
            track.querySelector(`.stop-btn`)?.classList.add(`car-control-active`)
            const car = track.querySelector('.race-car') as HTMLElement
            car.getAnimations().forEach((anim) => anim.cancel())
            this.toggleEngine(Number((track as HTMLElement).dataset.trackId), 'stopped')
            car.style.transform = 'translateX(0px)'
        })
    }
    async deleteCar(id: number) {
        await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        })

        await fetch(`http://127.0.0.1:3000/winners/${id}`, {
            method: 'DELETE',
        })
    }
    async selectCar(id: number) {
        const res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'GET',
        })
        if (res.ok) {
            this.selectedCar = await res.json()
            document.querySelector('.update-name')?.removeAttribute('disabled')
            document.querySelector('.update-btn')?.removeAttribute('disabled')
            ;(document.querySelector('.update-name') as HTMLInputElement).value = this.selectedCar?.name as string
            ;(document.querySelector('.update-color') as HTMLInputElement).value = this.selectedCar?.color as string
        }
    }
    async updateCar(car: CarItem, id: number) {
        const res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })
        if (res.ok) {
            this.selectedCar = null
            document.querySelector('.update-name')?.setAttribute('disabled', 'dsiabled')
            document.querySelector('.update-btn')?.setAttribute('disabled', 'disabled')
            ;(document.querySelector('.update-name') as HTMLInputElement).value = ''
            ;(document.querySelector('.update-color') as HTMLInputElement).value = '#000000'
        }
    }
    addWinner(carID: number, time: number) {
        if (this.winner === null) {
            this.winner = {
                id: carID,
                wins: 1,
                time: time,
            }
            this.showAnnouncement(this.winner)
            this.handleWinner(this.winner)
        }
        return
    }
    async handleWinner(winner: WinnerItem) {
        winner = winner as WinnerItem
        const res = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
            method: 'GET',
        })
        if (res.ok) {
            const windata = await res.json()
            await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wins: windata.wins + 1,
                    time: Math.min(windata.time, winner.time),
                }),
            })
        } else {
            await fetch(`http://127.0.0.1:3000/winners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(winner),
            })
        }
    }
    async startCarRace(carId: number, car: HTMLElement) {
        await this.toggleEngine(carId, 'started').then((res) => {
            this.animateCar(car, res.distance, res.velocity)
            this.toggleDrive(carId)
                .then(() => {
                    this.toggleEngine(carId, 'stopped')
                    if (this.winner === null && window.location.hash === '#garage' && this.raceStatus === true) {
                        console.log(window.location)
                        this.addWinner(carId, Math.round(res.distance / res.velocity / 1000))
                        this.raceStatus = false
                    }
                })

                .catch((err) => {
                    if (err) {
                        car.getAnimations()[0].pause()
                        this.toggleEngine(carId, 'stopped')
                    }
                })
        })
    }
    showAnnouncement(car: WinnerItem) {
        const carName = (document.querySelector(`[data-car-id="${car.id}"]`) as HTMLElement)?.dataset.trackName
        document.querySelector('.announcement-overlay')?.classList.remove('hidden')
        ;(document.querySelector('.announcement-name') as HTMLElement).innerHTML = `${carName} Won!`
        ;(document.querySelector('.announcement-seconds') as HTMLElement).innerHTML = `${
            (this.winner as WinnerItem).time
        } s`
    }
}

export { GarageGrid, Car }
