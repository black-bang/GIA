import PropTypes from "prop-types"

export default function RidioGroupItemDecorate(Component){
	return class RidioGroupItem extends React.Component {
		render(){
			return (
			<Components {...this.props} onSelected={this.handleClick.bind(this)}/>
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
		static propTypes={
			keyname:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
		};
		static contextTypes={
			switchItem:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
			switchAction:PropTypes.func			
		};
	}
}