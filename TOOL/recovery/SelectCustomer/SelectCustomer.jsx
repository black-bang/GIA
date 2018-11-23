import "./SelectCustomer.scss"
import SelectCustomerState from "./SelectCustomer.mobx.js"
import {Route,NavLink,withRouter} from "react-router-dom"
import CustomerPage from "./CustomerPage/CustomerPage.jsx"
import {Provider,observer} from "mobx-react"


@withRouter
@observer class SelectCustomer extends React.Component {
	render(){
		const SelectCustomerClass=classnames({
			"SelectCustomer":true
		},this.props.className)
		
		return (
		<div className="SelectCustomer">
			<div>{this.mobxStore.Name||this.props.placeholder}</div>
			<NavLink className={SelectCustomerClass} to={this.toCustomerPage}>
				{"选择"}
			</NavLink>
			<Provider mobxStore={this.mobxStore}>
				<Route path="*/CustomerPage" component={CustomerPage}/>
			</Provider>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={selectedCustomer:{}};
	  	this.mobxStore=new SelectCustomerState();
	  	this.toCustomerPage={
	  		pathname:this.props.location.pathname.replace(/$\//ig,"")+"/CustomerPage"
	  	}
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		if(nextProps.relation==undefined){return false}
		if(nextProps.relation==null){return false}
		this.mobxStore.changeCustomer(nextProps.relation)
	}		
	getChildContext=()=>({
		onChange:this.props.onChange,
	});
	static childContextTypes={
		onChange:PropTypes.func
	};
	static propTypes={
		onChange:PropTypes.func,
		placeholder:PropTypes.string
	};
	static defaultProps={
	  	onChange:()=>{}
	}
}

export default SelectCustomer