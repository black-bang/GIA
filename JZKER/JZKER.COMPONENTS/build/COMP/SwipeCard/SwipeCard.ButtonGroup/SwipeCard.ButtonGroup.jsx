import style from "./SwipeCard.ButtonGroup.scss"
import SwipeCardButtonGroupItem from "./SwipeCard.ButtonGroup.Item/SwipeCard.ButtonGroup.Item.jsx"

export default class SwipeCardButtonGroup extends React.PureComponent {
	render(){
		return (
		<div className={style["SwipeCard-ButtonGroup"]}>
			{this.props.children}
		</div>		
	)}
	static Item=SwipeCardButtonGroupItem;
	static ComponentName="SwipeCardButtonGroup";
}
