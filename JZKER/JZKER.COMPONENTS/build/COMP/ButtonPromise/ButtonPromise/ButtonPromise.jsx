import style from "./ButtonPromise.scss"
import {NavLink} from "react-router-dom"
import {Icon as AntdIcon} from "antd-mobile"

class ButtonPromise extends React.PureComponent {
	render(){
		if(this.props.to){
			return (
			<NavLink to={this.props.to} className={this.ButtonPromiseClass} style={Object.assign({},this.ComputedStyle,this.props.style)}>
				{this.props.children}
			</NavLink>
		)}else{
			return (
			<div className={this.ButtonPromiseClass} style={Object.assign({},this.ComputedStyle,this.props.style)} onClick={this.handleClick}>
				{this.StatusTipComponent}
			</div>
		)}
	}
	constructor(props){
	  	super(props);
	  	this.state={status:"COMPLATE"};
	  	this._isMount=true
	}
	componentWillUnmount(){
		this._isMount=false
	}
	get ButtonPromiseClass(){
		return classnames([style["ButtonPromise"],this.props.className])
	}
	get ComputedStyle(){
		if(this.props.active){
			return this.props.theme.active
		}else{
			return this.props.theme.disable
		}
	}
	get StatusTipComponent(){
		//等待提醒
		if(this.state.status=="PEDDING"){
			return (
			<AntdIcon type="loading" size="xxs" color="#ffffff"/>
		)}else{
			return this.props.children
		}
	}
	handleClick=async ()=>{
		if(!this.props.active){return false}
		if(this.state.status=="PEDDING"){return false}
		try{
			this.setState({status:"PEDDING"})
			await this.props.onClick()
			if(this._isMount){
				this.setState({status:"COMPLATE"})
			}
		}catch(error){
			if(this._isMount){
				this.setState({status:"COMPLATE"})
			}
			throw error
		}
	};
	static propTypes={
		active:PropTypes.bool,
	  	onClick:PropTypes.func,
	  	theme:PropTypes.object,
	};
	static style={
		full:(color="",radius)=>({
			active:{},
			disable:{},		
		}),
		ghost:(color="",radius)=>({
			active:{},
			disable:{},		
		}),
		typeSave:()=>({
			//保存按钮的预设
			//不激活的时候文字为灰色,激活的时候背景为绿色
			active:{background:"none",color:"#04be13",borderRadius:"5px"},
			disable:{background:"none",color:"#808080"},
		})
	};
	static defaultProps={
		active:true,
		onClick:async ()=>{},
		theme:{
			active:{background:"#04be13",color:"#ffffff",borderRadius:"5px"},
			disable:{background:"#B3B3B3",color:"#ffffff",borderRadius:"5px"},
		},
	};	
}

export default ButtonPromise 


{
  /*
	<ButtonPromise active={<bool>} onClick={async ()=>{}} theme={ButtomPromise.style.ghost()}>

	</ButtonPromise>
*/
}