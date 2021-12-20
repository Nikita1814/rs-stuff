import { DataItem, FilterObj, Grid } from "../../../interfaces/interfaces";
class Ranges {
  data:Array<DataItem>;
  filters:FilterObj;
  toyGrid:Grid

  constructor(data:Array<DataItem>, filters:FilterObj, grid:Grid) {
    this.data = data
    this.filters =filters
    this.toyGrid = grid
  }

  addListeners() {
    return;
    /*TODO: function that adds listeners*/
  }

  UpdCriterea() {
    return;
    /*TODO: function that updates criterea based on chosen elems and events */
  }
}
