import CarController from './garage-car-controller/car-controller'
import { GarageGrid } from './garage-grid/garage-grid'
import GarageMenu from './garage-page-menu/garage-page-menu'
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
export interface CarItem {
    name: string | null
    color: string | null
    id?: number
}
class GaragePage {
    controller: CarController
    garageMenu: GarageMenu
    garageGrid: GarageGrid
    constructor() {
        this.controller = new CarController()
        this.garageGrid = new GarageGrid(this.controller)
        this.garageMenu = new GarageMenu(this.garageGrid, this.controller)
    }
    async render(): Promise<void> {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
        <div class="announcement-overlay hidden">
        <div class="announcement">
        <div class = "announcement-flag"></div>
         <h1 class="announcement-name">Car Won!</h1>
         <h2 class="announcement-seconds">(s)</h2>
         <button class="garage-button button-green close-announcement">Close</button>
        </div>
        </div>
      <div class="garage-page" >
        <div class="garage-menu">
            <div>
                <input type="text" class="create-name"> <input type="color" class="create-color"> <button class="garage-button button-white create-btn">Create</button>
            </div>
            <div>
                <input type="text" class="update-name" disabled> <input type="color" class="update-color"> <button class="garage-button button-white update-btn disabled">Update</button>
            </div>
            <div>
                <button class="garage-button race-btn button-green">Race</button> 
                <button class="garage-button reset-btn button-green inactive">Reset</button> 
                <button class="garage-button generate-btn">Generate Cars</button>
            </div>
        </div>
       <div class="race-timer">Race Timer:12</div>
        <h1 class="car-count">Garage(7)</h1>
        <div class="garage-grid">
        <div data-page-num="1" class="garage-grid-page">
            <h2>Page #1</h2>
            <div data-track-name="Tesla" data-track-id=""class="car-track">
                <div class="car-track-top">
                    <button class="garage-button car-select button-white">Select</button>
                    <button class="garage-button car-remove button-white">Remove</button>
                    <h3 class="car-title">Tesla</h3>
                </div>
                <div class="car-track-bottom">
                    <div class="activation-btns">
                        <button class="activation-btn start-btn">A</button>
                        <button class="activation-btn stop-btn">B</button>
                        </div>
                        <div class="race-car"></div>
                </div>
            </div>
        </div>
        </div>
        <div class="garage-page-controls">
        <button data-direction="prev" class ="garage-button button-green">Previous</button>
        <button data-direction="next" class ="garage-button button-green">Next</button>
        </div>
    </div>
      `
        await this.garageGrid.render().then(() => {
            this.addControls()
        })

        this.addListeners()
    }
    addListeners(): void {
        this.garageGrid.addListeners()
        this.garageMenu.addListeners()
        document.querySelector('.close-announcement')?.addEventListener('click', () => {
            document.querySelector('.announcement-overlay')?.classList.add('hidden')
        })
        document.querySelector('.create-btn')?.addEventListener('click', () => {
            this.garageMenu
                .createCar(
                    new Car(
                        (document.querySelector('.create-name') as HTMLInputElement).value,
                        (document.querySelector('.create-color') as HTMLInputElement).value
                    )
                )
                .then(async () => {
                    await this.garageGrid.render()
                    this.addControls()
                })
        })
        document.querySelector('.update-btn')?.addEventListener('click', () => {
            this.garageMenu
                .updateCar(
                    new Car(
                        (document.querySelector('.update-name') as HTMLInputElement).value,
                        (document.querySelector('.update-color') as HTMLInputElement).value
                    ),
                    (this.garageMenu.selectedCar as CarItem).id as number
                )
                .then(async () => {
                    await this.garageGrid.render()
                    this.addControls()
                })
        })
        document.querySelector('.generate-btn')?.addEventListener('click', () => {
            this.garageMenu.generateCars(this.garageMenu.carBrands, this.garageMenu.carModels)
        })
    }
    addControls(): void {
        document.querySelectorAll('.car-select').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.garageMenu.selectCar(Number((e.target as HTMLElement).dataset.select))
            })
        })
        document.querySelectorAll('.car-remove').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.garageMenu.deleteCar(Number((e.target as HTMLElement).dataset.delete)).then(async () => {
                    await this.garageGrid.render()
                    this.addControls()
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
                    this.controller.startCarManual(
                        Number((el as HTMLElement).dataset.carId),
                        target.dataset.status as 'started' | 'stopped'
                    )
                }
            })
        })
    }

    switchPage(direction: string): void {
        direction === 'next' && this.garageGrid.currentPage
    }
}
export { GaragePage, Car }
