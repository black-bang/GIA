import PropTypes from "prop-types"

const tabSwitchDecorate=function(Component){
	class TabSwitchDecorate extends React.Component {
		render(){
			return (
			<Component {...this.props} switchItem={this.state.switchItem}/>
		)}
		constructor(props){
		  	super(props);
		  	this.state={switchItem:""};
		}
		componentDidMount(){
		  	this.forceUpdate()
		}
		componentWillUpdate(nextProps,nextState){
			if((nextProps.relation!==undefined)&&(nextProps.relation!==null)){
				nextState.switchItem=nextProps.relation
			}
		}
		getChildContext(){
			return {
				switchItem:this.state.switchItem,
				switchAction:(switchItem)=>{
					this.setState({switchItem:switchItem})
					if(this.props.onSwitch){
						this.props.onSwitch({switchItem:switchItem})
					}
				}
			}
		}		
	}
	TabSwitchDecorate.childContextTypes={
		switchItem:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
		switchAction:PropTypes.func
	}
	TabSwitchDecorate.propTypes={
		relation:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
		onSwitch:PropTypes.func
	}
	return TabSwitchDecorate
}

export default tabSwitchDecorate