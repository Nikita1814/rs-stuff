import { DataItem, Grid } from "../../interfaces/interfaces";
import type { FilterObj } from "../../interfaces/interfaces";

/*export interface DataItem {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

{shape: new Set(), color: new Set(), size: new Set()}
*/
class ToyGrid implements Grid {
  public data:Array<DataItem>
  constructor(data:Array<DataItem>) {
    this.data = data
  }
  showElems(data: Array<DataItem>, sortCriteria?: FilterObj) {
    (document.querySelector(".toys-grid") as HTMLElement).innerHTML = "";
    let sortData = [...data];
    /*TODO Add a filtration application method*/
    if (sortCriteria) {
      const sortfuncs: { [key: string]: (a: DataItem, b: DataItem) => number } = {
        AZ: function (a: DataItem, b: DataItem) {
          return a.name.localeCompare(b.name);
        },
        ZA: function (a: DataItem, b: DataItem) {
          return b.name.localeCompare(a.name);
        },
        increase: function (a: DataItem, b: DataItem) {
          return +a.count - +b.count;
        },
        decrease: function (a: DataItem, b: DataItem) {
          return +b.count - +a.count;
        },
      };
      sortData = sortData.filter((el) => {
        /*console.log(`${el.name} - ${el.favorite} result:${el.favorite === sortCriteria.favorite}` )*/

        if (
          ((sortCriteria.shape as Set<string | undefined>).has(el.shape) ||
            (sortCriteria.shape as Set<string | undefined>).size === 0) &&
          ((sortCriteria.color as Set<string | undefined>).has(el.color) ||
            (sortCriteria.color as Set<string | undefined>).size === 0) &&
          ((sortCriteria.size as Set<string | undefined>).has(el.size) ||
            (sortCriteria.size as Set<string | undefined>).size === 0) &&
          Number(el.year) >= sortCriteria.beginYear &&
          Number(el.year) <= sortCriteria.endYear &&
          Number(el.count) >= sortCriteria.beginAmount &&
          Number(el.count) <= sortCriteria.endAmount

          /*(sortCriteria.favorite === el.favorite && sortCriteria.favorite === true ) ||  sortCriteria.favorite === false*/
        ) {
          return true;
        } else return false;
      });

      if (sortCriteria.favorite === true) {
        sortData = sortData.filter((el) => {
          return el.favorite;
        });
      }
      if (sortCriteria.search !== "") {
        sortData = sortData.filter((el) => {
          return el.name.toLowerCase().includes(sortCriteria.search as string);
        });
      }
      const sortMethod: (a: DataItem, b: DataItem) => number =
        sortfuncs[sortCriteria.sort as string];
      sortData.sort(sortMethod);
      /*console.log(sortData);*/
    }

    const fragment = document.createDocumentFragment();
    const toyTemplate = document.querySelector(
      "#toy-temp"
    ) as HTMLTemplateElement;

    /*TODO make this segment shorter*/
    sortData.forEach((el) => {
      const toyCard = toyTemplate.content.cloneNode(
        true
      ) as HTMLTemplateElement;
      (
        toyCard.querySelector(".toy-name") as HTMLElement
      ).innerHTML = `${el.name}`;
      (
        toyCard.querySelector(".toy-image") as HTMLElement
      ).style.backgroundImage = `url("./assets/toys/${el.num}.png")`;

      (
        toyCard.querySelector(".toy-amount") as HTMLElement
      ).innerHTML = `Количество: ${el.count}`;

      (
        toyCard.querySelector(".toy-year") as HTMLElement
      ).innerHTML = `Год: ${el.year}`;
      (
        toyCard.querySelector(".toy-shape") as HTMLElement
      ).innerHTML = `Форма: ${el.shape}`;

      (
        toyCard.querySelector(".toy-color") as HTMLElement
      ).innerHTML = `Цвет: ${el.color}`;

      (
        toyCard.querySelector(".toy-size") as HTMLElement
      ).innerHTML = `Размер: ${el.size}`;

      toyCard.querySelector('.fav-btn')?.setAttribute('id',`${el.num}`);

      if (el.favorite === true) {
        (
          toyCard.querySelector(".toy-favourite") as HTMLElement
        ).innerHTML = `Любимая: да`;
          toyCard.querySelector('.fav-btn')?.classList.add('fav-btn-active')
      } else {
        (
          toyCard.querySelector(".toy-favourite") as HTMLElement
        ).innerHTML = `Любимая: нет`;
      }
      fragment.append(toyCard);
    });

    document.querySelector(".toys-grid")?.append(fragment);
    if(document.querySelector('.toys-grid')?.children.length === 0){
      (document.querySelector('.toys-grid') as HTMLElement).innerHTML = `<h1 class="big-warn">Извините, совпадений не обнаружено</h1>`
    }
   
  }
}
export default ToyGrid;
