import {HashRouter,Route} from "react-router-dom"
import withFrame from "../iframe.api/withFrame.js"
import includeFrame from "../iframe.api/includeFrame.js"
import storage from "../storage.api/storage.js"
import Login from "./Login.jsx"


@withFrame
class WithLogin extends React.Component {
	//页面会嵌套在iframe中,所以要使用withFrame
	render(){
		if(storage.isLogin){
			return this.props.children
		}else{
			if(this.props.isFrame){
				//当嵌套在iframe中的时候,不要显示登录
				return null
			}else{
				return (
				<HashRouter>
					<div className="AppRouter">
						<Route path="/" component={Login}/>
					</div>
				</HashRouter>
			)}
		}		
	}
	constructor(props) {
	  	super(props);
		if(this.props.isFrame){
			//当处于iframe中的时候需要先清空本地缓存
			window.localStorage.clear()
			this.props.self.on("setUserInfo",(userInfo)=>{
				//跳转时传递用户登录信息的事件
				storage.saveLoginInfo(userInfo);
				PubSub.publish("LOGIN_SUCCESS");
				this.forceUpdate()
			})			
		}else{
			//不处于frame中的时候
			PubSub.subscribe("LOGIN_SUCCESS",()=>{
				this.forceUpdate()
			})			
		}
	}
}

export default WithLogin