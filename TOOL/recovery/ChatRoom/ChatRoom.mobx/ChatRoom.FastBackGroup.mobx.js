import {observable,action,flow} from "mobx" 
import * as ChatRoomApi from "../ChatRoom.Ajax/ChatRoom.Ajax.js"
import {getFetch,postFetch} from "fetchFn"
import getLocalInfo from "getLocalInfo"

class FastBackGroupState {
	constructor(ROOTSTORE,CHATROOMSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CHATROOMSTORE=CHATROOMSTORE;
		this.groupId="";
		this.groupName="快速备忘录"
	}
	@observable backHistory=[];
	@action leaveChatRoom(){
		this.groupId="";
	}
	initPage=flow(function*(groupId){
		this.groupId=groupId
		this.queryBackHistoryByGroupId()	
	})
	queryBackHistoryByGroupId=flow(function*(){
		//根据快速备忘录的群id获取备忘历史
		try{
			const backHistory=yield ChatRoomApi.getActiveGroupHistory(this.groupId)
			this.backHistory=backHistory["list"]["data"]
		}catch(error){
			this.ROOTSTORE.Tips.Tip("获取信息失败")
		}
	})
	emitMessageToFastBack=flow(function*(message,recordType=1){
		//发送消息到快速备忘录
		try{
			yield ChatRoomApi.emitMessageToServer(message,this.groupId,recordType)	
			this.queryBackHistoryByGroupId()
		}catch(error){
			this.ROOTSTORE.Tips.Tip(error)
		}
	})
}

export default FastBackGroupState