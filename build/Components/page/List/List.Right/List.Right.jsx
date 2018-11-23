import css from "./List.Right.scss"
import ListPublicCss from "../List/List.scss"
import {Icon as AntdIcon} from "antd-mobile"
import Icon from "../../Icon/index.js"

export default class ListLeft extends React.PureComponent {
	render(){
		const OuterWarp=(this.props.to?NavLink:"div")
		return (
		<OuterWarp to={this.props.to} className={classnames(css.Right,this.props.className)}>
			{this.Icon}
			<div className={css.Content}>
				{this.props.children}
			</div>
			{this.Arrow}
			<div className={ListPublicCss.Line}/>
		</OuterWarp>
	)}
	get Icon(){
		if(this.props.icon){
			return <Icon icon={this.props.icon} size={30} style={{marginRight:"10px"}}/>
		}else{
			return null
		}
	}
	get Arrow(){
		if(this.props.to||this.props.arrow){
			return <AntdIcon type="right" size="md" color="#B3B3B3"/>
		}else{
			return null
		}
	}
	static defaultProps={
	  	arrow:false
	};
	static propTypes={
	  	arrow:PropTypes.bool,
	  	icon:PropTypes.string,
	  	to:PropTypes.oneOfType([PropTypes.string,PropTypes.object])
	}
}