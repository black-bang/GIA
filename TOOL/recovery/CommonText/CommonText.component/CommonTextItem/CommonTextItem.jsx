import "./CommonTextItem.scss"
import PropTypes from "prop-types"
import {inject,observer} from "mobx-react"
import getWeiChatStore from "getWeiChatStore"

@inject("RootStore")
@observer class CommonTextItem extends React.Component {
	render(){
		const buttonGroup=classnames({
			"CommonTextItem-funcBtn":true,
			"CommonTextItem-funcBtn-show":this.props.showBtn
		})
		return (
		<div className="commonText-item">
			<div className="CommonTextItem-text" onClick={this.handleClick.bind(this)}>
				{this.props.text}
			</div>
			<div className={buttonGroup}>
				<div className="CommonTextItem-buttonGroup">				
					<div className="funcBtn-edit" onClick={this.handleEdit.bind(this)}>
						<i className="fa fa-pencil-square-o fa-lg"></i>
					</div>
					<div className="funcBtn-delete" onClick={this.handleDelete.bind(this)}>
						<i className="fa fa-trash-o fa-lg"></i>
					</div>							
				</div>
			</div>	
		</div>			
	)}
	constructor(props){
	  	super(props);
	  	this.state={canEmit:true}
	  	this.ChatRoomStore=getWeiChatStore(this).ChatRoom
	  	this.ChatBarStore=this.ChatRoomStore.ChatBarState
		this.CommonTextStore=this.ChatBarStore.CommonTextState
	  	this.CommonTextPanelStore=this.ChatBarStore.CommonTextPanelState
	}
	handleClick(){
		this.ChatBarStore.inputMessage(this.props.text)
	}
	handleEdit(){
		this.CommonTextPanelStore.adoptEditMode({
			id:this.props.commonTextId,
			content:this.props.text
		})
	}
	handleDelete(){
		this.CommonTextStore.delectCommonTextWithCommonId(this.props.commonTextId)
	}
}

CommonTextItem.propTypes={
	commonTextId:PropTypes.number.isRequired,
	text:PropTypes.string,
}

export default CommonTextItem