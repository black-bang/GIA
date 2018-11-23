import "./SwitchItem.Prototype.scss"
import PropTypes from "prop-types"

class SwitchItemPrototype extends React.Component {
	render(){
		const SwitchItem=classnames({
			[this.className]:true,
			[this.activeClassName]:this.state.active
		},this.className)
		return (
		<div ref="item" className={SwitchItem} onClick={this.handleClick.bind(this)}>
			{this.props.children}
		</div>			
	)}
	constructor(props){
	  	super(props);
	  	this.className="SwitchItem-default";
	  	this.activeClassName="SwitchItem-active-default";
	  	this.state={active:false};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState,nextContext){
		const {switchTarget}=nextContext
		if(switchTarget==nextProps.keyname){
			nextState.active=true
		}else{
			nextState.active=false
		}
	}
	handleClick(){
		this.context.onChangeSwitchTarget(this.props.keyname)
	}
}


SwitchItemPrototype.contextTypes={
	switchTarget:PropTypes.any,
	onChangeSwitchTarget:PropTypes.func,
	//onSelectScrollTo:PropTypes.func	
}

SwitchItemPrototype.propTypes={
	keyname:PropTypes.any.isRequired,
}

export default SwitchItemPrototype