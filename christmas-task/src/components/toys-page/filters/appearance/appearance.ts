import { DataItem, Filter, FilterObj, FilterVal, Grid } from '../../../interfaces/interfaces'

class Appearance implements Filter {
    data: DataItem[]
    filters: FilterObj
    toyGrid: Grid

    constructor(data: DataItem[], filters: FilterObj, grid: Grid) {
        this.data = data
        this.filters = filters
        this.toyGrid = grid
    }
    addListeners() {
        for (const key in this.filters) {
            const filterToMod = this.filters[key]
            if (filterToMod instanceof Set) {
                document.querySelector(`.${key}`)?.addEventListener('click', (e) => {
                    const evTarget = e.target as HTMLElement
                    if (evTarget.classList.contains('selectable')) {
                        if (evTarget.classList.contains('selected')) {
                            filterToMod.delete(evTarget.dataset.criteria)
                        } else {
                            filterToMod.add(evTarget.dataset.criteria)
                        }
                        evTarget.classList.toggle(`selected`)

                        this.toyGrid.showElems(this.data, this.filters)
                    }
                })
            }
            if (typeof filterToMod === 'boolean') {
                document.querySelector(`.${key}`)?.addEventListener('click', () => {
                    this.filters.favorite = (document.querySelector(`.fav-check`) as HTMLInputElement).checked

                    this.toyGrid.showElems(this.data, this.filters)
                })
            }
        }
    }
}
export default Appearance
