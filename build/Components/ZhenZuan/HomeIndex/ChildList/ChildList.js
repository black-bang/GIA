import { observable, flow, computed, action } from "mobx";

export default class HomeItemState {
  // constructor(ChildernState){
  //     this.ChildernState = ChildernState;
  // }

  @observable ChildernState = 0;
  @action clearInitData() {
    this.ChildernState = 1;
  }
  getChildernState = flow(function*() {});
}
