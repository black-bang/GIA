import "./ChatInput.scss"

class ChatInput extends React.Component {
	render(){
		const ChatInput=classnames({
			"ChatInput":true,
		},this.props.className)
		return (
		<div ref={this.setShellRef/*"ChatInputShell"*/} className={ChatInput}>
			<textarea 
				type="text"
				ref={this.setInputFefs/*"HtmlInput"*/}
				style={{imeMode:"active"}}
				rows={1}
				className="ChatInput-textAreaElement" 
				onKeyDown={this.handleKeyDown}
				onChange={this.handleChange}
				value={this.state.value}
				placeholder={this.props.placeholder}
			/>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.inputRef=null;
	  	this.inputShellRef=null;
	  	this.state={value:""};
	}
	componentDidMount(){
	  	this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		if(nextProps.relation==undefined){return false}
		if(nextProps.relation==null){return false}
		nextState.value=nextProps.relation
	}
	componentDidUpdate(prevProps,prevState){
		if(prevState.value==""){
			this.inputShellRef.removeAttribute("style")
			this.inputRef.removeAttribute("style")	
		}else{
			this.inputShellRef.style.height=this.inputRef.scrollHeight+"px"
			this.inputRef.style.height=this.inputRef.scrollHeight+"px"			
		}			
	}
	setShellRef=(element)=>{
		//获取外壳节点
		this.inputShellRef=element;
		this.props.inputShellRef(element)
	};
	setInputFefs=(element)=>{
		//获取输入框节点
		this.inputRef=element;
		this.props.inputRef(element)
	};
	handleKeyDown=(e)=>{
		//const {HtmlInput}=this.refs
		const value=this.inputRef.innerHTML;
		if(e.keyCode==13){
			e.preventDefault()
			this.props.onEnter(value)
			this.inputRef.innerHTML=""
		};
	};
	handleChange=(e)=>{
		const value=e.target.value
		this.setState({value:value})
		this.props.onChange({
			keyname:this.props.keyname,
			keyvalue:value
		})
	};
	static defaultProps={
		onChange:()=>{},
		onEnter:()=>{},
		inputRef:()=>{},
		inputShellRef:()=>{},
	}	
}

export default ChatInput