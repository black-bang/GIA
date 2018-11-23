import style from "./OnOffSwitch.scss"

class OnOffSwitch extends React.Component {
	render(){
		const switchClass=classnames({
			[style["OnOffSwitch"]]:true,
			[style["OnOffSwitch-on"]]:this.state.status,
			[style["OnOffSwitch-off"]]:!this.state.status
		})
		const switchPointClass=classnames({
			[style["switchPoint"]]:true,
			[style["switchPoint-on"]]:this.state.status,
			[style["switchPoint-off"]]:!this.state.status,
		})
		return (
		<div className={switchClass}>
			<div className={switchPointClass} onClick={this.handleClick}></div>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={status:false};
	}
	componentDidMount(){
		this.forceUpdate()		
	}
	componentWillUpdate(nextProps,nextState){
		if(nextProps.relation==undefined){return false}
		if(nextProps.relation==null){return false}
		nextState.status=nextProps.relation
	}
	handleClick=()=>{
		const status=!this.state.status
		this.setState({status:status})
		this.props.onChange({keyname:this.props.keyname,keyvalue:status})
	};
	static propTypes={
	  	relation:PropTypes.bool,
	  	onChange:PropTypes.func,		
		keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	};
	static defaultProps={
		onChange:(statusOBJ)=>{console.log(statusOBJ)}
	};
}

export default OnOffSwitch