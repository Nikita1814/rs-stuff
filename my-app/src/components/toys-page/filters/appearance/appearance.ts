import { DataItem, Filter, FilterObj, Grid } from '../../../interfaces/interfaces'

class Appearance implements Filter {
    data: Array<DataItem>
    filters: FilterObj
    toyGrid: Grid
    /*private color: {
    white: boolean;
    yellow: boolean;
    red: boolean;
    blue: boolean;
    green: boolean;
  };
  private shape: {
    ball: boolean;
    bell: boolean;
    cone: boolean;
    snowflake: boolean;
    figurine: boolean;
  };
  private size: {
    big: boolean;
    medium: boolean;
    small: boolean;
  };*/

    constructor(data: Array<DataItem>, filters: FilterObj, grid: Grid) {
        this.data = data
        this.filters = filters
        this.toyGrid = grid
        /*this.color = {
      white: true,
      yellow: true,
      red: true,
      blue: true,
      green: true,
    };
    this.shape = {
      ball: true,
      bell: true,
      cone: true,
      snowflake: true,
      figurine: true,
    };
    this.size = {
      big: true,
      medium: true,
      small: true,
    };*/
    }
    addListeners() {
        let key: string

        for (key in this.filters) {
            const filterToMod: Set<string | undefined> | boolean | string | number | Array<string> = this.filters[key]
            if (filterToMod instanceof Set) {
                document.querySelector(`.${key}`)?.addEventListener('click', (e) => {
                    if ((e.target as HTMLElement).classList.contains('selectable')) {
                        if ((e.target as HTMLElement).classList.contains('selected')) {
                            ;(filterToMod as Set<string | undefined>).delete((e.target as HTMLElement).dataset.criteria) //TODO: makae this affect specific categories
                        } else {
                            ;(filterToMod as Set<string | undefined>).add((e.target as HTMLElement).dataset.criteria)
                            /*console.log(this.filters.shape);*/
                        }
                        ;(e.target as HTMLElement).classList.toggle(`selected`)
                        /*console.log(this.filters);*/
                        this.toyGrid.showElems(this.data, this.filters)
                    }
                })
            }
            if (typeof filterToMod === 'boolean') {
                document.querySelector(`.${key}`)?.addEventListener('click', () => {
                    /*console.log((document.querySelector(`.fav-check`) as HTMLInputElement).checked)*/
                    this.filters.favorite = (document.querySelector(`.fav-check`) as HTMLInputElement).checked
                    /*console.log(this.filters.favorite)*/
                    this.toyGrid.showElems(this.data, this.filters)
                })
            }
        }
    }
    UpdCriterea() {
        return
        /*TODO: function that updates criterea based on chosen elems and events */
    }
}
export default Appearance
