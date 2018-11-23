
export default class SwipeCardContent extends React.PureComponent {
	render(){
		const ContentStyle=classnames({
			"SwipeCard-Content":true,
		},this.props.className)
		return (
		<div className={ContentStyle}>
			{this.props.children}
		</div>
	)}
	static ComponentName="SwipeCardContent"
}
