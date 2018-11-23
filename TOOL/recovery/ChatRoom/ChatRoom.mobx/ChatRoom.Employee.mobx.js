import {observable,action,flow} from "mobx"
import * as ChatRoomApi from "../ChatRoom.Ajax/ChatRoom.Ajax.js"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class EmployeeChatState {
	constructor(ROOTSTORE,CHATROOMSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CHATROOMSTORE=CHATROOMSTORE;
		
		this.messageCount=0;
		this.groupId="";
		this.timmer=null;
	}
	@observable groupName="";
	@observable unReadCount=0;
	@observable ChatHistory=[]; 
	@action createLoop(){
		this.timmer=setInterval(()=>{
			this.getEmployeeChatHistory()
		},3000)
	}
	@action initPage=flow(function*(groupId){
		this.groupId=groupId
		this.getEmployeeChatHistory()
		this.createLoop()	
	})
	@action leaveChatRoom(){
		clearInterval(this.timmer)
		this.groupId="";
		this.groupName="";
		this.unReadCount=0;
		this.ChatHistory=[];
		this.messageCount=0;
	}	
	getEmployeeChatHistory=flow(function*(){
		//获取点对点群聊的聊天记录
		try{
			const ChatHistory=yield ChatRoomApi.getActiveGroupHistory(this.groupId)
			if(ChatHistory["list"]["count"]>this.messageCount){
				this.ChatHistory=ChatHistory["list"]["data"]
			}
			this.messageCount=ChatHistory["list"]["count"]		
		}catch(error){
			this.ROOTSTORE.Tips.Tip("聊天信息获取失败")
		}
	})
	emitMessageToEmployeeGroup=flow(function*(message,recordType=1){
		//发送消息到员工单聊
		try{
			yield ChatRoomApi.emitMessageToServer(message,this.groupId,recordType)
			this.getEmployeeChatHistory()	
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)
		}
	})
}

export default EmployeeChatState