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

export type FilterObjTemp = {
    [key: string]: FilterVal
}
export interface FilterObj extends FilterObjTemp {
    shape: Set<string | undefined> | Array<string | undefined>
    color: Set<string | undefined> | Array<string | undefined>
    size: Set<string | undefined> | Array<string | undefined>
    favorite: boolean
    sort: string
    search: string
    beginYear: number
    endYear: number
    beginAmount: number
    endAmount: number
}
export type FilterVal = Set<string | undefined> | boolean | string | number | Array<string | undefined>

export interface Grid {
    data: DataItem[]
    favs: Set<string | undefined>
    showElems: (data: DataItem[], sortCriteria?: FilterObj) => void
}
export interface ToySelection {
    toyGrid: Grid
    filters: FilterObj
    data: DataItem[]
    appearance: Filter
    ranges: RangeFilter
    sorts: Filter
    favs: Set<string | undefined>
    render: (data: DataItem[]) => void
    addListeners: () => void
    setStorage: () => void
}
export interface TreeDecoration {
    data: DataItem[]
    favs: Set<string | undefined>
    decorations: Object
    firTree: Object
    toyBox: Object
    render: (data: DataItem[]) => void
}
export interface Page {
    toysPage?: ToySelection
    data: DataItem[]
    render: (data: DataItem[]) => void
    addListeners: () => void
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
    favs?: Set<DataItem | undefined>
    addListeners: () => void
}

export interface RangeFilter {
    data: DataItem[]
    filters: FilterObj
    toyGrid: Grid
    setSliders: (filters: FilterObj, grid: Grid, data: DataItem[]) => void
}
