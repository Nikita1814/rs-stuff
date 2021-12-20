import { DataItem, FilterObj, Grid, RangeFilter } from '../../../interfaces/interfaces'
import 'nouislider/dist/nouislider.css'
import * as noUiSlider from 'nouislider'
class Ranges implements RangeFilter {
    data: Array<DataItem>
    filters: FilterObj
    toyGrid: Grid

    constructor(data: Array<DataItem>, filters: FilterObj, grid: Grid) {
        this.data = data
        this.filters = filters
        this.toyGrid = grid
    }

    setSliders(filters: FilterObj, grid: Grid, data: Array<DataItem>) {
        const yearSlider: noUiSlider.target = document.getElementById('year-slider') as HTMLElement as noUiSlider.target
        const amountSlider: noUiSlider.target = document.getElementById(
            'amount-slider'
        ) as HTMLElement as noUiSlider.target

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

        yearSlider?.noUiSlider?.on('slide', function (values, handle: number) {
            yearOutput[handle].innerHTML = values[handle].toString().slice(0, 4)
            filters.beginYear = Number(document.getElementById('begin-year')?.textContent)
            filters.endYear = Number(document.getElementById('end-year')?.textContent)
            grid.showElems(data, filters)
            /*console.log( 1960 > filters.beginYear && 1960 < filters.endYear)
  console.log(filters.endYear)*/
        })
        amountSlider?.noUiSlider?.on('update', function (values, handle: number) {
            amountOutput[handle].innerHTML = values[handle].toString().slice(0, 2)
            filters.beginAmount = Number(document.getElementById('begin-amount')?.textContent)
            filters.endAmount = Number(document.getElementById('end-amount')?.textContent)
            grid.showElems(data, filters)
        })
    }
}

export default Ranges
