import {observable,action,flow,computed} from "mobx"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class ChangeMemberState {
	constructor(){
		this.queryOBJ={};
	}
	//--<初始化>--//
	set query(queryOBJ){
		this.queryOBJ=queryOBJ;
	}
	@observable MemberList=[];
	getAllMemberInOrderToAdd=flow(function*(){
		//添加群成员,根据Id获取所有群成员
		try{
			const result=yield getFetch({
				url:"/api/Wl_Chat_Member/EmployeeListAsync",
				data:{
					name:"",
					chatId:this.queryOBJ["groupId"],
					translateId:getLocalInfo()["TranslateId"],
				}						
			})
			this.MemberList=result
		}catch(error){
			throw error
		}	
	})
	getAllMemberInOrderToDelete=flow(function*(){
		//删除群成员,根据Id获取所有群成员
		try{
			const result=yield getFetch({
				url:"/api/Wl_Chat_Member/ListAsync/",
				data:{
					ask:-1,
					id:this.queryOBJ["groupId"],
					accountID:getLocalInfo()["Id"],
					translateId:getLocalInfo()["TranslateId"],
				}						
			})
			this.MemberList=result
		}catch(error){
			throw error
		}			
	})
	//--<>--//
	@observable SelectMember=[];
	@computed get SelectMemberArray(){
		return this.SelectMember.toJS()
	}
	@action selectMember(MemberArray){
		//选择
		this.SelectMember=MemberArray
	}
	//--<添加成员>--//
	addMember=flow(function*(){
		try{
			//同时在内外两个群添加成员
			yield postFetch({
				url:"/api/Wl_Chat_Member/AddArrAsync",
				data:{
					arrAccountId:this.SelectMember.toString(),
					arrChatInfoId:`${this.queryOBJ["outerGroupId"]},${this.queryOBJ["innerGroupId"]}`,
				}
			}) 	
		}catch(error){
			throw error
		}
	})
	//--<删除成员>--//
	deleteMember=flow(function*(){
		try{
			yield postFetch({
				url:"/api/Wl_Chat_Member/DelDateArrAsync/",
				data:{
					arrAccountId:this.SelectMember.toString(),
					arrChatInfoId:`${this.queryOBJ["outerGroupId"]},${this.queryOBJ["innerGroupId"]}`,
				}
			})			
		}catch(error){
			throw error
		}
	})
}

export default ChangeMemberState