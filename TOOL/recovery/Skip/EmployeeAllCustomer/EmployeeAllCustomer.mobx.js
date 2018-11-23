import {observable,action,flow} from "mobx"
import ListPageState from "publicComponent/BeatComponent/ListPage/ListPage.mobx.js"

class EmployeeAllCustomer {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.ListPageState=new ListPageState();
	}
}

export default EmployeeAllCustomer