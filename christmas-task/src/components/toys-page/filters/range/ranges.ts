import { DataItem, FilterObj, Grid, RangeFilter } from '../../../interfaces/interfaces'
import 'nouislider/dist/nouislider.css'
import * as noUiSlider from 'nouislider'

class Ranges implements RangeFilter {
    data: DataItem[]
    filters: FilterObj
    toyGrid: Grid

    constructor(data: DataItem[], filters: FilterObj, grid: Grid) {
        this.data = data
        this.filters = filters
        this.toyGrid = grid
    }

    setSliders(filters: FilterObj, grid: Grid, data: DataItem[]) {
        const yearSlider = document.getElementById('year-slider') as noUiSlider.target
        const amountSlider = document.getElementById('amount-slider') as noUiSlider.target

        noUiSlider.create(yearSlider, {
            start: [this.filters.beginYear as number, this.filters.endYear as number],
            behaviour: 'drag',
            step: 1,
            connect: true,
            range: {
                min: 1940,
                max: 2020,
            },
        })
        noUiSlider.create(amountSlider, {
            start: [this.filters.beginAmount as number, this.filters.endAmount as number],
            behaviour: 'drag',
            step: 1,
            connect: true,
            range: {
                min: 1,
                max: 12,
            },
        })
        const yearOutput = [
            document.getElementById('begin-year') as HTMLElement,
            document.getElementById('end-year') as HTMLElement,
        ]
        const amountOutput = [
            document.getElementById('begin-amount') as HTMLElement,
            document.getElementById('end-amount') as HTMLElement,
        ]

        yearSlider?.noUiSlider?.on('slide', function (values, handleBar) {
            yearOutput[handleBar].textContent = values[handleBar].toString().slice(0, 4)
            filters.beginYear = Number(document.getElementById('begin-year')?.textContent)
            filters.endYear = Number(document.getElementById('end-year')?.textContent)
            grid.showElems(data, filters)
        })
        amountSlider?.noUiSlider?.on('slide', function (values, handleBar) {
            amountOutput[handleBar].textContent = values[handleBar].toString().slice(0, 2)
            filters.beginAmount = Number(document.getElementById('begin-amount')?.textContent)
            filters.endAmount = Number(document.getElementById('end-amount')?.textContent)
            grid.showElems(data, filters)
        })
    }
}

export default Ranges
