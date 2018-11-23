import "./ChatRoom.scss"
import Icon from "publicComponent/Icon/Icon.jsx"
import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import ChatBar from "Chat/Chat.component/ChatBar/ChatBar.jsx"
import ChatWatting from "../Chat.component/ChatWatting/ChatWatting.jsx"
import UpLoadWatting from "../Chat.component/ChatBar/UpLoadWaitting/UpLoadWatting.jsx"
import ChatBarDisable from "Chat/Chat.component/ChatBar/ChatBarDisable/ChatBarDisable.jsx"
import TabSwitch from "publicComponent/BeatComponent/TabSwitch/TabSwitch.jsx"
import ChatBubble from "Chat/Chat.component/ChatBubble/ChatBubble.jsx"
import getWeiChatStore from "getWeiChatStore"
import {inject,observer} from "mobx-react"
import getLocalInfo from "getLocalInfo"
import PathName from "PathName"
import {toJS} from "mobx"
import url from "url"
/*import vConsole from "vConsole"

new vConsole()*/

@inject("RootStore")
@observer class ChatRoom extends React.Component {
	render(){
		return (
		<Page className="ChatRoom">
			<TopBar>
				<TopBar.Middle>{this.HeaderComponent}</TopBar.Middle>
				<TopBar.Right>{this.ChatMemberComponent}</TopBar.Right>
				<TopBar.Extend><UpLoadWatting/></TopBar.Extend>
			</TopBar>
			<ChatWatting></ChatWatting>
			<div ref="chatHistoryShell" className="ChatGroup-chatHistory">
				<div ref="historyInner" className="ChatGroup-chatHistory-inner">
					{this.ChatHistoryList}
				</div>
			</div>
			<Page.Bottom>
				{this.BottomComponent}
			</Page.Bottom>	
		</Page>
	)}
	constructor(props){
	  	super(props);
		this.userDoSomeThing=false;
		
	  	this.userInfo=getLocalInfo()
	  	this.RootStore=this.props.RootStore;
	  	this.store=getWeiChatStore(this).ChatRoom;
		this.query=url.parse(this.props.location.search,true)["query"];
		this.ChatWattingStore=this.store.ChatWattingState;
		this.CustomerChatStore=this.store.CustomerChatState;
		this.CompanyChatStore=this.store.CompanyChatState;
		this.FastBackStore=this.store.FastBackGroupState;
		this.EmployeeChatStore=this.store.EmployeeChatState;
	}
	get HeaderComponent(){
		if(this.query["ChatType"]=="2"){return this.FastBackStore["groupName"]}
		if(this.query["ChatType"]=="3"){return this.query["Name"]}
		if(this.query["ChatType"]=="5"){return this.query["Name"]}
		return (
		<TabSwitch className="ChatRoom-TabSwitch" relation={this.CustomerChatStore.ActiveGroup} onChange={this.handleTabGroup}>
			<TabSwitch.ButtonItem className="ChatRoom-TabSwitchItem" keyname="OUTER">
				<div className="ChatRoom-TabSwitchItem">
					{this.CustomerChatStore.Groups["OUTER"]["name"]||"讨论组"}
					{this.CustomerChatStore.Groups["OUTER"]["unRead"]!==0?<div className="ChatRoom-unReadTip"></div>:null}
				</div>
			</TabSwitch.ButtonItem>
			<TabSwitch.ButtonItem className="ChatRoom-TabSwitchItem" keyname="INNER">
				<div className="ChatRoom-TabSwitchItem">
					{this.CustomerChatStore.Groups["INNER"]["name"]||"内部讨论"}
					{this.CustomerChatStore.Groups["INNER"]["unRead"]!==0?<div className="ChatRoom-unReadTip"></div>:null}
				</div>
			</TabSwitch.ButtonItem>
		</TabSwitch>		
	)}
	get dataList(){
		//聊天信息数据源
		if(this.query["ChatType"]=="2"){return this.FastBackStore.backHistory}
		if(this.query["ChatType"]=="3"){return this.EmployeeChatStore.ChatHistory}
		if(this.query["ChatType"]=="5"){return this.CompanyChatStore.ChatHistory}
		return this.CustomerChatStore.Groups[this.CustomerChatStore.ActiveGroup].ChatHistory
	}
	get ChatHistoryList(){
		//聊天列表
		let prevTime=0
		return this.dataList.map((val,index)=>{
			let unixTime=moment(val["CreateTime"]).toDate().getTime()
			let timeLable=(()=>{
				if(unixTime-prevTime>300000){
					prevTime=unixTime;
					return <div className="time-lable">{val["DateText"]}</div>
				}else{
					prevTime=unixTime;
					return null
				}
			})()
			//console.log(timeLable);
			return (
			<div className="chatHistory" key={index}>
				{timeLable}
				<ChatBubble {...val} onLoad={this.handleImgLoad}/>									
			</div>)
		}) 		
	}
	get ChatMemberComponent(){
		//是否可以操作群成员
		if(this.query["ChatType"]){
			return null
		}else{
			return <Icon icon="tab_icon_3" to={this.toChatMember}/>
		}	
	}
	get BottomComponent(){
		if(this.query["ChatType"]){
			<ChatBar onEmit={this.handleEmit}/>
		}
		if(this.CustomerChatStore.ActiveGroup=="INNER"){
			//内部群始终可以发消息
			return <ChatBar onEmit={this.handleEmit}/>
		}
		if(this.CustomerChatStore.canEmit){
			return <ChatBar onEmit={this.handleEmit}/>
		}else{
			return <ChatBarDisable text={this.CustomerChatStore.inputPlaceholder}/>
		}			
	}
	get toChatMember(){
		return url.format({
			pathname:PathName.ChatMemberList,
			query:{
				CustomerId:this.CustomerChatStore.CUSTOMERID,
				outerGroupId:this.CustomerChatStore.outerGroupId,
				innerGroupId:this.CustomerChatStore.innerGroupId,
				groupName:this.CustomerChatStore.ActiveGroupInfo.name,
				groupId:this.CustomerChatStore.ActiveGroupId
			}
		})
	}
	async componentDidMount(){
		this.ChatWattingStore.pedding()
		document.addEventListener("touchmove",this.changeUserDoSomeThing)
		try{
			switch(this.query["ChatType"]){
				case "5":
					this.store.setChatType(this.query["ChatType"])
					await this.CompanyChatStore.initPage(this.query["groupId"])
				break;
				case "2":
					this.store.setChatType(this.query["ChatType"])
					await this.FastBackStore.initPage(this.query["groupId"])				
				break;
				case "3":
					this.store.setChatType(this.query["ChatType"])
					await this.EmployeeChatStore.initPage(this.query["Id"])		
				break;			
				default:
					this.store.setChatType(0)
					await this.CustomerChatStore.initPage(this.query["CustomerId"],this.query["type"])
			}	
			this.ChatWattingStore.complate()	
		}catch(error){
			this.ChatWattingStore.fail(error)
		}
	}
	componentWillUnmount(){
		this.FastBackStore.leaveChatRoom()
		this.EmployeeChatStore.leaveChatRoom()
		this.CustomerChatStore.leaveChatRoom()
		this.CompanyChatStore.leaveChatRoom()
		document.removeEventListener("touchmove",this.changeUserDoSomeThing)
	}
	componentDidUpdate(prevProps,prevState){
		this.userDoSomeThing=false
	  	this.scrollToBottom()
	}
	handleTabGroup=(switchOBJ)=>{
		this.userDoSomeThing=false
		const {chatHistoryShell,historyInner}=this.refs
		const {query}=url.parse(this.props.location.search,true)
		this.props.history.replace({
			pathname:PathName.ChatRoom,
			search:`CustomerId=${query["CustomerId"]}&type=${switchOBJ["keyname"]}`
		})			
		this.CustomerChatStore.tabGroup(switchOBJ["keyname"])
	};
	handleEmit=(message)=>{this.store.emitTextMessage(message)};
	//控制页面滚动的函数
	handleImgLoad=()=>{
		if(this.userDoSomeThing){
			return false
		}else{
			this.scrollToBottom()
		}
	};
	changeUserDoSomeThing=()=>{
		//用户是否进行了操作
		this.userDoSomeThing=true
	};
	scrollToBottom=()=>{
		const {chatHistoryShell,historyInner}=this.refs
		historyInner.scrollIntoView(false)
	};
}

export default ChatRoom