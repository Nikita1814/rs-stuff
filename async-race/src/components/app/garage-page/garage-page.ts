import ApiService from '../api-service/api-service'
import CarController from './garage-car-controller/car-controller'
import { GarageGrid } from './garage-grid/garage-grid'
import GarageMenu from './garage-page-menu/garage-page-menu'

class GaragePage {
  controller: CarController
  garageMenu: GarageMenu
  garageGrid: GarageGrid
  service: ApiService
  constructor(service: ApiService) {
    this.service = service
    this.controller = new CarController(this.service)
    this.garageGrid = new GarageGrid(this.controller, this.service)
    this.garageMenu = new GarageMenu(this.garageGrid, this.controller, this.service)
  }
  async render(): Promise<void> {
    document.querySelector('.main').innerHTML = `
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
    await this.garageGrid.render()
    this.addControls()
    this.addListeners()
  }
  addListeners(): void {
    document.querySelector('.garage-page-controls')?.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement
      if (target.dataset.direction) {
        await this.garageGrid.switchPage(target.dataset.direction)
        this.addControls()
      }
    })
    this.garageMenu.addListeners()
    document.querySelector('.close-announcement')?.addEventListener('click', () => {
      document.querySelector('.announcement-overlay')?.classList.add('hidden')
    })
    document.querySelector('.create-btn')?.addEventListener('click', async () => {
      await this.service.requestCreate({
        name: (document.querySelector('.create-name') as HTMLInputElement).value,
        color: (document.querySelector('.create-color') as HTMLInputElement).value,
      })
      await this.garageGrid.render()
      this.addControls()
    })
    document.querySelector('.update-btn')?.addEventListener('click', async () => {
      await this.garageMenu.updateCar(
        {
          name: (document.querySelector('.create-name') as HTMLInputElement).value,
          color: (document.querySelector('.create-color') as HTMLInputElement).value,
        },
        this.garageMenu.selectedCar.id as number
      )

      await this.garageGrid.render()
      this.addControls()
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
      btn.addEventListener('click', async (e) => {
        await this.service.requestDelete(Number((e.target as HTMLElement).dataset.delete))
        await this.garageGrid.render()
        this.addControls()
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
export { GaragePage }
