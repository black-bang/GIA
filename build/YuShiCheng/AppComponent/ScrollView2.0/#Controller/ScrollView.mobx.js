import {observable,action,flow,computed} from "mobx"
import LoadState from "./LoadState.mobx.js"
import SearchState from "./SearchState.mobx.js"

export default class ScrollViewState {
	constructor(){
		this.LoadState=new LoadState()
		this.SearchState=new SearchState()
	}
	@observable HANDLE="SCROLLLOAD"
}