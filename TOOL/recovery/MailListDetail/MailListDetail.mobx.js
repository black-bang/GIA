import {observable,action,flow,computed,toJS} from "mobx"
import {getFetch,postFetch} from "fetchFn"

class MailListDetailMapState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
	}
	@observable DetailMap=new Map();
	@computed get Detail(){
		return this.DetailMap.toJSON()
	}
	@computed get submitDetail(){
		const Detail=toJS(this.DetailMap)
		let DetailObject=new Object()
		Object.keys(Detail).map((key,index)=>{
			switch(key){
				case "Picture":
					return false	
				break;
				case "RoleListId":
					DetailObject["RoleId"]=Detail["RoleListId"]
				break;
				case "EmployeeName":
					DetailObject["Name"]=Detail["EmployeeName"]
				break;
				default :
					DetailObject[key]=Detail[key]||""
			}
		})
		return DetailObject
	}
	@action clearState(){
		this.DetailMap=observable.map({})
	}
	@action inputText(inputOBJ){
		this.DetailMap.set(inputOBJ["keyname"],inputOBJ["keyvalue"])
	}
	@action selectRole(selectItem){
		this.DetailMap.set("RoleId",selectItem["Id"])
		this.DetailMap.set("RoleName",selectItem["Name"])
	}
	getDetailMapByAccountId=flow(function*(AccountId){
		//从聊天室跳转过来的需要根据AccountId获取地址和头像
		try{
			const result=yield getFetch({
				url:"/api/User_Account/GetEmployeInfoAsync",
				data:{
					employeeId:"",
					accountId:AccountId,
				}
			})
			//console.log(result);
			this.DetailMap=observable.map(result)		
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)
		}		
	});
	getDetailMapByEmployeeId=flow(function*(EmployeeId){
		//根据EmployeeId获取地址和头像
		try{
			const result=yield getFetch({
				url:"/api/User_Account/GetEmployeInfoAsync",
				data:{
					employeeId:EmployeeId,
					accountId:"",
				}
			})
			console.log(result);
			this.DetailMap=observable.map(result)		
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)
		}
	});
	submitByEmployeeId=flow(function*(EmployeeId){
		//根据EmployeeId更新信息
		try{
			yield postFetch({
				url:"/api/User_Account/UpdateEmployeeInfoAsync",
				data:Object.assign({},this.submitDetail,{
					employeeId:EmployeeId,
					accountId:"",
				})
			})	
			this.ROOTSTORE.Tips.Tip("修改成功")		
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)	
		}		
	});
	submitByAccountId=flow(function*(AccountId){
		//根据AccountId更新信息
		try{
			yield postFetch({
				url:"/api/User_Account/UpdateEmployeeInfoAsync",
				data:Object.assign({},this.submitDetail,{
					employeeId:"",
					accountId:AccountId,
				})
			})	
			this.ROOTSTORE.Tips.Tip("修改成功")		
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)	
			throw error
		}		
	});
}

export default MailListDetailMapState