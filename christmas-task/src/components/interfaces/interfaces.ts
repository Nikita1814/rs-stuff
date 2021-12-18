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
  [key:string]: Set<string|undefined> | Function |boolean | string 
  
}
/*TODO put  all interfaces/types here and exclude this  folder from webpack building */
