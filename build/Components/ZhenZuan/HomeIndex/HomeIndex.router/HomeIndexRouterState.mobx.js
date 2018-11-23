
import { observable, flow, computed, action } from "mobx";
export default class HomeIndexRouterState {
    constructor(query){
        this.query = query
    }
    @observable 
    getState =flow( function* (){
  
    })
} 