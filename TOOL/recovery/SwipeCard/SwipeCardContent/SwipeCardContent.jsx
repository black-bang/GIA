import "./SwipeCardContent.scss"

class SwipeCardContent extends React.Component {
	render(){
		const ContentStyle=classnames({
			"SwipeCardContent":true,
		},this.props.className)
		return (
		<div className={ContentStyle}>
			{this.props.children}
		</div>
	)}
	static ComponentName="SwipeCardContent";
}
export default SwipeCardContent