import PropTypes from "prop-types"

class SwitchItem extends React.Component {
	render(){
		const SwitchItem=classnames({
			SwitchItem:true,
			SwitchItemActive:this.context.switched===this.props.keyname
		},this.props.className)
		return (
		<div className={SwitchItem} onClick={this.handleClick.bind(this)}>
			{this.props.children}
		</div>
	)}
	handleClick(){
		this.context.onSwitch(this.props.keyname)
	}
}

SwitchItem.contextTypes={
	switched:PropTypes.string,
	onSwitch:PropTypes.func,
}

SwitchItem.componentName="SwitchItem"
export default SwitchItem