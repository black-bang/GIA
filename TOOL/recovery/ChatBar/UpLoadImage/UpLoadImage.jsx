import "./UpLoadImage.scss"
import Button from "publicComponent/BeatComponent/Button/Button.jsx"
import getWeiChatStore from "getWeiChatStore"
import {observer,inject} from "mobx-react"

@inject("RootStore")
@observer class UpLoadImage extends React.Component {
	render(){
		return (
		<Button className="upLoadImg">
			<i className="fa fa-plus"></i>
			<input type="file" onChange={this.handleUpload}/>
		</Button>
	)}
	constructor(props){
	  	super(props);
		this.ChatRoomStore=getWeiChatStore(this).ChatRoom
	}
	handleUpload=(e)=>{
		if(e.target.files.length>0){
			const file=e.target.files[0];
			this.ChatRoomStore.upLoadImageToTest(file)			
		}else{
			return false
		}
	}
}

export default UpLoadImage