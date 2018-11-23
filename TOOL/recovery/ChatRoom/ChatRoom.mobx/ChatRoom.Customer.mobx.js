import {observable,action,computed,reaction,toJS,flow} from "mobx"
import * as ChatRoomApi from "../ChatRoom.Ajax/ChatRoom.Ajax.js" 
import getLocalInfo from "getLocalInfo"
import history from "RouteConfig"

class CustomerChatState {
	constructor(ROOTSTORE,CHATROOMSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CHATROOMSTORE=CHATROOMSTORE;
		//快速备忘录逻辑
		/*---<不需要观察的值>---*/
		this.ROOTSTORE=ROOTSTORE;
		this.TIMMER=null;
		this.CUSTOMERID="";
		/*---<需要观察的值>---*/	
		reaction(()=>{
			return this.ActiveGroup
		},(ActiveGroup)=>{
			this.Groups["INNER"]["prevMessageCount"]=this.Groups["INNER"]["messageCount"]
			this.Groups["OUTER"]["prevMessageCount"]=this.Groups["INNER"]["messageCount"]
			//console.log(this.Groups["INNER"]["prevMessageCount"]==this.Groups["INNER"]["messageCount"]);
			//console.log(this.Groups["OUTER"]["prevMessageCount"]==this.Groups["INNER"]["messageCount"]);
		})
	}
	@observable Groups={
		INNER:{
			name:"",
			unRead:0,
			ChatType:0,
			groupId:"",
			ChatHistory:[],
			messageCount:0,
			prevMessageCount:0,
		},
		OUTER:{
			name:"",
			unRead:0,
			ChatType:0,
			groupId:"",
			ChatHistory:[],
			messageCount:0,
			prevMessageCount:0,
		},
	};
	@observable ActiveGroup="OUTER";
	@observable canEmit=true;
	@observable inputPlaceholder="";	
	@computed get ActiveGroupId(){
		if(this.Groups[this.ActiveGroup]){
			return this.Groups[this.ActiveGroup]["groupId"]
		}else{
			return null
		}
	}
	@computed get ActiveGroupInfo(){
		if(this.Groups[this.ActiveGroup]){
			return this.Groups[this.ActiveGroup]
		}else{
			return null
		}		
	}
	@computed get innerGroupId(){
		return this.Groups.INNER.groupId
	}
	@computed get outerGroupId(){
		return this.Groups.OUTER.groupId
	}	
	@action leaveChatRoom(){
		//离开页面时的清理函数
		clearInterval(this.TIMMER);
		this.CUSTOMERID="";
		
		this.Groups["INNER"]["ChatType"]=0;		
		this.Groups["INNER"]["name"]="";
		this.Groups["INNER"]["groupId"]="";
		this.Groups["INNER"]["unRead"]=0;
		this.Groups["INNER"]["scrollTop"]=0;
		this.Groups["INNER"]["ChatHistory"]=[];
		this.Groups["INNER"]["messageCount"]=0;
		this.Groups["INNER"]["prevMessageCount"]=0;
		
		this.Groups["OUTER"]["ChatType"]=0;
		this.Groups["OUTER"]["name"]="";
		this.Groups["OUTER"]["groupId"]="";
		this.Groups["OUTER"]["unRead"]=0;
		this.Groups["OUTER"]["scrollTop"]=0;
		this.Groups["OUTER"]["ChatHistory"]=[];
		this.Groups["OUTER"]["messageCount"]=0;
		this.Groups["OUTER"]["prevMessageCount"]=0;		
		this.ActiveGroup="OUTER";		
		//将聊天框重置为可发送状态
		this.canEmit=true;
		this.inputPlaceholder="";
	}
	initPage=flow(function*(CustomerId,type){
		yield this.getGroupInfoByCustomerId(CustomerId)
		yield this.tabGroup(type)
	})
	tabGroup=flow(function*(groupType){
		this.ActiveGroup=groupType
		const ActiveGroupInfo=this.Groups[this.ActiveGroup]
		//将相应群的未读消息数清零
		ActiveGroupInfo["unRead"]=0;
		clearInterval(this.TIMMER);
		try {
			yield this.getActiveGroupHistory()
			//this.CHATROOMSTORE.ChatRoomDebugState.complate()
			this.TIMMER=setInterval(this.getActiveGroupHistory.bind(this),3000)	
		}catch(error){
			throw error
		}
	})
	getGroupInfoByCustomerId=flow(function*(CustomerId){
		//根据客户Id获取客户关联的内部群和外部群信息
		this.CUSTOMERID=CustomerId;
		try{
			const groupInfo=yield ChatRoomApi.getGroupInfoByCustomerId(CustomerId)
			//拿到群信息后先根据State判断是否应该锁定聊天框
			this.state=groupInfo["State"]
			switch(groupInfo["State"]) {
				case "1":
					this.canEmit=false;						
				break;
				case "2":
					this.canEmit=false;
				break;
				case "3":
					this.canEmit=false;					
				break;
				default:
					this.canEmit=true;
			}
			if(!this.canEmit){
				this.inputPlaceholder=groupInfo["Message"]
			}
			//添加相应的聊天组信息
			groupInfo["list"].map((ChatGroupInfo,index)=>{
				switch(ChatGroupInfo["ChatType"]){
					case 1:
						this.Groups["INNER"]["ChatType"]=1;
						this.Groups["INNER"]["groupId"]=ChatGroupInfo["Id"]
						this.Groups["INNER"]["name"]=ChatGroupInfo["Name"]
						this.Groups["INNER"]["unRead"]=ChatGroupInfo["UnReadCount"]
					break;
					case 0:
						this.Groups["OUTER"]["ChatType"]=0;
						this.Groups["OUTER"]["groupId"]=ChatGroupInfo["Id"]
						this.Groups["OUTER"]["name"]=ChatGroupInfo["Name"]	
						this.Groups["OUTER"]["unRead"]=ChatGroupInfo["UnReadCount"]
					break		
				}
			})	
		}catch(error){
			this.ROOTSTORE.DialogPromise.showTimeOut({
				title:"提示",
				message:error,	
				time:1500,
			}).then(()=>{
				history.replace("/WeiChat/ChatIndex/")
			}).catch(()=>{
				history.replace("/WeiChat/ChatIndex/")
			})
			throw `第一步出错,根据客户Id获取客户关联的内部群和外部群信息`		
		}
	})
	getActiveGroupHistory=flow(function*(){
		//根据当前活动的讨论组获取聊天记录
		const ActiveGroupInfo=this.Groups[this.ActiveGroup]
		const wl_Chat_InfoId=ActiveGroupInfo["groupId"]
		try{
			let ChatHistory=[]
			//console.log(wl_Chat_InfoId);
			switch(ActiveGroupInfo.ChatType){
				case 1:
					ChatHistory=yield ChatRoomApi.getActiveGroupHistory(wl_Chat_InfoId)
				break;

				case 0://ChatType为0(客户讨论组)需做特殊处理
					ChatHistory=yield ChatRoomApi.getActiveGroupHistory(wl_Chat_InfoId,0,this.CUSTOMERID)
				break;
			}		
			if(ChatHistory["list"]["count"]>ActiveGroupInfo["messageCount"]){
				ActiveGroupInfo["ChatHistory"]=ChatHistory["list"]["data"];
			}
			ActiveGroupInfo["messageCount"]=ChatHistory["list"]["count"];
			//console.log(toJS(ChatHistory["State"]));
			//拿到群信息后先根据State判断是否应该锁定聊天框
			this.state=ChatHistory["State"]
			switch(ChatHistory["State"]){
				case "1":
					this.canEmit=false;						
				break;
				case "2":
					this.canEmit=false;
				break;
				case "3":
					this.canEmit=false;					
				break;
				default:
					this.canEmit=true;
			}
			if(!this.canEmit){
				this.inputPlaceholder=ChatHistory["Message"]
			}		
		}catch(error){
			throw error
		}			
	})
	emitMessageToActiveGroup=flow(function*(message,recordType="1"){
		//发送聊天消息
		const ActiveGroupInfo=this.Groups[this.ActiveGroup]
		try {
			const user_Account_Id=getLocalInfo()["Id"]
			const user_Customer_Id=this.CUSTOMERID;
			const wl_Chat_InfoId=ActiveGroupInfo["groupId"];
			const result=yield ChatRoomApi.emitMessageToActiveGroup({
					recordType:recordType,
					user_Account_Id:user_Account_Id,
					recordContent:message,
					user_Customer_Id:user_Customer_Id,
					wl_Chat_InfoId:wl_Chat_InfoId,			
			})
			//发送消息之后
			this.state=result["State"]
			switch(result["State"]) {
				case "1":
					this.canEmit=false;						
				break;
				case "3":
					this.canEmit=false;					
				break;
				default:
					this.canEmit=true;
			}
			if(!this.canEmit){
				this.inputPlaceholder=result["Message"]
			}
			this.getActiveGroupHistory()
		}catch(e){
			this.ROOTSTORE.Tips.Tip("消息发送失败!")
		}
	})
}

export default CustomerChatState