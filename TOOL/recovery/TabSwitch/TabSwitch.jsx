import "./TabSwitch.scss"
import PropTypes from "prop-types"
import SwitchItem from "./SwitchItem.jsx"
import SwitchButton from "./SwitchButton.jsx"

class TabSwitch extends React.Component {
	render(){
		const TabSwitch=classnames({
			"TabSwitch-old":true,
		},this.props.className)
		return (
		<div className={TabSwitch} style={this.props.style}>
			{React.Children.map(this.props.children,(child,index)=>{
				const unitWidth=100/React.Children.count(this.props.children)+"%";
				switch(child.type.componentName){
					case "SwitchItem":
						return (
						<div style={{width:unitWidth,height:"100%"}}>
							{[child]}
						</div>)	
					break;
					case "SwitchButton":
						return (
						<div style={{width:unitWidth,height:"100%"}}>
							{[child]}
						</div>)	
					break;
					default:
						return null
				}
			})}
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={switched:""};
	}
	getChildContext(){
		return {
			switched:this.state.switched,
			onSwitch:(option)=>{
				this.setState({switched:option})
				if(this.props.onSwitch){
					this.props.onSwitch({keyname:option})
				}
			}	
		}
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
	  	if(!nextProps.relation){
			return false
	  	}
	  	if(nextProps.relation!==nextState.switched){
	  		nextState.switched=nextProps.relation
	  	}	
	}
}

TabSwitch.childContextTypes={
	switched:PropTypes.string,
	onSwitch:PropTypes.func,
}

TabSwitch.Item=SwitchItem;
TabSwitch.Button=SwitchButton;

export default TabSwitch