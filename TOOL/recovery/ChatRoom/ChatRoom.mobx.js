import {observable,action,computed,reaction,toJS,flow} from "mobx"
import ChatBarState from "../Chat.component/ChatBar/ChatBar.mobx.js"

import ChatWattingState from "../Chat.component/ChatWatting/ChatWatting.mobx.js"
import UpLoadState from "./ChatRoom.mobx/ChatRoom.Upload.mobx.js"
import CustomerChatState from "./ChatRoom.mobx/ChatRoom.Customer.mobx.js"
import CompanyChatState from "./ChatRoom.mobx/ChatRoom.Company.mobx.js"
import FastBackGroupState from "./ChatRoom.mobx/ChatRoom.FastBackGroup.mobx.js"
import EmployeeChatState from "./ChatRoom.mobx/ChatRoom.Employee.mobx.js"
import getLocalInfo from "getLocalInfo"

class ChatRoomState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.ChatType="";
		
		//聊天框服务
		this.ChatBarState=new ChatBarState(ROOTSTORE,this)
		//图片上传服务
		this.UpLoadState=new UpLoadState(ROOTSTORE,this)
		//聊天室等待组件
		this.ChatWattingState=new ChatWattingState(ROOTSTORE,this)
		//客户聊天
		this.CustomerChatState=new CustomerChatState(ROOTSTORE,this)
		//公司内部群聊
		this.CompanyChatState=new CompanyChatState(ROOTSTORE,this)
		//快速备忘录
		this.FastBackGroupState=new FastBackGroupState(ROOTSTORE,this)
		//员工单聊
		this.EmployeeChatState=new EmployeeChatState(ROOTSTORE,this)
	}
	@action setChatType(ChatType){
		this.ChatType=ChatType
	}
	emitTextMessage=flow(function*(message){
		//根据ChatType发送文字消息
		switch(this.ChatType){
			case "5":
				this.CompanyChatState.emitMessageToCompanyGroup(message)
			break;
			case "2":
				//this.FastBackGroupState.emitBackHistory(message)
				this.FastBackGroupState.emitMessageToFastBack(message)
			break;
			case "3":
				this.EmployeeChatState.emitMessageToEmployeeGroup(message)
			break;
			default :
				this.CustomerChatState.emitMessageToActiveGroup(message)
		}	
	})
	upLoadImageToTest=flow(function*(imageFile){
		//对上传文件的类型进行检查
		switch(imageFile.type){
			case "image/png":
				
			break;
			case "image/jpg":

			break;
			case "image/jpeg":

			break;
			case "image/bmp":

			break;
			case "image/gif":

			break;
			default:
				this.ROOTSTORE.Tips.Tip(`不支持的文件类型${imageFile.type}`)
				return false
		}
		//对上传文件的大小进行检查
		if(imageFile.size>1024*1024*5){
			this.ROOTSTORE.Tips.Tip("抱歉,上传的文件不能超过5M")
			return false
		}
		const formData=new FormData()
		formData.append("plantFromId",getLocalInfo()["PlantFrom"]);
		formData.append("userId",getLocalInfo()["Id"]);
		formData.append("image",imageFile);
		this.UpLoadState.upLoadPedding()
		try{
			const result=yield fetch("http://jzker.cn:5000/uploadImage",{
				method:"POST",
				body:formData
			}).then((response)=>{
				return response.json()
			})	
			//const imagePath=`http://jzker.cn:3000/image${result["filePath"]}`
			const imagePath=`${result["path"]}`
			//根据ChatType执行不同的文件上传
			switch(this.ChatType){
				case "5":
					yield this.CompanyChatState.emitMessageToCompanyGroup(imagePath,"2")
				break;
				case "2":
					yield this.FastBackGroupState.emitMessageToFastBack(imagePath,"2")
				break;
				case "3":
					yield this.EmployeeChatState.emitMessageToEmployeeGroup(imagePath,"2")
				break;
				default :
					yield this.CustomerChatState.emitMessageToActiveGroup(imagePath,"2")
			}
			this.UpLoadState.upLoadComplate()
		}catch(error){
			this.ROOTSTORE.Tips.Tip("发送失败,请稍后重试")
		}
	})
}

export default ChatRoomState