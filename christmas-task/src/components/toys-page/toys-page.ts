import { DataItem } from "../interfaces/interfaces";
import type { FilterObj } from "../interfaces/interfaces";
import ToyGrid from "./toy-grid/toy-grid";

class ToysPage {
  /*TODO make propper interfaces*/
  private toyGrid;
  private filters: FilterObj;
  private data: Array<DataItem>
  constructor(data:Array<DataItem>) {
    this.filters = {shape: new Set(), color: new Set(), size: new Set(), favorite: false, sort:'AZ'};
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
      <input type="range">
    <div class="outputs">
      <div class="output">2021</div>
      <div class="output">1961</div>
    </div>
    </p>
    <h2>Количество экземпляров</h2>
    <p>
      <input type="range">
    <div class="outputs">
      <div class="output">10</div>
      <div class="output">1</div>
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
    /*TODO make a function that would set up listeners after render(by calling functions from prop-classes)*/
  }
  addListeners() {
    let key: string;
    for (key in this.filters) {
      let filterToMod: Set<string | undefined> | Function |boolean| string = this.filters[key];
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
    }
  }
}
export default ToysPage;
