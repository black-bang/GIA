import "./CommonText.scss"
import {withRouter} from "react-router-dom"
import TabSwitch from "publicComponent/BeatComponent/TabSwitch/TabSwitch.jsx"
import CommonTextPanel from "./CommonTextPanel/CommonTextPanel.jsx"
import CommonTextList from "./CommonText.component/CommonTextList/CommonTextList.jsx"
import getWeiChatStore from "getWeiChatStore"
import {inject,observer} from "mobx-react"
import {toJS} from "mobx"
import url from "url"

@withRouter
@inject("RootStore")
@observer class CommonText extends React.Component {
	render(){
		return (
		<div className="CommonText">
			<CommonTextPanel></CommonTextPanel>
			<TabSwitch relation={this.store.switchedGroup} onChange={this.handleSwitch}>
				{this.store.commonText.map((item,index)=>{
					return (
					<TabSwitch.Item key={index} keyname={item["EmployeeLabelTypeId"]}>
						<div>{item["LabelName"]}</div>
					</TabSwitch.Item>)
				})}
			</TabSwitch>
			<div className="CommonText-wrap">
				{this.store.commonText.map((item,index)=>{
					return (
					<CommonTextList
						key={index}
						keyname={item["EmployeeLabelTypeId"]}
						list={item["LanguageList"].slice()}
					/>)
				})}				
			</div>
			{(()=>{
				if(!this.store.editMode){
					return (
					<div className="CommonText-button">
						<div className="addCommon" onClick={this.AddCommonText}>
							<span>{"+新增"}</span>
						</div>	
						<div className="editBtn" onClick={this.handleEditMode}>
							<i className="fa fa-cog"></i>
						</div>
					</div>							
				)}else{
					return (
					<div className="CommonText-button">	
						<div className="addCommon" onClick={this.handleCancelEditMode}>
							<span>{"完成"}</span>
						</div>
					</div>						
				)}
			})()}				
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.ChatRoomStore=getWeiChatStore(this).ChatRoom
	  	this.ChatBarStore=this.ChatRoomStore.ChatBarState
	  	this.store=this.ChatBarStore.CommonTextState
	  	this.CommonTextPanelStore=this.ChatBarStore.CommonTextPanelState
	  	this.query=url.parse(this.props.location.search,true)["query"]
	}	
	async componentDidMount(){
		this.store.query=this.query
		const result=await this.store.getCommonTextByUserAccountId()
		if(result.length>0){
			this.store.switchGroup(result[0]["EmployeeLabelTypeId"])
		}
	}
	handleSwitch=(switchOBJ)=>{
		this.store.switchGroup(switchOBJ["keyname"])
	};
	handleEditMode=()=>{
		this.store.openEditMode()
	};
	handleCancelEditMode=()=>{
		this.store.cancelEditMode()
	};
	AddCommonText=()=>{
		this.CommonTextPanelStore.adoptFreeMode()
	};
}


export default CommonText