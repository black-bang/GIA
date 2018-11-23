import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"

@withRouter
class LinkToPageChild extends React.Component {
	render(){
		return (
		<div ref="SelectCustomer" onClick={this.handleJump.bind(this)}>
			{this.props.children}	
		</div>
	)}
	handleJump(e){
		const toSelectCustomerList=Object.assign({},this.props.location,{
			pathname:this.props.location.pathname.replace("/SelectCustomer","")+this.props.path.replace(/\/$/ig,"")
		})	
		this.props.history.push(toSelectCustomerList)	
	}
}

LinkToPageChild.propTypes={
	path:PropTypes.string
}

export default LinkToPageChild