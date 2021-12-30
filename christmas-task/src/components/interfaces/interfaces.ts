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

export interface FilterObjInterface  {
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
/*export type FilterObjTemp = {
    [key: string]: FilterVal
}*/
/*export type FilterVal = Set<string | undefined> | boolean | string | number | Array<string | undefined>*/

export interface TreePageSettingsObjInterface {
    treeImg: string
    bg: string
    snow: boolean
    music: boolean
    lightsColor: string
    lightsOn: boolean
}
