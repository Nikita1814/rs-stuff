import { DataItem, Filter, FilterObj, Grid } from "../../../interfaces/interfaces";
class Sorts implements Filter{
  data: Array<DataItem>;
  filters: FilterObj;
  toyGrid: Grid;

  constructor(data: Array<DataItem>, filters: FilterObj, grid: Grid) {
    this.data = data;
    this.filters = filters;
    this.toyGrid = grid;
  }
  addListeners() {
    document.querySelector(`.sorts`)?.addEventListener("change", () => {
      this.filters.sort = (
        document.querySelector(`.sorts`) as HTMLSelectElement
      ).value;
      this.toyGrid.showElems(this.data, this.filters);
      /*console.log(this.filters)*/
    });

    document.querySelector(`.search`)?.addEventListener("input", () => {
      this.filters.search = (
        document.querySelector(`.search`) as HTMLInputElement
      ).value.toLowerCase();

      this.toyGrid.showElems(this.data, this.filters);
    });
  }

 
}
export default Sorts