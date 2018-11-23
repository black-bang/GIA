import "./SwipeCard.scss"
import Hammer from "hammerjs"
import SwipeCardContent from "./SwipeCardContent/SwipeCardContent.jsx"
import SwipeCardButtonGroup from "./SwipeCardButtonGroup/SwipeCardButtonGroup.jsx"

class SwipeCard extends React.Component {
	render(){
		return (
		<div ref="Shell" className="SwipeCard-Shell">
			<div ref="swipeElement" className="SwipeCard-swipe" style={this.swipeStyle}>
				<div ref="content" className="SwipeCard-content">
					{this.ContentComponnet}
				</div>
				<div ref="buttonGroup" className="SwipeCard-buttonGroup">
					{this.SwipeComponent}	
				</div>					
			</div>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={open:false,contentWidth:0};
	}
	get ContentComponnet(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(!child){return null}
			if(child.type.ComponentName=="SwipeCardContent"){
				return child
			}
		})
	}
	get SwipeComponent(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(!child){return null}
			if(child.type.ComponentName=="SwipeCardButtonGroup"){
				return child
			}
		})
	}
	get swipeStyle(){
		if(this.state.open){
			//return {left:this.state.buttonGrouWidth}
			return {transform:`translateX(${this.state.buttonGrouWidth})`}
		}else{
			//return {left:"0px"}
			return {transform:`translateX(0px)`}
		}
	}
	get allChild(){
		const {Shell,swipeElement,content,buttonGroup}=this.refs;
		return Shell.getElementsByTagName("*")
	}
	componentDidMount(){
		const {Shell,swipeElement,content,buttonGroup}=this.refs;
		this.setState({buttonGrouWidth:-buttonGroup.offsetWidth+"px"})
		content.style.width=Shell.offsetWidth+"px"
		swipeElement.style.width=Shell.offsetWidth+buttonGroup.offsetWidth+"px"
		
		this.swipeHammer=new Hammer(swipeElement,{domEvents:true})
		this.swipeHammer.on("swipeleft",this.handleSwipeLeft)
		this.swipeHammer.on("swiperight",this.handleSwipeRight)

		this.documentManager=new Hammer(document)
		this.documentManager.on("pan",this.handlePan)
		window.addEventListener("click",this.handleClose)

	}
	componentWillUnmount(){
		this.documentManager.off("pan",this.handlePan)
		this.swipeHammer.off("swipeleft",this.handleSwipeLeft)
		this.swipeHammer.off("swiperight",this.handleSwipeRight)
		window.removeEventListener("click",this.handleClose)
	}
	handlePan=(e)=>{
		if(!this.state.open){
			return false
		}
		if((e.additionalEvent!=="panleft")&&(e.additionalEvent!=="panright")){
			return false
		};
		let isThisElement=false
		for(let key in this.allChild){
			if(this.allChild[key]==e.target){
				isThisElement=true
				break;
			}else{
				isThisElement=false
			}
		}
		if(!isThisElement){
			this.setState({open:false})
		}
	};
	handleClose=(e)=>{
		this.setState({open:false})		
	};
	handleSwipeLeft=(e)=>{
		//console.log(e);
		this.setState({open:true})
	};
	handleSwipeRight=(e)=>{
		this.setState({open:false})		
	};
	static Content=SwipeCardContent;
	static ButtonGroup=SwipeCardButtonGroup;
}

export default SwipeCard