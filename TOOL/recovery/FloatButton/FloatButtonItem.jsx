import {NavLink} from "react-router-dom"

class FloatButtomItem extends React.Component {
	render(){
		return (
		<NavLink className="FloatButtonItem" to={this.props.to}>
			<div className="FloatButtonItem-left">
				<i className={this.props.icon}></i>
			</div>
			<div className="FloatButtonItem-right">
				<span>{this.props.text}</span>
			</div>
		</NavLink>
	)}
}
export default FloatButtomItem