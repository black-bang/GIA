import {observable,action,flow,reaction} from "mobx"
import ListPageState from "publicComponent/BeatComponent/ListPage/ListPage.mobx.js"
import getLocalInfo from "getLocalInfo"
import {getFetch,postFetch} from "fetchFn"

class EmployeeManageIndexState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.ListPageState=new ListPageState();
	}
	@action clearState(){
		this.switchTag="";
		this.ListPageState.clearInitData();
	}
	//--<>--//
	@observable switchTag="";
	@action changeTag(switchTag){
		this.switchTag=switchTag
		switch(switchTag){
			case "员工":
				this.loadEmployeeList()
			break;
			case "部门":
				this.loadDepartmentList()
			break;
		}		
	}
	loadEmployeeList=flow(function*(){
		//加载员工数据
		this.ListPageState.clearInitData()
		yield this.ListPageState.loadInitData({
			url:"/api/User_Account/GetLowerEmployeeListAsync",
			data:{keyWord:"",state:1}		
		})		
	})
	loadDepartmentList=flow(function*(){
		//加载部门数据
		this.ListPageState.clearInitData()
		yield this.ListPageState.loadInitData({
			url:"/api/Sys_PlatFrom_Translate_RoleList/GetListAsync",
			data:{translateId:getLocalInfo()["TranslateId"],roleId:getLocalInfo()["RoleListId"]}
		})	
	})
	//--<>--//
	modefiyDepartment=flow(function*(targetProps){
		//修改部门名称
		try{
			const name=yield this.ROOTSTORE.DialogInput.showDialog({
				title:"输入部门名称",
				text:targetProps.RoledName		
			})
			yield postFetch({
				url:"/api/Sys_PlatFrom_Translate_RoleList/SetRoleNameAsync",
				data:{
					roleId:targetProps["RoledId"],
					name:name["text"]
				}
			})	
			this.loadDepartmentList()
			this.ROOTSTORE.Tips.Tip("修改成功")							
		}catch(error){
			if(error.state){
				return false
			}else{
				this.ROOTSTORE.Tips.Tip(error)
			}
		}
	})
	//--<>--//
	deleteDepartment=flow(function*(targetProps){
		//删除部门
		try{
			yield this.ROOTSTORE.DialogPromise.showDialog({
				message:`是否删除"${targetProps["RoledName"]}"?`
			})
			yield postFetch({
				url:"/api/Sys_PlatFrom_Translate_RoleList/DeldateAsync",
				data:{
					roleId:targetProps["RoledId"],
					level:targetProps["RoledLevel"],
					path:targetProps["RoledPath"],
				}
			})	
			this.loadDepartmentList()
			this.ROOTSTORE.Tips.Tip("删除成功")		
		}catch(error){
			if(error=="取消"){
				return false
			}else{
				this.ROOTSTORE.Tips.Tip(error)
			}
		}
	})
	deleteEmployee=flow(function*(targetProps){
		//删除员工
		try{
			yield this.ROOTSTORE.DialogPromise.showDialog({
				message:`确定删除员工"${targetProps["AccountName"]}"吗?`
			})
			yield postFetch({
				url:"/api/User_Account/DeleteAsync",
				data:{id:targetProps["AccountId"],user_Employee_Id:getLocalInfo()["EmployeeId"]}
			})
			this.loadEmployeeList()
		}catch(error){
			if(error=="取消"){
				return false
			}else{
				throw error
			}
		}
	})
}

export default EmployeeManageIndexState