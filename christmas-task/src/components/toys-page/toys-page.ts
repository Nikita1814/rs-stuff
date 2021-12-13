import { DataItem } from "../interfaces/interfaces";
import ToyGrid from "./toy-grid/toy-grid";

class ToysPage {
  private filters; /*TODO make propper interfaces*/
  private toyGrid;
  constructor() {
    this.filters = {};
    this.toyGrid = new ToyGrid();
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
      <div id="ball"></div>
      <div id="bell"></div>
      <div id="cone"></div>
      <div id="snowflake"></div>
      <div id="figurine"></div>
    </div>
    <div class="color">
      <p>Цвет</p>
      <div id="white"></div>
      <div id="yellow"></div>
      <div id="red"></div>
      <div id="blue"></div>
      <div id="green"></div>
    </div>
    <div class="size">
      <p>Размер</p>
      <div id="big"></div>
      <div id="medium"></div>
      <div id="small"></div>
    </div>
    <div class="favourites">
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
      <option value="А-Я"> По назывнию от А до Я</option>
      <option value="Я-А"> По назывнию от Я до А</option>
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
    this.toyGrid.showElems(data, []);
    /*TODO make a function that would set up listeners after render(by calling functions from prop-classes)*/
  }
}
