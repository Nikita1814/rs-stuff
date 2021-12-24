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
        let key: string

        for (key in this.filters) {
            const filterToMod: FilterVal= this.filters[key]
            if (filterToMod instanceof Set) {
                document.querySelector(`.${key}`)?.addEventListener('click', (e) => {
                    if ((e.target as HTMLElement).classList.contains('selectable')) {
                        if ((e.target as HTMLElement).classList.contains('selected')) {
                            ;(filterToMod as Set<string | undefined>).delete((e.target as HTMLElement).dataset.criteria)
                        } else {
                            ;(filterToMod as Set<string | undefined>).add((e.target as HTMLElement).dataset.criteria)
                        }
                        ;(e.target as HTMLElement).classList.toggle(`selected`)

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
    UpdCriterea() {
        return
    }
}
export default Appearance
