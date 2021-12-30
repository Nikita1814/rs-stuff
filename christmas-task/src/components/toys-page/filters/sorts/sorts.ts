import { Toy, Filter, FilterObj, Grid } from '../../../interfaces/interfaces'

class Sorts implements Filter {
    data: Toy[]
    filters: FilterObj
    toyGrid: Grid

    constructor(data: Toy[], filters: FilterObj, grid: Grid) {
        this.data = data
        this.filters = filters
        this.toyGrid = grid
    }
    addListeners() {
        document.querySelector(`.sorts`)?.addEventListener('change', (e) => {
            this.filters.sort = (e.target as HTMLSelectElement).value
            this.toyGrid.showElems(this.data, this.filters)
        })

        document.querySelector(`.search`)?.addEventListener('input', (e) => {
            this.filters.search = (e.target as HTMLInputElement).value.toLowerCase()

            this.toyGrid.showElems(this.data, this.filters)
        })
    }
}
export default Sorts
