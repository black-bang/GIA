import Page from "publicComponent/Page/Page.jsx"
import FloatPage from "publicComponent/Page/FloatPage/FloatPage.jsx"
import Icon from "publicComponent/Icon/Icon.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import List from "publicComponent/List/List.jsx"
import Select from "publicComponent/Form/Select/Select.jsx"
import Portrait from "publicComponent/Portrait/Portrait.jsx"
import ButtonPromise from "AppComponent/ButtonPromise/ButtonPromise.jsx"
import ChatMemberItem from "Chat/Chat.component/ChatMemberItem/ChatMemberItem.jsx"
import {inject,observer} from "mobx-react"
import getWeiChatStore from "getWeiChatStore"
import getLocalInfo from "getLocalInfo"
import PathName from "PathName"
import {toJS} from "mobx"
import url from "url"
import ChangeMemberState from "./ChangeMember.mobx.js" 


@inject("RootStore")
@observer class ChangeMember extends React.Component {
	render(){
		return (
		<FloatPage>
		<Select relation={this.store.SelectMemberArray} onChange={this.handleSelect}>
			<Page>
				<TopBar>
					<TopBar.Middle>{this.TitleText}</TopBar.Middle>
					<TopBar.Right>
						<ButtonPromise active={this.canSubmit} onClick={this.handleSubmit}>
							{"完成"}
						</ButtonPromise>
					</TopBar.Right>
				</TopBar>	
				<Page.Top><Select.SelectAll/></Page.Top>
				<List>
					{this.store.MemberList.map((ListItem,index)=>{
						return (
						<List.Item key={index}>
							<Select.Item keyname={ListItem["AccountId"]}>
								<ChatMemberItem photo={ListItem["Picture"]} name={ListItem["AccountName"]}/>
							</Select.Item>
						</List.Item>)			
					})}
				</List>				
			</Page>	
		</Select>				
		</FloatPage>
	)}
	constructor(props){
	  	super(props);
	  	this.store=new ChangeMemberState();
	  	this.RootStore=this.props.RootStore;
	  	this.ChatMemberListStore=getWeiChatStore(this).ChatMemberList;
	  	this.query=url.parse(this.props.location.search,true)["query"];
	}
	async componentDidMount(){
		console.log(this.ChatMemberListStore);
		this.store.query=this.query
		try{
			if(this.query["ChangeType"]=="Add"){
				await this.store.getAllMemberInOrderToAdd()
			}
			if(this.query["ChangeType"]=="Delete"){
				await this.store.getAllMemberInOrderToDelete()
			}			
		}catch(error){
			this.RootStore.Tips.Tip(error)
		}
	}
	get canSubmit(){
		return this.store.SelectMemberArray.length>0
	}
	get TitleText(){
		if(this.query["ChangeType"]=="Add"){return "添加成员"}
		if(this.query["ChangeType"]=="Delete"){return "删除成员"}
	}
	handleSelect=(selectOBJ)=>{
		this.store.selectMember(selectOBJ["keyvalue"])
	};
	handleSubmit=async ()=>{
		try{
			if(this.query["ChangeType"]=="Add"){
				await this.store.addMember();
				await this.ChatMemberListStore.getMemberListByGroupId()
				this.RootStore.Tips.Tip("添加成功")
			}
			if(this.query["ChangeType"]=="Delete"){
				await this.store.deleteMember()
				await this.ChatMemberListStore.getMemberListByGroupId()
				this.RootStore.Tips.Tip("删除成功")	
			}
			this.props.history.replace(url.format({
				pathname:PathName.ChatRoom,
				query:{CustomerId:this.query["CustomerId"],type:"OUTER"}
			}))
		}catch(error){
			if(error=="取消"){
				return false
			}else{
				this.RootStore.Tips.Tip(error) 
			}
		}
	};
}

export default ChangeMember