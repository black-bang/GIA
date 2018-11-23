import "./SwipeCardButtonGroup.scss"
import SwipeCardButtonGroupItem from "../SwipeCardButtonGroupItem/SwipeCardButtonGroupItem.jsx"

class SwipeCardButtonGroup extends React.Component {
	render(){
		return (
		<div className="SwipeCardButtonGroup">
			{this.props.children}
		</div>
	)}
	static ComponentName="SwipeCardButtonGroup";
	static Item=SwipeCardButtonGroupItem
}
export default SwipeCardButtonGroup