import { CarItem } from '../../Interfaces/interfaces'
import { GarageGrid, Car } from '../garage-grid/garage-grid'

class GarageMenu {
    grid: GarageGrid
    carToUpdate: Car
    carToCreate: Car
    constructor(garageGrid: GarageGrid) {
        this.grid = garageGrid
        this.carToCreate = new Car(null, null)
        this.carToUpdate = new Car(null, null)
    }
    addListeners() {
        document.querySelector('.create-btn')?.addEventListener('click', () => {
            this.grid.createCar(
                new Car(
                    (document.querySelector('.create-name') as HTMLInputElement).value,
                    (document.querySelector('.create-color') as HTMLInputElement).value
                )
            )
            this.grid.render()
        })
    }
}
export default GarageMenu
