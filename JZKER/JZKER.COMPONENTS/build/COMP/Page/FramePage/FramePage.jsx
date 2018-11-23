import style from "./FramePage.scss"
import {withRouter} from "react-router-dom"
import includeFrame from "publicApi/WeiChatFrame/includeFrame.js"
import getLocalInfo from "getLocalInfo"
import url from "url"

@withRouter
@includeFrame
class FramePage extends React.PureComponent {
	render(){
		return (
		<iframe ref="FrameElement" className={style["FramePage"]} src={this.props.src} onLoad={this.handleLoad}/>	
	)}
	componentDidMount(){
		this.unlisten=this.props.self.on("signout",()=>{
			this.props.history.goBack()
		})
	}
	componentWillUnmount(){
		this.unlisten()
	}
	handleLoad=()=>{
		this.props.includeFrame.target(this.refs["FrameElement"])
		this.props.includeFrame.emit("setUserInfo",getLocalInfo())
	};
	static propTypes={
		src:PropTypes.string.isRequired,
	  	name:PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired
	}
}

export default FramePage