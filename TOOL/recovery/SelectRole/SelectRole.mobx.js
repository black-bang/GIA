import {observable,action,flow} from "mobx"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class SelectRoleState {
	constructor(){}
	@observable RoleId="";
	@observable RoleName="";
	@observable RoleTree=[];
	@action switchRole(roleOBJ){
		//console.log(roleOBJ);
		this.RoleId=roleOBJ["Id"]
		this.RoleName=roleOBJ["Name"]
	}
	getRoleTree=flow(function*(){
		const result=yield getFetch({
			url:"/api/Sys_PlatFrom_Translate_RoleList/ListAsync",
			data:{roleId:getLocalInfo()["RoleListId"]}
		})
		this.RoleTree=result
	})	
}

export default SelectRoleState