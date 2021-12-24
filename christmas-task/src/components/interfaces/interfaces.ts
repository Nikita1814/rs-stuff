export interface DataItem {
    num: string
    name: string
    count: string
    year: string
    shape: string
    color: string
    size: string
    favorite: boolean
}

export type FilterObj = {
    [key: string]: Set<string | undefined> | boolean | string | number | Array<string>
}
export interface Grid {
    data: Array<DataItem>
    showElems: (data: Array<DataItem>, sortCriteria?: FilterObj) => void
}
export interface Toys {
    toyGrid: Grid
    filters: FilterObj
    data: Array<DataItem>
    origData: Array<DataItem>
    appearance: Filter
    ranges: RangeFilter
    sorts: Filter
    render: (data: Array<DataItem>) => void
    addListeners: () => void
    setStorage: () => void
}
/*export interface AppСlass {
    toysPage: Toys
    data: Array<DataItem>
    start: () => void
}*/

export interface Filter {
    data: Array<DataItem>
    filters: FilterObj
    toyGrid: Grid
    addListeners: () => void
}

export interface RangeFilter {
    data: Array<DataItem>
    filters: FilterObj
    toyGrid: Grid
    setSliders: (filters: FilterObj, grid: Grid, data: Array<DataItem>) => void
}
