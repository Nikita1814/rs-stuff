import CarController from '../garage-car-controller/car-controller'
import { GarageGrid } from '../garage-grid/garage-grid'
import { CarItem, Car } from '../garage-page'

class GarageMenu {
    grid: GarageGrid
    selectedCar: CarItem | null
    controller: CarController
    carBrands: Array<string>
    carModels: Array<string>
    constructor(garageGrid: GarageGrid, controller: CarController) {
        this.grid = garageGrid
        this.controller = controller
        this.carBrands = [`Toyota`, `BMW`, `Mercedes`, `Audi`, `Kia`, `Hyundai`, `Tesla`, `Renaul`, `Ford`, `Honda`]
        this.carModels = ['Rio', 'Focus', 'Kalina', 'Vesta', 'Spark', 'Lacetti', 'Nexia', 'Matiz', 'Cobalt', 'Captiva']
        this.selectedCar = null
    }
    addListeners(): void {
        document.querySelector('.race-btn')?.addEventListener('click', () => {
            if (!document.querySelector('.race-btn')?.classList.contains('inactive')) {
                document.querySelector('.race-btn')?.classList.add('inactive')
                document.querySelector('.reset-btn')?.classList.remove('inactive')
                this.controller.beginRace()
            }
        })
        document.querySelector('.reset-btn')?.addEventListener('click', () => {
            if (!document.querySelector('.reset-btn')?.classList.contains('inactive')) {
                this.controller.resetRace()
                document.querySelector('.race-btn')?.classList.remove('inactive')
                document.querySelector('.reset-btn')?.classList.add('inactive')
            }
        })
    }
    generateCars(brands: Array<string>, models: Array<string>): void {
        for (let i = 1; i < 100; i++) {
            const car = new Car(
                `${brands[Math.floor(Math.random() * 9)]} ${models[Math.floor(Math.random() * 9)]}`,
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
            )
            this.createCar(car)
        }
        this.grid.render()
    }
    async createCar(car: CarItem): Promise<void> {
        await fetch(`http://127.0.0.1:3000/garage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })
    }
    async deleteCar(id: number): Promise<void> {
        await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        })
        const res = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
            method: 'GET',
        })
        if (res.ok) {
            await fetch(`http://127.0.0.1:3000/winners/${id}`, {
                method: 'DELETE',
            })
        }
    }
    async selectCar(id: number): Promise<void> {
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
    async updateCar(car: CarItem, id: number): Promise<void> {
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
}
export default GarageMenu
