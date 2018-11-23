import {observable,action,computed,flow} from "mobx"
import getLocalInfo from "getLocalInfo"
import {postFetch} from "fetchFn"

//EmployeerUpdateAsync
class UserDetailState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE
		this.cacheOriginDate=null;
	}
	@observable EmployeeInfoMap=new Map();
	@computed get EmployeeInfo(){
		return this.EmployeeInfoMap.toJSON()
	}
	@action editStart(){
		this.cacheOriginDate=this.EmployeeInfoMap.toJSON()
	}
	@action editCancel(){
		this.EmployeeInfoMap=observable.map(this.cacheOriginDate)
	}
	@action inputValue(textOBJ){
		this.EmployeeInfoMap.set(textOBJ["keyname"],textOBJ["keyvalue"])
	}
	@action getEmployeeInfoByLocalStorage(){
		const {Name,Mobile}=getLocalInfo()
		this.EmployeeInfoMap.set("name",Name)
		this.EmployeeInfoMap.set("mobile",Mobile)
	}
	saveModify=flow(function*(){
		try{
			yield postFetch({
				url:"/api/User_Account/EmployeerUpdateAsync",
				data:Object.assign({
					user_Account_Id:getLocalInfo()["Id"],
					account:getLocalInfo()["Account"],
					state:true,
				},this.EmployeeInfo)
			})
			const {name,mobile}=this.EmployeeInfo
			const userInfo=getLocalInfo()
			userInfo["Name"]=name;
			userInfo["Mobile"]=mobile;
			window.localStorage.setItem("userInfo",JSON.stringify(userInfo))
			window.localStorage.setItem("originUser",JSON.stringify(userInfo))
			this.ROOTSTORE.Tips.Tip("保存成功")
		}catch(error){
			throw error
		}
	})
}

export default UserDetailState