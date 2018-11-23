import "./SwipeCardButtonGroupItem.scss"

class SwipeCardButtonGroupItem extends React.Component {
	render(){
		return (
		<div className="SwipeCardButtonGroupItem" style={this.props.style} onClick={this.props.onClick}>
			{this.props.children}
		</div>
	)}
	static propTypes={
	  	onClick:PropTypes.func,
	};
	static defaultTypes={
		onClick:()=>{},
	};
}
export default SwipeCardButtonGroupItem