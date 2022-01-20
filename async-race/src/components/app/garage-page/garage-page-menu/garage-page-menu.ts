import { CarItem } from '../../Interfaces/interfaces'
import { GarageGrid, Car } from '../garage-grid/garage-grid'

class GarageMenu {
    grid: GarageGrid
    constructor(garageGrid: GarageGrid) {
        this.grid = garageGrid
    }
    addListeners() {
        document.querySelector('.create-btn')?.addEventListener('click', () => {
            this.grid
                .createCar(
                    new Car(
                        (document.querySelector('.create-name') as HTMLInputElement).value,
                        (document.querySelector('.create-color') as HTMLInputElement).value
                    )
                )
                .then(() => {
                    this.grid.render()
                })
        })
        document.querySelector('.update-btn')?.addEventListener('click', () => {
            this.grid
                .updateCar(
                    new Car(
                        (document.querySelector('.update-name') as HTMLInputElement).value,
                        (document.querySelector('.update-color') as HTMLInputElement).value
                    ),
                    (this.grid.selectedCar as CarItem).id as number
                )
                .then(() => {
                    this.grid.render()
                })
        })
    }
}
export default GarageMenu
