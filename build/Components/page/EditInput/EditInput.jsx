import css from "./EditInput.module.scss"
import {Icon as AntdIcon} from "antd-mobile"

export default class EditInput extends React.Component {
	get RenderTextTool(){
		//清空按钮
		if(this.state.ShowClear){
			return (
			<div className={css.TextTool} onClick={this.handleClearText}>
				<AntdIcon type="cross"/>
			</div>		
		)}else{
			return null
		}
	}
	get RenderEmptyText(){
		//空白提示
		if(!this.props.EmptyTip){
			return null
		}
		if(this.state.ShowEmptyText){
			return (
			<div className={css.EmptyText}>
				{this.props.EmptyText}
			</div>			
		)}else{
			return null
		}
	}
	render(){
		return (
		<span className={css.EditInput}>
			<span className={css.InputShell}>
				<span className={css.InputElementShell}>
					<input 
						readOnly={this.props.readOnly}
						type={this.props.type} 
						value={this.props.relation}
						className={css.InputElement}
						onKeyDown={this.handleKeyDown}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						placeholder={this.props.placeholder}
					/>
					<span className={css.DisplayText}>
						{this.props.relation||this.props.placeholder}
					</span>
				</span>
				{this.RenderEmptyText}				
			</span>
			{this.RenderTextTool}
		</span>
	)}
	constructor(props){
	  	super(props);
	  	this.isUsed=false;
	  	this.state={ShowEmptyText:false,ShowClear:false};
	}
	componentWillUpdate(nextProps,nextState){	
		//文本框没有内容的时候不要有清除按钮
		if(!nextProps.relation){
			nextState.ShowClear=false
		}
		//用户没有使用过该组件,不进行空值校验
		if(!this.isUsed){return false}
		if(nextProps.relation){
			nextState.ShowEmptyText=false;
		}else{
			nextState.ShowEmptyText=true;
		}
	}
	handleKeyDown=(e)=>{
		if(e.keyCode==8){
			this.setState({ShowClear:true})
		}else{
			this.setState({ShowClear:false})
		}
	};
	handleFocus=(e)=>{
		this.props.onFocus({keyname:this.props.keyname,keyvalue:this.props.relation})
	};
	handleChange=(e)=>{
		this.isUsed=true;//用户开始输入,代表使用过该组件
		let text=e.target.value;
		this.props.onChange({keyname:this.props.keyname,keyvalue:text})
	};
	handleBlur=(e)=>{
		this.props.onBlur({keyname:this.props.keyname,keyvalue:this.props.relation})
	};
	handleClearText=()=>{
		//不要考虑relation,因为在这里relation的值不确定
		this.setState({ShowClear:false})
		this.props.onChange({keyname:this.props.keyname,keyvalue:""})
	};
	static defaultProps={
		type:"text",
		onFocus:()=>{},
		onChange:()=>{},
		onBlur:()=>{},
		EmptyTip:false,//是否提示空值
		relation:"",
		placeholder:"请输入",
		EmptyText:"此处不得为空",
		readOnly:false
		
	};
	static propTypes={	
		keyname:PropTypes.string,
	  	onChange:PropTypes.func,
		EmptyTip:PropTypes.bool,
	  	type:PropTypes.oneOf(["number","text"]),
	  	relation:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	};
}