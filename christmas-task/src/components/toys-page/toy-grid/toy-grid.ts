import { DataItem } from "../../interfaces/interfaces";

class ToyGrid {
  constructor() {}
  showElems(data: Array<DataItem>, sortCriteria:Object) {
    let sortData = data;
    /*TODO Add a filtration application method*/
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
        toyCard.querySelector("toy-image") as HTMLImageElement
      ).src = `assets/toys${el.num}`;
      (
        toyCard.querySelector("toy-amount") as HTMLElement
      ).innerHTML = `Количество: ${el.count}`;

      (
        toyCard.querySelector("toy-year") as HTMLElement                                   
      ).innerHTML = `Год: ${el.year}`;
      (
        toyCard.querySelector("toy-shape") as HTMLElement
      ).innerHTML = `Форма: ${el.shape}`;

      (
        toyCard.querySelector("toy-color") as HTMLElement
      ).innerHTML = `Цвет: ${el.color}`;

      (
        toyCard.querySelector("toy-size") as HTMLElement
      ).innerHTML = `Размер: ${el.size}`;
      if (el.favorite) {
        (
          toyCard.querySelector("toy-favourite") as HTMLElement
        ).innerHTML = `Любимая: да`;
      } else {
        (
          toyCard.querySelector("toy-favourite") as HTMLElement
        ).innerHTML = `Любимая: нет`;
      }
      fragment.append(toyCard)
    });
    document.querySelector('.toys-grid')?.append(fragment)
  }
}
export default ToyGrid