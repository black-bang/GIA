import {observable,action,computed,flow,toJS} from "mobx"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class TransformCustomerState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE
	}
	@observable EmployeeObject=new Map([
		["user_Account_Id",""],
		["name",""],
		["account",""],
		["password",""],
		["type",""],//??
		["roleListId",""],
		["email",""],
		["telephone",""],
		["mobile",""],
		["qq",""],
		["weiXin",""],
		["address",""],
		["remark",""],
		["state",""],
		["jobNumber",""]
	]);
	@observable RoleList=[];
	@computed get Employee(){
		return this.EmployeeObject.toJSON()
	}
	@computed get canSubmit(){
		if(!this.EmployeeObject.get("name")){return false}
		if(!this.EmployeeObject.get("account")){return false}
		if(!this.EmployeeObject.get("password")){return false}
		if(!this.EmployeeObject.get("roleListId")){return false}
		return true
	}
	@action setInitData(json){
		this.EmployeeObject.set("name",json["Name"])
		this.EmployeeObject.set("user_Account_Id",json["AccountId"])
		this.EmployeeObject.set("mobile",json["Mobile"])
	}
	@action input(inputOBJ){
		this.EmployeeObject.set(inputOBJ["keyname"],inputOBJ["keyvalue"])
	}
	@action switchRole(Role){
		this.EmployeeObject.set("roleListId",Role)
		//console.log(toJS(this.EmployeeObject));
	}
	getRoleList=flow(function*(){
		this.RoleList=yield getFetch({
			url:"/api/Sys_PlatFrom_Translate_RoleList/SelectRoleList",
			data:{roleIdAsync:getLocalInfo()["RoleListId"]}
		})
	})
	submit=flow(function*(){
		try{
			yield this.ROOTSTORE.DialogPromise.showDialog({
				message:`确认将"${this.EmployeeObject.get("account")}"设置为员工吗`
			})
			yield postFetch({
				url:"/api/User_Account/CustomerUpdateAsync/",
				data:Object.assign({},this.EmployeeObject.toJSON(),{
					type:1,
					state:true,
					platFrom_TranslateId:getLocalInfo()["TranslateId"],
				})
			})		
		}catch(error){
			if(error=="取消"){
				return false
			}else{
				this.ROOTSTORE.Tips.Tip(error)
			}
		}
	})
}

export default TransformCustomerState