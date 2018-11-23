import {observable,action,flow} from "mobx" 
import * as ChatRoomApi from "../ChatRoom.Ajax/ChatRoom.Ajax.js"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

//公司内部讨论组的state
class CompanyChatState {
	constructor(ROOTSTORE,CHATROOMSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CHATROOMSTORE=CHATROOMSTORE;
		this.timmer=null;
		this.groupId=""
		this.messageCount=0;
	}
	@observable ChatHistory=[];
	@action leaveChatRoom(){
		this.groupId="";
		clearInterval(this.timmer)
	}
	initPage=flow(function*(groupId){
		//刚进入页面的时候需要开轮询器
		this.groupId=groupId
		yield this.getCompanyChatInfo()
		this.timmer=setInterval(()=>{
			this.getCompanyChatInfo()
		},3000)
	})
	getCompanyChatInfo=flow(function*(){
		//获取聊天记录
		try{
			const groupInfo=yield ChatRoomApi.getActiveGroupHistory(this.groupId)
			if(groupInfo["list"]["count"]>this.messageCount){
				this.ChatHistory=groupInfo["list"]["data"];
				this.messageCount=groupInfo["list"]["count"]
			}			
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)
		}
	})	
	emitMessageToCompanyGroup=flow(function*(message,recordType="1"){
		//发送聊天消息
		try {
			const groupId=this.groupId
			const result=yield ChatRoomApi.emitMessageToServer(message,this.groupId,recordType)
			this.getCompanyChatInfo()
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)
		}
	})
}

export default CompanyChatState