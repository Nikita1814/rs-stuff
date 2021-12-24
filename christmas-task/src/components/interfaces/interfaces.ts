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
    [key: string]: FilterVal
}
export type FilterVal = Set<string | undefined> | boolean | string | number | string[]

export interface Grid {
    data: DataItem[]
    showElems: (data: DataItem[], sortCriteria?: FilterObj) => void
}
export interface Toys {
    toyGrid: Grid
    filters: FilterObj
    data: DataItem[]
    origData: DataItem[]
    appearance: Filter
    ranges: RangeFilter
    sorts: Filter
    render: (data: DataItem[]) => void
    addListeners: () => void
    setStorage: () => void
}
/*export interface AppСlass {
    toysPage: Toys
    data: Array<DataItem>
    start: () => void
}*/

export interface Filter {
    data: DataItem[]
    filters: FilterObj
    toyGrid: Grid
    addListeners: () => void
}

export interface RangeFilter {
    data: DataItem[]
    filters: FilterObj
    toyGrid: Grid
    setSliders: (filters: FilterObj, grid: Grid, data: DataItem[]) => void
}
