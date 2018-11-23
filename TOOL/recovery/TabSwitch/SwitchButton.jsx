import PropTypes from "prop-types"

class SwitchButton extends React.Component {
	render(){
		const SwitchButton=classnames({
			SwitchButton:true,
			SwitchButtonActive:this.context.switched===this.props.keyname
		},this.props.className)
		return (
		<div className={SwitchButton} onClick={this.handleClick.bind(this)}>
			{this.props.children}
		</div>		
	)}
	handleClick(){
		this.context.onSwitch(this.props.keyname)
	}
}
SwitchButton.componentName="SwitchButton"
SwitchButton.contextTypes={
	switched:PropTypes.string,
	onSwitch:PropTypes.func,
}
export default SwitchButton