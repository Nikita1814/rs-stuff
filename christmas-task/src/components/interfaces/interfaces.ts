export interface Toy {
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
    data: Toy[]
    favs: Set<string | undefined>
    showElems: (data: Toy[], sortCriteria?: FilterObj) => void
}
export interface ToySelection {
    toyGrid: Grid
    filters: FilterObj
    data: Toy[]
    appearance: Filter
    ranges: RangeFilter
    sorts: Filter
    favs: Set<string | undefined>
    render: (data: Toy[]) => void
    addListeners: () => void
    setStorage: () => void
}
export interface TreeDecoration {
    data: Toy[]
    favs: Set<string | undefined>
    decorations: TreeLeft
    toyBox: TreeToyGrid
    render: (data: Toy[]) => void
    addListeners: () => void
    setStorage: () => void
}
export interface Page {
    toysPage?: ToySelection
    data?: Toy[]
    render: (data?: Toy[] ,favsNum?:number) => void
    addListeners?: () => void
}

export interface Filter {
    data: Toy[]
    filters: FilterObj
    toyGrid: Grid
    favs?: Set<Toy | undefined>
    addListeners: () => void
}

export interface RangeFilter {
    data: Toy[]
    filters: FilterObj
    toyGrid: Grid
    setSliders: (filters: FilterObj, grid: Grid, data: Toy[]) => void
}

export interface TreePageSettingsObj {
    treeImg: string
    bg: string
    snow: boolean
    music: boolean
    lightsColor: string
    lightsOn: boolean
}
export interface TreeLeft {
    treePageSettings: TreePageSettingsObj
    addListeners: () => void
    generateLights: (color: string) => void
    generateSnow: () => void
    handleStorage: () => void
}

export interface TreeToyGrid {
    favs: Set<string | undefined>
    data: Toy[]
    treePageSettings: TreePageSettingsObj
    drawBox: () => void
    addListeners: () => void
}
