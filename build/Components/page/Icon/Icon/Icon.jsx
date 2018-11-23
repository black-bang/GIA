import {format} from "d3-format"
import style from "./Icon.scss"


export default class Icon extends React.PureComponent {
	render(){
		return (
		<div className={style["Icon-Wrap"]} style={this.IconShellTStyle}>
			<div style={this.InnerWrapStyle} className={classnames(style["Icon-Inner-Wrap"],this.props.className)} onClick={this.props.onClick}>
				<div 
					style={this.IconBodyStyle} 
					className={classnames(style["WeiChatIcon"],this.props.icon)} 
					ref={this.IconBody}
				/>		
			</div>	
			<div className={style["Icon-children"]}>
				{this.props.children}
			</div>			
		</div>	
	)}
	constructor(props){
	  	super(props);
	  	this.IconBody=React.createRef()
	  	this.state={IconBodyWidth:this.props.size};
	}
	componentDidMount(){
	  	this.setState({IconBodyWidth:this.IconBody.current.offsetWidth});
	}
	get IconShellTStyle(){
		const {size,path}=this.props;
		if(!this.props.children){
			return Object.assign({width:size+"px",height:size+"px"},this.props.style)
		}else{
			return {}
		}
	}
	get InnerWrapStyle(){
		const {size,path}=this.props
		const style={width:size+"px",height:size+"px"}
		const ImageFromServer={}
		if(path){ImageFromServer["backgroundImage"]=`url(${path})`}
		//最终样式计算公式
		return Object.assign(style,this.props.style,ImageFromServer)
	}
	get IconBodyStyle(){
		const {size}=this.props;
		const {IconBodyWidth}=this.state
		//计算放大倍率
		let originPower=format(".2f")(size/IconBodyWidth)
		//转换倍率为百分比
		const formatTranslate=format(".0%")(originPower)
		return {
			left:formatTranslate,top:formatTranslate,
			transform:`scale(${originPower})translate(-${formatTranslate},-${formatTranslate})`
		}
	}
	static propsTypes={
		path:PropTypes.string,
		icon:PropTypes.string,//本地图标
		size:PropTypes.number,
		onClick:PropTypes.func,
	};
	static defaultProps={
		size:40,
		onClick:()=>{}
	};
}