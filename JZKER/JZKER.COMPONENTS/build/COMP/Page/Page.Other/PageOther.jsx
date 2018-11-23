import style from "./PageOther.scss"

class PageTop extends React.PureComponent {
	render(){
		return (
		<div className={classnames(style["Page_top_comp"],this.props.className)} style={this.props.style}>
			{this.props.children}
		</div>
	)}
	static componentName="PageTop"
}
export {PageTop}


const PageTopSplit=(props)=>{
	return (
	<div className={style["PageTopSplit"]}></div>
)}
PageTopSplit.componentName="PageTopSplit"
export {PageTopSplit}


class PageBottom extends React.PureComponent {
	render(){
		return (
		<div className={classnames(style["Page_bottom_comp"],this.props.className)} style={this.props.style}>
			{this.props.children}
		</div>
	)}
	static componentName="PageBottom"
}

export {PageBottom}
