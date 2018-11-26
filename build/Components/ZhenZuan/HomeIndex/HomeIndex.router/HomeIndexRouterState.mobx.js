
import { observable, flow, computed, action } from "mobx";
import {ajax} from 'api'
import url from 'url'
export default class HomeIndexRouterState {
    constructor(query){
        this.query = query
    }
    @observable SearchMap = new Map([
        ["shape", ""],
        ["color",""],
        ["clarity",""],
        ["cut",""],
        ["polish",""],
        ["sym",""],
        ["four",""],
        ["cert",""],
        ["location",""]
    ])
    @computed get Search() {
        return this.SearchMap.toJSON();
    }
    @action SaveSearchInfo(keyname, keyvalue) {
        this.SearchMap.set(keyname, keyvalue);
    }
    getSearchState  = flow(function* () {
        let newOBJ = Object.assign({}, this.Search);
        console.log(newOBJ);
            try{
             const result = yield ajax.post({
                 url:"/api/Diamonds/DiamondDataSearch",
                 data: Object.assign({
                     diamondSizeMin:sessionStorage.getItem('LW') || '',
                     diamondSizeMax: sessionStorage.getItem('HW') || '',
                     reportNo: sessionStorage.getItem('CMANOText') || '',
                     diamondPriceMin: sessionStorage.getItem('LWMoney') || '',
                     diamondPriceMax: sessionStorage.getItem('HWMoney') || '',
                 }, this.Search)
             }) 
                 console.log(result)
                 return result
            }catch(error){
                throw error
            }
    })
} 