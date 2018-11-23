import {observable,action,flow} from "mobx"
import {postFetch,getFetch} from "fetchFn"

class CommonTextPanelState {
	constructor(ROOTSTORE,CHATBARSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CHATBARSTORE=CHATBARSTORE
	}
	@observable commonTextId="";
	@observable display=false;//显示还是隐藏
	@observable modeType="";//编辑模式还是新增术语模式
	@observable content="";//与文本域绑定的内容	
	@action initState(){
		this.commonTextId="";

		this.content="";
		this.display=false;
		this.modeType="";
	}
	@action inputCommonText(text){
		this.content=text
	}
	@action adoptEditMode(commonOBJ){
		//采用术语编辑模式
		this.commonTextId=commonOBJ["id"];

		this.modeType="EDIT"
		this.content=commonOBJ["content"];
		this.display=true	
	}
	@action adoptFreeMode(){
		//采用自由输入模式(新增术语)
		this.modeType="FREEINPUT"
		this.content=""
		this.display=true	
	}
	@action closePanel(){
		this.initState()
	}
	saveCommonText=flow(function*(){
		//保存术语
		switch(this.modeType) {
			case "FREEINPUT":
				yield this.CHATBARSTORE.CommonTextState.addCommonText({
					content:this.content,
				})
			break;
			case "EDIT":
				yield this.CHATBARSTORE.CommonTextState.upDateCommonText({
					commonId:this.commonTextId,
					content:this.content,
				})
			break;
		}
		this.closePanel()
	})
	saveAndEmit=flow(function*(){
		//保存并发送术语
		switch(this.modeType){
			case "FREEINPUT":
				yield this.CHATBARSTORE.CommonTextState.addCommonText({
					content:this.content,
				})
				yield this.ROOTSTORE.WeiChatStore.ChatRoom.emitTextMessage(this.content)
			break;
			case "EDIT":
				yield this.CHATBARSTORE.CommonTextState.upDateCommonText({
					commonId:this.commonTextId,
					content:this.content,
				})
				yield this.ROOTSTORE.WeiChatStore.ChatRoom.emitTextMessage(this.content)
			break;
		}
		this.closePanel()	
	})
} 

export default CommonTextPanelState