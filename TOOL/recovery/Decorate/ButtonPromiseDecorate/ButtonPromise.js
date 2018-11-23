import PropTypes from "prop-types"


export default function buttonPromise(Component){
	return class ButtonPromise extends React.Component {
		render(){
			return (
			<Component {...this.props} handleClick={this.handleClick.bind(this)}/>	
		)}
		constructor(props){
		  	super(props);
		  	this.state={STATE:"COMPLATE"};
		}
		componentDidMount(){
		  	this.forceUpdate()
		}
		async handleClick(){
			if(!this.props.active){
				return false
			}	
			this.setState({STATE:"PEDDING"})
			await this.props.active()
			this.setState({STATE:"COMPLATE"})
		}
		static propTypes={
			active:PropTypes.bool.isRequired,
		}
	}
}