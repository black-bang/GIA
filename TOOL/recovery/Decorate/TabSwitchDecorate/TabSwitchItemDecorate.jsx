import PropTypes from "prop-types"

const tabSwitchItemDecorate=function(Component){
	class SwitchItemDecorate extends React.Component {
		render(){
			return (
			<Component active={this.state.active} {...this.props} onSelected={this.handleClick.bind(this)}/>	
		)}
		constructor(props){
		  	super(props);
		  	this.state={active:false};
		}
		componentDidMount(){
		  	this.forceUpdate()
		}
		componentWillUpdate(nextProps,nextState,nextContext){
			if(nextContext.switchItem==nextProps.keyname){
				nextState.active=true
			}else{
				nextState.active=false
			}
		}
		handleClick(){
			this.context.switchAction(this.props.keyname)
		}
	}
	SwitchItemDecorate.contextTypes={
		switchItem:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
		switchAction:PropTypes.func		
	}
	SwitchItemDecorate.propTypes={
		keyname:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
	}
	return SwitchItemDecorate
}

export default tabSwitchItemDecorate