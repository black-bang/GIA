import PropTypes from "prop-types"
import CommonTextItem from "../CommonTextItem/CommonTextItem.jsx"
import {inject,observer} from "mobx-react"

const CommonTextList=inject("RootStore")(observer(function(props){
	const commonTextStore=props.RootStore.WeiChatStore.ChatRoom.ChatBarState.CommonTextState
	if(props.keyname!==commonTextStore.switchedGroup){
		return null
	}else{
		return (
		<div className="CommonTextList">
			{props.list.map((ListItem,index)=>{
				return (
				<CommonTextItem
					key={index} 
					showBtn={commonTextStore.editMode}
					text={ListItem["Content"]} 
					commonTextId={ListItem["EmployeeLanguageId"]}					
				/>)
			})}
		</div>
	)}
}))


CommonTextList.propTypes={
	list:PropTypes.array,
	keyname:PropTypes.number,
}

export default CommonTextList