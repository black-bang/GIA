import "./SwipeCard.ButtonGroup.Item.scss"

export default class SwipeCardButtonGroupItem extends React.PureComponent {
	render(){
		return (
		<div className="SwipeCard-ButtonGroup-Item" style={this.ComputedStyle} onClick={this.handleClick}>
			{this.props.children}
		</div>			
	)}
	get ComputedStyle(){
		return Object.assign({},this.props.style)
	}
	handleClick=async ()=>{
		try{
			await this.props.onClick()
		}catch(error){
			throw error
		}
	}
}