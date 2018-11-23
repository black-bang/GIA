import style from "./TabSwitchItem.scss"

class TabSwitchItem extends React.Component {
	render(){
		const TabSwitchItemClass=classnames({
			[style["TabSwitchItem-Beat"]]:true,
			[this.props.activeClassName||style["TabSwitchItem-Beat-active"]]:this.state.active,
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
		const {keyname}=this.context.TabSwitch;
		this.props.onClick(this.props)
		if(keyname!==this.props.keyname){
			this.context.TabSwitch.switchAction(this.props.keyname)
		}else{
			return false
		}
	};
	static defaultProps={
	  	onClick:()=>{}
	};
	static propTypes={
		activeClassName:PropTypes.string,
	  	keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	};
	static contextTypes={
		TabSwitch:PropTypes.object
	};
}

export default TabSwitchItem