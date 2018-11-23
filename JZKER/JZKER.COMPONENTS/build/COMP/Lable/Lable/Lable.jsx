import style from "./Lable.scss"
import {Icon as AntdIcon} from "antd-mobile"

class Lable extends React.PureComponent {
	render(){
		return (
		<div className={this.LableClass} style={Object.assign({},this.ComputedStyle,this.props.style)} onClick={this.handleClick}>
			<div className={style["AppComponent-Lable-tip"]}>
				{this.props.tip}
			</div>
			<span className={style["text"]}>{this.props.text}</span>
			{this.CloseComponent}
		</div>	
	)}
	constructor(props){
	  	super(props);
	  	this.state={editStatus:false};
	}
	get LableClass(){
		return classnames([
			style["AppComponent-Lable"],
			this.props.className
		])
		//,{"AppComponent-Lable-edit":this.state.editStatus}
	}
	get ComputedStyle(){
		if(this.props.active){
			return this.props.theme.active
		}else{
			return this.props.theme.disable
		}
	}
	get CloseComponent(){
		// if(!this.props.canEdit){return null}
		// if(this.state.editStatus){
		// 	return (
		// 	<AntdIcon 
		// 		size="xxs"
		// 		type="cross-circle-o" 			
		// 		className={style["AppComponent-Lable-close"]}
		// 		style={this.ComputedStyle}
		// 		onClick={this.handleRemove}
		// 	/>)
		// }else{
		// 	return null
		// }
		if(this.props.canEdit){
			return (
			<AntdIcon 
				size="xxs"
				type="cross-circle-o" 			
				className={style["AppComponent-Lable-close"]}
				style={this.ComputedStyle}
				onClick={this.handleRemove}
			/>
		)}else{
			return null
		}
	}
	handleClick=()=>{
		this.props.onClick(this.props)
		if(!this.props.canEdit){return false}
		this.setState({editStatus:!this.state.editStatus})
	};
	handleRemove=()=>{
		this.props.onRemove(this.props)
	};
	static propTypes={
		canEdit:PropTypes.bool,
		active:PropTypes.bool,
		onRemove:PropTypes.func,
		onClick:PropTypes.func,
		text:PropTypes.string,
		tip:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
		keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	};
	static defaultProps={
		canEdit:false,
		active:true,
		onRemove:(lableProps)=>{console.log(lableProps)},
		onClick:()=>{},
		theme:{
			active:{background:"#f6b37e",color:"#ffffff",borderRadius:"5px"},
			disable:{background:"#B3B3B3",color:"#ffffff",borderRadius:"5px"}
		}
	};	
	static style={
		//主题生成函数
		full:(color,radius)=>{
			const defaultColor=color||"#f6b37e";
			const defaultradius=radius||5;
			//实心主题
			return {
				active:{
					color:"#ffffff",
					background:defaultColor,
					borderRadius:defaultradius+"px"				
				},
				disable:{
					color:"#ffffff",
					background:"#B3B3B3",
					borderRadius:defaultradius+"px"					
				}				
			}
		},
		ghost:(color,radius)=>{
			const defaultColor=color||"#f6b37e";
			const defaultradius=radius||5;
			//空心主题
			return {
				active:{
					color:defaultColor,
					border:`${defaultColor} 1px solid`,
					borderRadius:defaultradius+"px",				
				},
				disable:{
					color:"#B3B3B3",
					border:"#B3B3B3 1px solid",
					borderRadius:defaultradius+"px",				
				},				
			}
		},
	};
	
}



export default Lable