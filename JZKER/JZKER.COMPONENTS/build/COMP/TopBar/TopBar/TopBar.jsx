import style from "./TopBar.scss"
import * as TopBarOther from "../TopBar.Other/TopBar.other.jsx"
//import WeiChatWebView from "publicApi/WeiChatWebView.js"

class TopBar extends React.PureComponent {
	render(){
		const TopBar=classnames(style["TopBar"],this.props.className);
		return (
		<div className={TopBar} style={this.props.style}>
			<div className={style["TopBar-top"]}>
				<div className={style["TopBar_Left"]}>
					{this.LeftChild}
				</div>
				<div className={style["TopBar_Middle"]}>
					{this.MiddleChild}
				</div>
				<div className={style["TopBar_Right"]}>
					{this.RightChild}
				</div>
			</div>
			<div className={style["TopBar-extendTool"]}>
				{this.ExtendChild}
			</div>
		</div>	
	)}
	get isPureTitle(){
		//是否是纯粹的标题栏
		return !(React.Children.map(this.props.children,(child,index)=>{
			return child.type.componentName==="TopBarMiddle"
		}).includes(false))
	}
	get LeftChild(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(child.type.componentName==="TopBarLeft"){
				return child
			};
		})	
	}
	get MiddleChild(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(child.type.componentName==="TopBarMiddle"){
				return child
			};
		})			
	}
	get RightChild(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(child.type.componentName==="TopBarRight"){
				return child
			};
		})			
	}
	get ExtendChild(){
		return React.Children.map(this.props.children,function(child,index){
			if(child.type.componentName==="TopBarExtendTool"){
				return child
			};
		})			
	}
	static componentName="TopBar";
	static Left=TopBarOther.TopBarLeft;
	static Middle=TopBarOther.TopBarMiddle;
	static Right=TopBarOther.TopBarRight;
	static Extend=TopBarOther.TopBarExtendTool;
	static Back=TopBarOther.TopBarBack;
}



export default TopBar