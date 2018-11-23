import style from "./SwipeCard.Content.scss"


export default class SwipeCardContent extends React.PureComponent {
	render(){
		return (
		<div className={classnames(style["SwipeCard-Content"],this.props.className)}>
			{this.props.children}
		</div>
	)}
	static ComponentName="SwipeCardContent"
}
