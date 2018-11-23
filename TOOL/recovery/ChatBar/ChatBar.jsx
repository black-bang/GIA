import "./ChatBar.scss"
import UpLoadImage from "./UpLoadImage/UpLoadImage.jsx"
import Button from "publicComponent/BeatComponent/Button/Button.jsx"
import ChatInput from "./ChatInput/ChatInput.jsx"
//import HtmlInput from "./HtmlInput/HtmlInput.jsx"
import Commontext from "../CommonText/CommonText.jsx"
import {observer,inject} from "mobx-react"
import getWeiChatStore from "getWeiChatStore"

@inject("RootStore")
@observer class ChatBar extends React.Component {
	render(){
		const ChatBar_bottom=classnames({
			ChatBar_bottom:true,
			ChatBar_bottom_hidden:!this.state.ExtendPanel
		})
		return (
		<div className="ChatBar">
			{
				this.state.ExtendPanel?
				<div className="ChatBar-blankArea" onClick={this.handleCloseExtendsTool}></div>
				:null
			}
			<div className="ChatBar-funcBar">
				<Button className="Commontext-btn" onClick={this.handleExtendPanel}>
					{(()=>{
						if(this.state.ExtendPanel){
							return <i className="fa fa-th-list"></i>
						}else{
							return "常用语"
						}
					})()}
				</Button>
				<ChatInput 
					relation={this.store.inputText}
					className="ChatInput"
					placeholder="新消息"
					onChange={this.handleInput}
					onEnter={this.handleEmit}				
				/>
				{/*<HtmlInput></HtmlInput>*/}
				<Button active={this.store.inputText?true:false} ref="emitBtn" activeClass="EmitBtn-active" onClick={this.handleEmit}>
					{"发送"}
				</Button>	
				<UpLoadImage></UpLoadImage>	
			</div>
			<div className={ChatBar_bottom}>
				<Commontext></Commontext>
			</div>
		</div>	
	)}
	constructor(props){
		super(props);
		//this.ChatBarRef=null;
		this.state={ExtendPanel:false};
		this.ChatRoomStore=getWeiChatStore(this).ChatRoom
		this.store=this.ChatRoomStore.ChatBarState;
		this.ChatRoomStore=getWeiChatStore(this).ChatRoom;
		this.FastBackStore=this.ChatRoomStore.FastBackGroupState;
	}
	componentWillUnmount(){
		this.store.clearStore()
	}
	// setChatBarRef=(element)=>{
	// 	this.ChatBarRef=element
	// };
	handleCloseExtendsTool=(e)=>{
		this.setState({ExtendPanel:false})
	};
	handleExtendPanel=(e)=>{
		//开关拓展菜单
		this.setState({ExtendPanel:!this.state.ExtendPanel})
	};
	handleInput=(inputOBJ)=>{
		this.store.inputMessage(inputOBJ["keyvalue"])
	};
	handleEmit=(e)=>{ 	
		this.props.onEmit(this.store.inputText)
		this.store.inputMessage("")
	};
	static defaultProps={
	  	onEmit:()=>{},
	}
}

export default ChatBar