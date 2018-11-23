import style from "./TabSwitchButtonItem.scss"

class TabSwitchButtonItem extends React.Component {
	render(){
		const TabSwitchItemClass=classnames({
			[style["TabSwitchButtonItem-Beat"]]:true,
			[style["TabSwitchItem-ButtonItem-active"]]:this.state.active,
		},this.props.className)
		return (
		<div className={TabSwitchItemClass} onClick={this.handleClick}>
			{this.props.children}
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={active:false};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState,nextContext){
		const {keyname}=nextContext.TabSwitch
		if(keyname==nextProps.keyname){
			nextState.active=true
		}else{
			nextState.active=false
		}
	}
	handleClick=()=>{
		this.context.TabSwitch.switchAction(this.props.keyname)
		this.props.onClick()
	};
	static propTypes={
		activeClassName:PropTypes.string,
	  	keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	};
	static defaultProps={
		onClick:()=>{}
	};
	static contextTypes={
		TabSwitch:PropTypes.object
	};
}

export default TabSwitchButtonItem