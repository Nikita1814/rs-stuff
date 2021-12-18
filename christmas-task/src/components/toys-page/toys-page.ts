import { DataItem, Grid } from "../interfaces/interfaces";
import type { FilterObj } from "../interfaces/interfaces";
import ToyGrid from "./toy-grid/toy-grid";
/*import noUiSlider from 'nouislider'*/
import { target, API } from "nouislider";
import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider'

class ToysPage {
  /*TODO make propper interfaces*/
  private toyGrid: Grid;
  private filters: FilterObj;
  private data: Array<DataItem>
  constructor(data:Array<DataItem>) {
  this.filters = {shape: new Set(), color: new Set(), size: new Set(), favorite: false, sort:'AZ', search:'', beginYear:1940, endYear:2020, beginAmount:1, endAmount:12 };
    this.toyGrid = new ToyGrid();
    this.data = data
  }
  render(data: Array<DataItem>) {
    const main = document.querySelector(".main") as HTMLElement;
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
      <div data-criteria="зеленый" id="green" class="selectable"></div>
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
    <h2>Год приобретения</h2>
    <p>
      <div id="year-slider"></div>
    <div class="outputs">
      <div class="output" id="begin-year">1940</div>
      <div class="output" id="end-year">2020</div>
    </div>
    </p>
    <h2>Количество экземпляров</h2>
    <p>
      <div id="amount-slider"></div>
    <div class="outputs">
     <div class="output" id="begin-amount">1</div>
     <div class="output" id="end-amount">10</div>
    </div>
    </p>
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
  </div>
</div>
 <div class="toys-grid">
    </div>
</div>
</div>`;
    this.toyGrid.showElems(data);
    this.addListeners();
    this.setSliders(this.filters, this.toyGrid, this.data)
    /*TODO make a function that would set up listeners after render(by calling functions from prop-classes)*/
  }
  setSliders(filters : FilterObj, grid:Grid, data:Array<DataItem>, ) {
  let yearSlider: noUiSlider.target = (document.getElementById('year-slider') as HTMLElement)  as  noUiSlider.target
  let amountSlider: noUiSlider.target = (document.getElementById('amount-slider')as HTMLElement)  as  noUiSlider.target

  noUiSlider.create(yearSlider, {
    start: [1940, 2020],
    behaviour: 'drag',
    step:1,
    connect: true,
    range: {
        'min': 1940,
        'max': 2020
    }
});
noUiSlider.create(amountSlider, {
  start: [1, 12],
  behaviour: 'drag',
  step:1,
  connect: true,
  range: {
      'min': 1,
      'max': 12
  }
});
let yearOutput = [
  document.getElementById('begin-year') as HTMLElement,
  document.getElementById('end-year') as HTMLElement
];
let amountOutput = [
  document.getElementById('begin-amount') as HTMLElement,
  document.getElementById('end-amount')as HTMLElement
];

  yearSlider?.noUiSlider?.on('slide', function(values,handle:number){
  yearOutput[handle].innerHTML = values[handle].toString().slice(0,4)
  filters.beginYear =  Number(document.getElementById('begin-year')?.textContent) 
  filters.endYear =  Number(document.getElementById('end-year')?.textContent)
  grid.showElems(data, filters)
  /*console.log( 1960 > filters.beginYear && 1960 < filters.endYear)
  console.log(filters.endYear)*/

});
  amountSlider?.noUiSlider?.on('update', function(values,handle:number){
  amountOutput[handle].innerHTML = values[handle].toString().slice(0,2)
  filters.beginAmount =  Number(document.getElementById('begin-amount')?.textContent) 
  filters.endAmount =  Number(document.getElementById('end-amount')?.textContent)
  grid.showElems(data, filters)
})

  }
  addListeners() {
    let key: string;
    for (key in this.filters) {
      let filterToMod: Set<string | undefined> | Function |boolean| string| number = this.filters[key];
      console.log(filterToMod instanceof Boolean);
      /*console.log(((document.querySelector(`#ball`) as HTMLElement).dataset.criteria))*/
      if (filterToMod instanceof Set) {
        document.querySelector(`.${key}`)?.addEventListener("click", (e) => {
          if ((e.target as HTMLElement).classList.contains("selectable")) {
            if ((e.target as HTMLElement).classList.contains("selected")) {
              (filterToMod as Set<string | undefined>).delete(
                (e.target as HTMLElement).dataset.criteria
              ); //TODO: makae this affect specific categories
            } else {
              (filterToMod as Set<string | undefined>).add(
                (e.target as HTMLElement).dataset.criteria
              );
              console.log(this.filters.shape);
            }
            (e.target as HTMLElement).classList.toggle(`selected`);
            console.log(this.filters);
            this.toyGrid.showElems(this.data, this.filters);
          }
        });
      } 
      if  (typeof filterToMod === 'boolean') {
        document.querySelector(`.${key}`)?.addEventListener("click",(e) => {
          console.log((document.querySelector(`.fav-check`) as HTMLInputElement).checked)
          this.filters[key] = (document.querySelector(`.fav-check`) as HTMLInputElement).checked
          this.toyGrid.showElems(this.data, this.filters);
          console.log(this.filters)
        })
      }
      if (key === 'sort') {
        document.querySelector(`.sorts`)?.addEventListener("change", ()=>{
        this.filters.sort = (document.querySelector(`.sorts`) as HTMLSelectElement).value
        this.toyGrid.showElems(this.data, this.filters);
          console.log(this.filters)    
        });
       
      }
      if(key === 'search'){
        document.querySelector(`.search`)?.addEventListener('input', ()=>{
          this.filters.search = (document.querySelector(`.search`) as HTMLInputElement).value.toLowerCase()
          
          this.toyGrid.showElems(this.data, this.filters);
        })
      }
    }
  }
}
export default ToysPage;
