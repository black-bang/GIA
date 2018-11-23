import style from "./FlowInput.scss"

class FlowInput extends React.Component {
	render(){
		return (
		<div className={classnames(style["FlowInput-shell"],this.props.className)}>
			<input 
				type="text"
				value={this.state.value}
				ref="inputElement"
				className={style["InputElement"]}
				onKeyDown={this.handleEnter}
				onFocus={this.handleFocus}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				placeholder={this.props.placeholder}
			/>
			<div className={style["ComputedSize"]}>
				{this.state.value||this.props.placeholder}
			</div>
		</div>	
	)}
	constructor(props){
	  	super(props);
	  	this.state={value:"",status:"ONBLUR"};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		if(nextProps.relation==null){return false}
		if(nextProps.relation==undefined){return false}
		if(nextState.status!=="ONBLUR"){return false}
		nextState.value=nextProps.relation
	}
	handleEnter=(e)=>{
		const value=e.target.value
		if(e.keyCode==13){
			this.setState({status:"ONBLUR"})
			this.refs["inputElement"].blur()
			this.props.onEnter({keyname:this.props.keyname,keyvalue:value})
		}
	};
	handleFocus=(e)=>{
		let value=e.target.value
		this.setState({status:"ONFOCUS"})
		this.props.onFocus({keyname:this.props.keyname,keyvalue:value})		
	};
	handleChange=(e)=>{
		let value=e.target.value
		if(value.length>this.props.maxLength){return false}
		this.setState({value:value,status:"ONCHANGE"})
		this.props.onChange({keyname:this.props.keyname,keyvalue:value})
	};
	handleBlur=(e)=>{
		let value=e.target.value
		this.setState({status:"ONBLUR"})
		this.props.onBlur({keyname:this.props.keyname,keyvalue:value})
	};
	static propTypes={
		onChange:PropTypes.func,
		maxLength:PropTypes.number,
		keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
		relation:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
		placeholder:PropTypes.string,
	};
	static defaultProps={
		onFocus:()=>{},
		onChange:()=>{},
		onBlur:()=>{},
		onEnter:()=>{},
		maxLength:20,
		placeholder:"未填写"
	};
}
export default FlowInput