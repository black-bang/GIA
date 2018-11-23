import style from "./TabSwitch.scss"
import TabSwitchItem from "../TabSwitchItem/TabSwitchItem.jsx"
import TabSwitchButtonItem from "../TabSwitchButtonItem/TabSwitchButtonItem.jsx"
import TabSwitchLinkItem from "../TabSwitchLinkItem/TabSwitchLinkItem.jsx"

class TabSwitch extends React.Component {
	render(){
		const TabSwitchClass=classnames(style["TabSwitch-BeatTest"],this.props.className)
		return (
		<div className={TabSwitchClass} style={this.props.style}>
			<div className={style["TabSwitch-BeatTest-inner"]}>
				{this.props.children}
			</div>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={keyname:""};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		if(nextProps.relation==undefined){return false}
		if(nextProps.relation==null){return false}
		nextState.keyname=nextProps.relation
	}
	getChildContext=()=>({
		TabSwitch:{
			keyname:this.state.keyname,
			switchAction:(switchItem)=>{
				this.setState({keyname:switchItem})
				this.props.onChange({keyname:switchItem})
			},			
		}
	});
	static childContextTypes={
		TabSwitch:PropTypes.object,
	};
	static propTypes={
		onChange:PropTypes.func,
	  	relation:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	};
	static defaultProps={
		onChange:(switchOBJ)=>{}
	};
	static Item=TabSwitchItem;
	static LinkItem=TabSwitchLinkItem;
	static ButtonItem=TabSwitchButtonItem;
}

export default TabSwitch