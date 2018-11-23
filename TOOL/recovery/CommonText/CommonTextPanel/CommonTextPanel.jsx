import "./CommonTextPanel.scss"
import Mask from "publicComponent/Mask/Mask.jsx"
import ButtonInfo from "publicComponent/Button/Button.Info.jsx"
import TextArea from "publicComponent/Form/TextArea/TextArea.jsx"
import {observer,inject} from "mobx-react"
import getWeiChatStore from "getWeiChatStore"

@inject("RootStore")
@observer class CommonTextPanel extends React.Component {
	render(){
		return (
		<Mask show={this.store.display}>
			<div className="CommonTextPanel">
				<div className="CommonTextPanel-header">
					{(()=>{
						switch(this.store.modeType){
							case "EDIT":
								return "编辑" 	
							break;
							case "FREEINPUT":
								return "新增"
							break;
						}
					})()}
					<div className="CommonTextPanel-header-close">
						<i onClick={this.handleClose.bind(this)} className="fa fa-times"></i>
					</div>
				</div>	
				<div className="CommonTextPanel-textArea">
					<TextArea 
						maxLength={100}
						relation={this.store.content}
						className="CommonTextPanel-textAreaElement" 
						placeholder="添加常用语"
						onChange={this.handleChange.bind(this)}
					/>
				</div>	
				<div className="CommonTextPanel-buttonGroup">
					<ButtonInfo active={this.canSubmit.call(this)} className="save" text="保存" onClick={this.handleSave.bind(this)}/>
					<ButtonInfo active={this.canSubmit.call(this)} className="saveEmit" text="保存&发送" onClick={this.handleSaveAndEmit.bind(this)}/>
				</div>				
			</div>	
		</Mask>		
	)}
	constructor(props){
	  	super(props);
	  	this.ChatRoomStore=getWeiChatStore(this).ChatRoom
	  	this.ChatBarStore=this.ChatRoomStore.ChatBarState
	  	this.store=this.ChatBarStore.CommonTextPanelState
	}
	canSubmit(){
		const {content}=this.store
		if(content){
			return true
		}else{
			return false
		}
	}
	handleChange(textOBJ){
		this.store.inputCommonText(textOBJ["keyvalue"])
	}
	handleClose(){
		this.store.closePanel()
	}
	handleSave(){
		this.store.saveCommonText()
	}
	handleSaveAndEmit(){
		this.store.saveAndEmit()
	}
}

export default CommonTextPanel