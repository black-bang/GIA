import {postFetch,getFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

const getGroupInfoByCustomerId=function(CustomerId){
	//根据客户Id获取客户关联的内部群和外部群信息
	return getFetch({
		url:"/api/Wl_Chat_Info/ChatInfoByCustomerIdAsync",
		data:{user_Customer_Id:CustomerId}
	})	
}
export {getGroupInfoByCustomerId}

const getActiveGroupHistory=function(wl_Chat_InfoId,chatType="",user_Customer_Id=""){
	//根据当前活动的讨论组获取聊天记录
	return getFetch({
		url:"/api/Wl_Chat_Record/RecordListAsync/",
		data:{
			pagenum:0,
			pagesize:100,
			keyWord:"",
			chatType:chatType,
			wl_Chat_InfoId:wl_Chat_InfoId,
			user_Customer_Id:user_Customer_Id,

		}			
	})	
}
export {getActiveGroupHistory}

const emitMessageToActiveGroup=function(json){
	const {
		user_Account_Id,
		recordContent,
		user_Customer_Id,
		wl_Chat_InfoId,
		recordType
	}=json
	//console.log(user_Customer_Id);
	return getFetch({
		url:"/api/Wl_Chat_Record/SendMsgAsync/",
		data:{
			user_Account_Id:user_Account_Id,
			recordType:recordType,//文字是1,图片是2
			recordContent:recordContent,
			user_Customer_Id:user_Customer_Id,
			plantFrom:getLocalInfo()["PlantFrom"],
			platFrom_TranslateId:getLocalInfo()["TranslateId"],
			wl_Chat_InfoId:wl_Chat_InfoId,
		}
	})	
}
export {emitMessageToActiveGroup}

const emitMessageToServer=function(message,groupId,recordType="1"){
	//直接将数据发送到服务器,不走微信
	return postFetch({
		url:"/api/Wl_Chat_Record/AddRecordAsync/",
		data:{
			recordType:recordType,
			recordContent:message,
			wl_Chat_InfoId:groupId,
			user_Account_Id:getLocalInfo()["Id"],
		}
	})
}

export {emitMessageToServer}