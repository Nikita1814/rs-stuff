import { CarItem } from '../../Interfaces/interfaces'

class Car{
name:string
color:string
constructor(name:string, color:string){
    this.name = name 
    this.color = color
}    
}
class GarageGrid {
    currentPage: number
    pageTotal: number
    carBrands: Array<string>
    carModels: Array<string>
    constructor() {
        this.currentPage = 1
        this.pageTotal = 7
        this.carBrands = [`Toyota`, `BMW`, `Mercedes`, `Audi`, `Kia`, `Hyundai`, `Tesla`, `Renaul`, `Ford`, `Honda`]
        this.carModels = ['Rio', 'Focus', 'Kalina', 'Vesta', 'Spark', 'Lacetti', 'Nexia', 'Matiz', 'Cobalt', 'Captiva']
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
    }
    addControls() {
        console.log('I started working')
        document.querySelectorAll('.activation-btns').forEach((el) => {
            el.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                if (target.classList.contains('activation-btn') && !target.classList.contains('car-control-active')) {
                    console.log('a button was clicked')
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
                            console.log('engine was started')
                            this.animateCar(car, res.distance, res.velocity)
                            console.log(car.getAnimations())
                            this.toggleDrive(carId)
                                .then(() => {
                                    console.log('car passed finishline successfully')
                                    this.toggleEngine(carId, 'stopped')
                                })

                                .catch((err) => {
                                    if (err) {
                                        console.log('engine broke down')
                                        car.getAnimations()[0].pause()
                                        this.toggleEngine(Number((el as HTMLElement).dataset.carId), 'stopped')
                                    }
                                })
                        } else {
                            car.getAnimations().forEach((anim) => anim.cancel())
                            car.style.transform = 'translateX(0px)'
                            console.log('car sucessfully returned to orig position')
                        }
                    })
                }
            })
        })
    }
    async getTotal() {
        const res = await fetch(`http://127.0.0.1:3000/garage?_limit=7`)
        this.pageTotal = Math.ceil(Number([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]) / 2)
        console.log(this.pageTotal)
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
        console.log(`animation func started, duration = ${distance / velocity} `)
        const finishline = ((document.querySelector('.car-track-bottom') as HTMLElement).offsetWidth / 100) * 80
        car.addEventListener('animationend', () => {})
        car.addEventListener('animationstart', () => {
            console.log('animation started')
        })
        console.log(car.getBoundingClientRect().left)
        const anim = car.animate(
            [
                /*{transform: `translateX(${car.getBoundingClientRect().left}px)`},*/ {
                    transform: `translateX(${finishline}px)`,
                },
            ],
            {
                duration: distance / velocity,
                easing: 'ease-in',
            }
        )
        anim.onfinish = () => {
            console.log('animation finished successfully')
            car.style.transform = `translateX(${finishline}px)`
        }
    }
    generateCars(brands:Array<String>, models:Array<String>) {
        console.log('started generating cars')
        for (let i = 1; i < 100; i++) {
            let car = new Car(`${brands[Math.floor(Math.random() * 9)]} ${models[Math.floor(Math.random() * 9)]}` , `#${Math.floor(Math.random()*16777215).toString(16)}`)
            console.log('car generated')
            this.createCar(car)
        }
        this.render()
    }
    async createCar(car: CarItem) {
        const res = await fetch(`http://127.0.0.1:3000/garage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })
        if (res.ok) {
            console.log('all guchi')
        }
    }
}
export default GarageGrid
