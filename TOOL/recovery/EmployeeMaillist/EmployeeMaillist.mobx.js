import {observable,action,flow,computed} from "mobx"
import ListPageState from "publicComponent/BeatComponent/ListPage/ListPage.mobx.js"
import {getFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class EmployeeMaillistState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.ListPageState=new ListPageState();
	}
	loadInitData=flow(function*(){
		try{
			yield this.ListPageState.loadInitData({
				url:"/api/User_Account/EmployeeContactsListAsync",
				data:{
					keyWord:"",
					sys_PlatFrom_Translate_Id:getLocalInfo()["TranslateId"]
				}
			})			
		}catch(error){
			throw error
		}
	})
}

export default EmployeeMaillistState