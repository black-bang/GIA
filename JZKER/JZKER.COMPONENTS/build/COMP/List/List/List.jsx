import css from "./List.scss"
import ListLeft from "../List.Left/List.Left.jsx"
import ListRight from "../List.Right/List.Right.jsx"
import ListJustify from "../List.Justify/List.Justify.jsx"
import ListVertical from "../List.Vertical/List.Vertical.jsx"

export default class List extends React.PureComponent {
	render(){
		return (
		<div className={classnames(css.List,this.props.className)}>
			{this.Title}
			{this.props.children}
		</div>				
	)}
	get Title(){
		if(this.props.title){
			return (
			<div className={css.Title}>
				<div>{this.props.title}</div>
				<div className={css.TitleLine}></div>
			</div>)
		}else{
			return null
		}
	}
	static propTypes={
		title:PropTypes.string,
	};
	static Left=ListLeft;
	static Right=ListRight;
	static Justify=ListJustify;
	static Vertical=ListVertical;
}