import {observable,action,computed,flow} from "mobx"
import getLocalInfo from "getLocalInfo"
import {postFetch} from "fetchFn"

class TransformRoleState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
	}
	@observable SelectRoleMap=new Map();
	@action selectRoleId(RoleOBJ){
		this.SelectRoleMap.set("Id",RoleOBJ["Id"])
		this.SelectRoleMap.set("Name",RoleOBJ["Name"])
	}
	@computed get relationRole(){
		return {Id:this.SelectRoleMap.get("Id"),Name:this.SelectRoleMap.get("Name")}
	}
	submit=flow(function*(EmployeeId){
		try{
			yield postFetch({
				url:"/api/User_Account/SetEmployeeRoleIdAsync",
				data:{
					user_Account_Id:getLocalInfo()["Id"],
					user_Employee_Id:EmployeeId,
					sys_PlatFrom_Translate_RoleList_Id:this.relationRole["Id"],
				}
			})
		}catch(error){
			this.ROOTSTORE.Tips.Tip("修改角色失败,请稍后重试")
			throw error
		}
	});
}

export default TransformRoleState