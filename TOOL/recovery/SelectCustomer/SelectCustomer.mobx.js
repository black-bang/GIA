import {observable,action,flow,computed} from "mobx"
import ListPageState from "publicComponent/BeatComponent/ListPage/ListPage.mobx.js"
import getLocalInfo from "getLocalInfo"

class SelectCustomerState {
	constructor(){
		this.ListPageState=new ListPageState()
	}	
	//--<>--//
	@observable Name=null;
	@observable AccountId=null;
	@observable TagName="";
	@action changeCustomer(CustomerOBJ){
		const {Name,AccountId}=CustomerOBJ
		this.Name=Name
		this.AccountId=AccountId
	}
	@action switchTag(TagName){
		this.TagName=TagName;
		switch(TagName){
			case "客户":
				this.loadCustomerData()	
			break;
			case "员工":
				this.loadEmployeeData()	
			break;
			default:
				return false
		}
	}
	loadEmployeeData=flow(function*(){
		//所有员工列表
		try{
			yield this.ListPageState.loadInitData({
				url:"/api/User_Account/User_AccountEmployeeRoleListIdNullListAsync",
				data:{translateId:getLocalInfo()["TranslateId"],state:true}				
			})
		}catch(error){
			console.log(error);
		}
	})
	loadCustomerData=flow(function*(){
		//所有客户列表
		try{
			yield this.ListPageState.loadInitData({
				url:"/api/Wl_Customer_Employee/NewListAsync",
				data:{keyWord:""}				
			})
		}catch(error){
			console.log(error);
		}
	})
}

export default SelectCustomerState