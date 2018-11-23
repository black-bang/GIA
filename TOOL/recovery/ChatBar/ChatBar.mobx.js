import {observable,action} from "mobx"
import CommonTextState from "../CommonText/CommonText.mobx.js"
import CommonTextPanelState from "../CommonText/CommonTextPanel/CommonTextPanel.mobx.js"

class ChatBarState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE;
		this.CommonTextState=new CommonTextState(ROOTSTORE,this)
		this.CommonTextPanelState=new CommonTextPanelState(ROOTSTORE,this)		
	}
	@observable inputText="";
	@action inputMessage(message){
		this.inputText=message
	}	
	@action clearStore(){
		this.inputText=""
	}
}

export default ChatBarState