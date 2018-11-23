import "./SwipeCard.scss"
import Hammer from "hammerjs"
import SwipeCardContent from "./SwipeCard.Content/SwipeCard.Content.jsx"
import SwipeCardButtonGroup from "./SwipeCard.ButtonGroup/SwipeCard.ButtonGroup.jsx"


export default class SwipeCard extends React.PureComponent {
	render(){
		return (
		<div className="SwipeCard" ref="SwipeCardShell">
			<div className="SwipeCard-content" ref="content" style={this.ComputedStyle.content}>
				{this.ContentComponent}
			</div>
			<div className="SwipeCard-ButtonGroup" ref="ButtonGroup" >
				{this.ButtonGroupComponent}				
			</div>	
		</div>			
	)}
	get ComputedStyle(){
		if(this.state.open){
			return {
				content:{transform:`translateX(-${this.state.CurrentMove}px)`},
				ButtonGroup:{transform:"translateX(0px)"}
			}
		}else{
			return {
				content:{transform:"translateX(0px)"},
				ButtonGroup:{transform:`translateX(${this.state.CurrentMove}px)`}
			}
		}
	}	
	//--<渲染各部分结构>--//
	get ContentComponent(){
		return React.Children.map(this.props.children,(child)=>{
			if(!child){return null}
			if(child.type.ComponentName=="SwipeCardContent"){
				return child
			}
		})
	}
	get ButtonGroupComponent(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(!child){return null}
			if(child.type.ComponentName=="SwipeCardButtonGroup"){
				return child
			}
		})
	}
	constructor(props){
	  	super(props);
	  	this.state={open:false,CurrentMove:0};
	}
	componentDidMount(){
		const {SwipeCardShell,content,ButtonGroup}=this.refs;
		this.contentHammer=new Hammer(SwipeCardShell);
		this.bodyHammer=new Hammer(document.body);
		this.setState({CurrentMove:ButtonGroup.offsetWidth})
		this.contentHammer.on("swipeleft",this.handleLeft);
	}
	componentWillUpdate(nextProps,nextState){
		if(nextState.open){
			this.bodyHammer.on("tap",this.handleClose);
			this.bodyHammer.on("swiperight",this.handleRight);			
			this.token=PubSub.subscribe("SWIPE_OPEN",this.handleClose)
		}else{
			this.bodyHammer.off("tap",this.handleClose);
			this.bodyHammer.off("swiperight",this.handleRight);
			PubSub.unsubscribe(this.token)
		}
	}
	componentWillUnmount(){
		this.bodyHammer.destroy("tap",this.handleClose);
		this.bodyHammer.destroy("swiperight",this.handleRight);
		this.contentHammer.destroy("swipeleft",this.handleLeft);	
		PubSub.unsubscribe(this.token);	
	}
	handleLeft=(e)=>{
		if(!this.state.open){
			const {content}=this.refs;
			this.setState({open:true})
			PubSub.publish("SWIPE_OPEN",content)			
		}else{
			return false
		}
	};
	handleRight=(e)=>{
		this.setState({open:false})		
	};
	handleClose=(eventName,param)=>{
		const {content}=this.refs;
		if(content==param){
			return false
		}else{
			if(this.state.open){
				this.setState({open:false})
			}else{
				return false
			}
		}
	};
	static Content=SwipeCardContent;
	static ButtonGroup=SwipeCardButtonGroup;
}