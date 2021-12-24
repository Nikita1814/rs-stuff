import { DataItem, Grid, Toys, Filter, RangeFilter } from '../interfaces/interfaces'
import type { FilterObj } from '../interfaces/interfaces'
import ToyGrid from './toy-grid/toy-grid'

import 'nouislider/dist/nouislider.css'

import Appearance from './filters/appearance/appearance'
import Ranges from './filters/range/ranges'
import Sorts from './filters/sorts/sorts'

class ToysPage implements Toys {
    public toyGrid: Grid
    public filters: FilterObj
    public data: Array<DataItem>
    public appearance: Filter
    public ranges: RangeFilter
    public sorts: Filter
    public origData: Array<DataItem>

    constructor(data: Array<DataItem>) {
        this.filters = {
            shape: new Set(),
            color: new Set(),
            size: new Set(),
            favorite: false,
            sort: 'AZ',
            search: '',
            beginYear: 1940,
            endYear: 2020,
            beginAmount: 1,
            endAmount: 12,
        }
        if (localStorage.getItem('filters')) {
            this.filters = JSON.parse(localStorage.getItem('filters') as string)
            this.filters.shape = new Set(this.filters.shape as Array<'string'>)
            this.filters.size = new Set(this.filters.size as Array<'string'>)
            this.filters.color = new Set(this.filters.color as Array<'string'>)
        }
        this.data = data
        this.origData = data
        if (localStorage.getItem('data')) {
            this.data = JSON.parse(localStorage.getItem('data') as string)
        }

        this.toyGrid = new ToyGrid(this.data)
        this.appearance = new Appearance(this.data, this.filters, this.toyGrid)
        this.ranges = new Ranges(this.data, this.filters, this.toyGrid)
        this.sorts = new Sorts(this.data, this.filters, this.toyGrid)
    }
    render(data: Array<DataItem>) {
        const main = document.querySelector('.main') as HTMLElement
        main.innerHTML = ` 
<div class="page toys-page">
<div class="criteria">
  <div class=" filter appearance-criteria">
    <h2>Фильтры по значению</h2>
    <div class="shape">
      <p>Форма</p>
      <div data-criteria="шар" id="ball" class="selectable"></div>
      <div data-criteria="колокольчик" id="bell" class="selectable"></div>
      <div data-criteria="шишка" id="cone" class="selectable"></div>
      <div data-criteria="снежинка" id="snowflake" class="selectable"></div>
      <div data-criteria="фигурка" id="figurine" class="selectable"></div>
    </div>
    <div class="color">
      <p>Цвет</p>
      <div data-criteria="белый" id="white" class="selectable"></div>
      <div data-criteria="желтый" id="yellow" class="selectable"></div>
      <div data-criteria="красный" id="red" class="selectable"></div>
      <div data-criteria="синий" id="blue" class="selectable"></div>
      <div data-criteria="зелёный" id="green" class="selectable"></div>
    </div>
    <div class="size">
      <p>Размер</p>
      <div data-criteria="большой" id="big" class="selectable"></div>
      <div data-criteria="средний" id="medium" class="selectable"></div>
      <div data-criteria="малый" id="small" class="selectable"></div>
    </div>
    <div class="favorite">
      <span>Только любимые:</span><input type="checkbox" class="fav-check">
    </div>
  </div>
  <div class="filter range-criteria">
  <div>
    <h2>Год приобретения</h2>
      <div id="year-slider"></div>
    <div class="outputs">
      <div class="output" id="begin-year">${this.filters.beginYear}</div>
      <div class="output" id="end-year">${this.filters.endYear}</div>
    </div>
 </div>
 <div>
    <h2>Количество экземпляров</h2>
      <div id="amount-slider"></div>
    <div class="outputs">
     <div class="output" id="begin-amount">${this.filters.beginAmout}</div>
     <div class="output" id="end-amount">${this.filters.endAmout}</div>
    </div>
</div>
  </div>
  <div class="filter sorting-criteria">
    <h2>Сортировка</h2>
    <select name="sorts" class="sorts">
      <option value="AZ"> По назывнию от А до Я</option>
      <option value="ZA"> По назывнию от Я до А</option>
      <option value="decrease"> По количеству по убыванию</option>
      <option value="increase"> По количеству по возрастанию</option>
      <input type="search" class="search" autocomplete="off" placeholder="По имени">
    </select>
    <button class="reset">Сброс</button>
    <button class="reset-all"> Сбросить Хранилище</button>
  </div>
</div>
 <div class="toys-grid">
    </div>
</div>
</div>`

        this.handleStorage(this.filters)
        this.toyGrid.showElems(this.data, this.filters)
        this.addListeners()
    }
    handleStorage(filters: FilterObj) {
        ;(document.querySelector(`.favorite-count`) as HTMLElement).innerHTML = String(
            this.data.reduce((acc: number, n: DataItem) => {
                if (n.favorite === true) {
                    return acc + 1
                } else return acc
            }, 0)
        )
        ;(filters.size as Set<string>).forEach((el) => {
            document.querySelector(`[data-criteria=${el}]`)?.classList.add('selected')
        })
        ;(filters.shape as Set<string>).forEach((el) => {
            document.querySelector(`[data-criteria=${el}]`)?.classList.add('selected')
        })
        ;(filters.color as Set<string>).forEach((el) => {
            document.querySelector(`[data-criteria=${el}]`)?.classList.add('selected')
        })

        document.querySelector(`[value=${filters.sort}]`)?.setAttribute('selected', 'selected')
        ;(document.querySelector(`.search`) as HTMLInputElement).value = filters.search as string
        ;(document.querySelector('.fav-check') as HTMLInputElement).checked = filters.favorite as boolean
    }

    addListeners() {
        this.appearance.addListeners()
        this.sorts.addListeners()
        this.ranges.setSliders(this.filters, this.toyGrid, this.data)
        document.querySelector('.toys-grid')?.addEventListener('click', (e) => {
            function countFavs(data: Array<DataItem>) {
                return data.reduce((acc: number, n: DataItem) => {
                    if (n.favorite === true) {
                        return acc + 1
                    } else return acc
                }, 0)
            }
            if ((e.target as HTMLElement).classList.contains('fav-btn')) {
                
                document.querySelector('.fav-warn')?.classList.add('hide-warn')
                ;(e.target as HTMLElement).classList.toggle('fav-btn-active')
                this.data[Number((e.target as HTMLElement).id) - 1].favorite = (
                    e.target as HTMLElement
                ).classList.contains('fav-btn-active')
                if (countFavs(this.data) === 21) {
                    document.querySelector('.fav-warn')?.classList.remove('hide-warn')
                    ;(e.target as HTMLElement).classList.toggle('fav-btn-active')
                    this.data[Number((e.target as HTMLElement).id) - 1].favorite = (
                        e.target as HTMLElement
                    ).classList.contains('fav-btn-active')
                }

                ;(document.querySelector('.favorite-count') as HTMLElement).innerHTML = `${countFavs(this.data)}`
            }
        })
        document.querySelector('.reset')?.addEventListener('click', () => {
            this.filters.shape = new Set()
            this.filters.color = new Set()
            this.filters.size = new Set()
            this.filters.beginYear = 1940
            this.filters.endYear = 2020
            this.filters.beginAmount = 1
            this.filters.endAmount = 12
            this.filters.favorite = false
            this.filters.search = ''
            ;(document.querySelector('.fav-check') as HTMLInputElement).checked = this.filters.favorite

            this.render(this.data)
        })
        document.querySelector('.reset-all')?.addEventListener('click', () => {
            localStorage.clear()
            this.filters.shape = new Set()
            this.filters.color = new Set()
            this.filters.size = new Set()
            this.filters.beginYear = 1940
            this.filters.endYear = 2020
            this.filters.beginAmount = 1
            this.filters.endAmount = 12
            this.filters.favorite = false
            this.filters.search = ''
            this.filters.sort = 'AZ'
            ;(document.querySelector('.fav-check') as HTMLInputElement).checked = this.filters.favorite
            this.data = this.origData
            this.filters.beginAmount = 1
            this.filters.endAmount = 12
            this.render(this.data)
            location.reload()
        })
    }
    setStorage() {
        this.filters.shape = [...(this.filters.shape as Set<'string'>)]
        this.filters.size = [...(this.filters.size as Set<'string'>)]
        this.filters.color = [...(this.filters.color as Set<'string'>)]
        localStorage.setItem('filters', JSON.stringify(this.filters))
        localStorage.setItem('data', JSON.stringify(this.data))
    }
}
export default ToysPage
