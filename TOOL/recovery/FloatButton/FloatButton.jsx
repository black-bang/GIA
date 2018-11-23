import "./FloatButton.scss"
import PathName from "PathName"
import FloatButtonItem from "./FloatButtonItem.jsx"

class FloatButton extends React.Component {
	render(){
		const meun=classnames({
			"FloatButton-meun":true,
			"FloatButton-meun-hidden":!this.state.display
		})
		return (
		<div ref="FloatButton" className="FloatButton-button" onClick={this.handleShow}>
			<i className="fa fa-plus fa-1x"></i>
			<div className={meun}>
				<FloatButtonItem text="会员记录" to={PathName.CustomerList}/>
				<FloatButtonItem text="游客记录" to={PathName.AddInShopRecord}/>
			</div>
		</div>	
	)}
	constructor(props){
	  	super(props);
	  	this.touchStartPoint=0;
	  	this.state={display:false};
	}
	componentDidMount(){
		const {FloatButton}=this.refs
		FloatButton.className=classnames({
			"FloatButton-button":true,
			"FloatButton-button-show":true,
		})	
		document.addEventListener("click",this.handleHide,true)
		document.addEventListener("touchstart",this.touchStart)
	  	document.addEventListener("touchmove",this.touchMove,true)
		document.addEventListener("touchend",this.touchEnd,true)
	}
	componentWillUnmount(){
		document.removeEventListener("click",this.handleHide,true)
		document.removeEventListener("touchstart",this.touchStart)
		document.removeEventListener("touchmove",this.touchMove,true)
		document.removeEventListener("touchend",this.touchEnd,true)
	}	
	handleShow=(e)=>{
		this.setState({display:!this.state.display})
	};
	handleHide=(e)=>{
  		const {FloatButton}=this.refs
  		if(e.target==FloatButton){
  		 	return false
  		}
  		for(let key in FloatButton.childNodes){
  			if(e.target==FloatButton.childNodes[key]){
  				return false
  				break;
  			}
  		}
  		this.setState({display:false})
	};
	showHideButton=(e)=>{
		const {FloatButton}=this.refs
  		let movePoint=e.touches[0].pageY;
		if(movePoint-this.touchStartPoint>=0){
			FloatButton.className=classnames({
				"FloatButton-button":true,
				"FloatButton-button-show":true,
			})
		}
		if(movePoint-this.touchStartPoint<0){
			FloatButton.className=classnames({
				"FloatButton-button":true,
				"FloatButton-button-show":false,
			})
		}
	};
	touchStart=(e)=>{
		this.touchStartPoint=e.touches[0].pageY;
	};
  	touchMove=(e)=>{
  		//上滑显示,下滑隐藏
		this.showHideButton(e)
		this.setState({display:false})
  	};	
  	touchEnd=(e)=>{
		this.touchStartPoint=0;
  	};
}


export default FloatButton