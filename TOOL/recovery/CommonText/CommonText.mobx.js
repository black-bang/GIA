import {observable,action,computed,flow} from "mobx"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class CommonTextState {
	constructor(ROOTSTORE,CHATBARSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CHATBARSTORE=CHATBARSTORE;	
		this.queryOBJ={}
	}
	set query(queryOBJ){this.queryOBJ=queryOBJ}
	@observable editMode=false;
	@observable switchedGroup="";
	@observable commonText=[];		
	@computed get groups(){
		return this.commonText.map((item,index)=>{
			return item["LabelName"]
		})
	}
	@action openEditMode(){
		//展开术语的编辑项
		this.editMode=true;
	}
	@action cancelEditMode(){
		//展开术语的编辑项
		this.editMode=false;
	}
	@action switchGroup(Target){
		this.switchedGroup=Target;
	}
	addCommonText=flow(function*(AddOBJ){
		const {content}=AddOBJ
		//增加一条常用语--(增)
		try{
			yield postFetch({
				url:"/api/User_Employee/AddEmployeeLanguageAsync/",
				data:{
					user_Employee_LabelType_Id:this.switchedGroup,
					content:content
				}
			})
			//this.ROOTSTORE.Tips.Tip("添加成功")
			this.getCommonTextByUserAccountId()
		}catch(error){
			this.ROOTSTORE.Tips.Tip("添加失败")
		}
	})
	delectCommonTextWithCommonId=flow(function*(commonId){
		//根据常用语ID删除常用语--(删)
		try{
			yield this.ROOTSTORE.DialogPromise.showDialog({
				title:"提示",
				message:"确定要删除?"
			})
			yield postFetch({
				url:"/api/User_Employee/DeleteEmployeeLanguageAsync",
				data:{user_Employee_Language_Id:commonId}
			})
			this.ROOTSTORE.Tips.Tip("删除成功")
			this.getCommonTextByUserAccountId()					
		}catch(error){
			if(error=="取消"){
				return false
			}else{
				this.ROOTSTORE.Tips.Tip(error)
			}
		}
	})
	upDateCommonText=flow(function*(UpdataOBJ){
		const {commonId,content}=UpdataOBJ;
		//更新一条常用语--(改)
		try{
			yield postFetch({
				url:"/api/User_Employee/UpdateEmployeeLanguageAsync/",
				data:{
					user_Employee_Language_Id:commonId,
					content:content,
				}
			})
			this.ROOTSTORE.Tips.Tip("修改成功")
			this.getCommonTextByUserAccountId()			
		}catch(error){
			this.ROOTSTORE.Tips.Tip("修改失败")
		}
	})
	getCommonTextByUserAccountId=flow(function*(){
		//通过用户id获取常用语信息--(查)
		let jsonOBJ={
			"user_Customer_Id":this.queryOBJ["CustomerId"],
			"user_Employee_Id":getLocalInfo()["EmployeeId"],
			"employeeName":getLocalInfo()["Name"],
			"translateName":getLocalInfo()["TranslateName"],
		}
		if(!this.queryOBJ["CustomerId"]){
			delete jsonOBJ["user_Customer_Id"]
		}
		try{
			const result=yield getFetch({
				url:"/api/User_Employee/GetEmployeeLanguageListAsync",
				data:jsonOBJ
			})
			this.commonText=result;
			if(result.length==0){
				return false
			}
			//记住每次的选择
			if(!this.switchedGroup){
				this.switchGroup(result[0]["EmployeeLabelTypeId"])
			}	
			return result			
		}catch(error){
			console.log(error);
			this.ROOTSTORE.Tips.Tip("获取术语失败")
		}
	})
}

export default CommonTextState