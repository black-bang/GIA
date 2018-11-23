import style from "./Photo.scss"

export default class Photo extends React.PureComponent {
	render(){
		return (
		<div className={classnames(style["Photo"],this.props.className)} style={this.PhotoStyle} onClick={this.props.zoom?this.lookPic:null}>
			{this.TipsComponent}					
		</div>			
	)}
	get PhotoStyle(){
		const {src,size,shape,style,borderColor,borderWidth}=this.props;
		const BaseStyle=Object.assign({
			backgroundImage:`url(${src})`
		},{
			width:size+"px",
			height:size+"px",
			border:`${borderColor} ${borderWidth} solid`
		},style)
		if(shape=="fang"){
			return BaseStyle
		}
		if(shape=="yuan"){
			return Object.assign(BaseStyle,{
				borderRadius:size+"px"
			})
		}
	}
	get TipsComponent(){
		if(this.props.tip){
			return (
			<div className={style["Photo-tip"]}>
				{this.props.tip}
			</div>
		)}else{
			return null
		}
	}
	lookPic=()=>{
		if(window.WeixinJSBridge){
			WeixinJSBridge.invoke('imagePreview',{
			    "current":this.props.src,
			    "urls":[this.props.src]
			});
		}	
	};
	static defaultProps={
	  	size:50,
	  	zoom:false,
	  	shape:"yuan",
	  	borderColor:"#ffffff",
	  	borderWidth:"3px",
	};
	static propTypes={
		tip:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
		src:PropTypes.string,
		size:PropTypes.number,
		zoom:PropTypes.bool,
		shape:PropTypes.oneOf(["yuan","fang"])
	}
}
