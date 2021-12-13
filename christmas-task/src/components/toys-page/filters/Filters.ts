class Filters {
  private appearance: Object;
  private range: Object;
  private sorts: Object;
  public filterHash: Object;
  constructor() {
    this.appearance = {};
    this.range = {};
    this.sorts = {};
    this.filterHash = {};
    /*TODO define props as specific filter classes*/
    /*TODO deal with the composition of an object with the results of filtration*/
  }
  /*TODO add a function that would call the add listeners functions in the class props*/
  /*TODO add a function that would compose an object with filtration results*/
}
