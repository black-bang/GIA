import "./TabSwitch.Prototype.scss"
import PropTypes from "prop-types"


class TabSwitchPrototype extends React.Component {
	render(){
		const TabSwitch=classnames({
			"TabSwitch":true
		},this.className)
		return (
		<div ref="outer" className={TabSwitch}>
			<div ref="inner" className="TabSwitch-inner">
				{this.props.children}
			</div>
		</div>		
	)}
	constructor(props){
	  	super(props);
	  	this.className="";
	  	this.state={switchTarget:""};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		if((nextProps.relation!==undefined)&&(nextProps.relation!==null)){
			nextState.switchTarget=nextProps.relation
		}
	}
	getChildContext(){
		return {
			switchTarget:this.state.switchTarget,
			onChangeSwitchTarget:(Target)=>{
				this.setState({switchTarget:Target})
				if(this.props.onSwitch){
					this.props.onSwitch({keyname:Target})
				}
			},
/*			onSelectScrollTo:(offsetLeft)=>{
				const {inner}=this.refs
				inner.style.marginLeft=offsetLeft+"px"
			}*/
		}
	}
}


TabSwitchPrototype.childContextTypes={
	switchTarget:PropTypes.any,
	onChangeSwitchTarget:PropTypes.func,
	//onSelectScrollTo:PropTypes.func
}

TabSwitchPrototype.propTypes={
	relation:PropTypes.any,
	onSwitch:PropTypes.func,
}

export default TabSwitchPrototype