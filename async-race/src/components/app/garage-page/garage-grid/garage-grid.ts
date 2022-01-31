import ApiService from '../../api-service/api-service'
import CarController from '../garage-car-controller/car-controller'
import { CarItem } from '../../interfaces'

class GarageGrid {
  currentPage: number
  pageTotal: number
  controller: CarController
  service: ApiService
  constructor(controller: CarController, service: ApiService) {
    this.service = service
    this.controller = controller
    this.currentPage = 1
    this.pageTotal = 7
  }
  async render(): Promise<void> {
    await this.getTotal()
    await this.getCars()
  }
  async getTotal(): Promise<void> {
    this.pageTotal = await this.service.requestTotal()
  }
  async getCars() {
    const res = await this.service.requestCars(this.currentPage)
    document.querySelector('.car-count').innerHTML = `Garage(${
      [...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]
    })`
    const arr = await res.json()
    this.showCars(arr)
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
  async switchPage(direction: string): Promise<void> {
    if (direction === 'next') {
      this.getTotal()
      if (this.currentPage < this.pageTotal) {
        this.currentPage += 1
        await this.getCars()
      } else {
        this.currentPage = 1
        await this.getCars()
      }
    } else {
      this.getTotal()
      if (this.currentPage > 1) {
        this.currentPage -= 1
        await this.getCars()
      } else {
        this.currentPage = this.pageTotal
        await this.getCars()
      }
    }
  }
}

export { GarageGrid }
