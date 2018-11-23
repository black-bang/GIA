import PropTypes from "prop-types"

const ridioGroupDecorate=function(Component){
	return class RidioGroup extends React.Component {
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
		getChildContextType(){
			return {
				switchItem:this.state.switchItem,
				switchAction:(item)=>{
					this.setState({switchItem:item})
					if(this.props.onSwitch){
						this.props.onSwitch({switchItem:item})
					}
				}
			}
		}
		static propsTypes={
			relation:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
		};
		static childContextTypes={
			switchItem:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
			switchAction:PropTypes.func
		}
	}
}

export default ridioGroupDecorate