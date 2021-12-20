export interface DataItem {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export type FilterObj = {
  [key:string]: Set<string|undefined> |boolean | string |number | Array<string>
  
}
export interface Grid{
data:Array<DataItem>,
showElems: (data: Array<DataItem>, sortCriteria?: FilterObj)=>void
}
export interface Toys{
  toyGrid: Grid;
  filters: FilterObj;
  data: Array<DataItem>;
  render:(data:Array<DataItem>)=> void;
  setSliders:(filters: FilterObj, grid: Grid, data: Array<DataItem>) =>void
  addListeners:()=> void

}
export interface AppСlass{
  toysPage: Toys;
  data: Array<DataItem>;
  start:()=> void

}
/*TODO put  all interfaces/types here and exclude this  folder from webpack building */
