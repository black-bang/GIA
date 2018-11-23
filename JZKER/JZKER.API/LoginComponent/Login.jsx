import includeFrame from "../iframe.api/includeFrame.js"
import storage from "../storage.api/storage.js"

@includeFrame
class Login extends React.Component {
	render(){
		return (
		<iframe 
			ref="LoginFrame"
			style={{width:"100%",height:"100%",border:"none"}}
			src="http://192.168.65.100:8082"
			onLoad={this.handleLoad}
		/>
	)}
	componentDidMount(){
		//监听不需要等待准备完成
		this.props.self.on("loginSuccess",function(userInfo){
			storage.saveLoginInfo(userInfo);
			PubSub.publish("LOGIN_SUCCESS")
		})
	}
	componentWillUnmount(){
		const {LoginFrame}=this.refs;
		this.props.includeFrame.emit("clearLoginInfo",{},LoginFrame)		
	}
	handleLoad=()=>{
		const {LoginFrame}=this.refs;
		this.props.includeFrame.target(LoginFrame)
		this.props.includeFrame.emit("aaa",{})
	}
}

export default Login