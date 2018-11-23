import "./SelectRole.scss"
import {withRouter,Route,NavLink} from "react-router-dom"
import RoleListPage from "./RoleListPage/RoleListPage.jsx"
import SelectRoleState from "./SelectRole.mobx.js" 
import {observer,Provider} from "mobx-react"

//后台的数据结构
//{Id:87,Level:3,Name:"总监",Path:"85_85_86_87",ChildRole:[....]}

@withRouter
@observer class SelectRole extends React.Component {
	render(){
		const SelectRoleClass=classnames({
			"SelectRole":true
		},this.props.className)
		return (
		<div className="SelectRole-Container">
			<NavLink className={SelectRoleClass} to={this.toRoleList}>
				{this.mobxStore.RoleName||this.props.placeholder}
			</NavLink>
			<Provider mobxStore={this.mobxStore}>
				<Route path="*/SelectRole" component={RoleListPage}/>
			</Provider>				
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.mobxStore=new SelectRoleState()
	  	this.toRoleList={
	  		pathname:this.props.location.pathname.replace(/$\//ig,"")+"/SelectRole"
	  	}
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		if(nextProps.relation==undefined){return false}
		if(nextProps.relation==null){return false}
		this.mobxStore.switchRole(nextProps.relation)
	}
	getChildContext=()=>({
		onSelect:this.props.onSelect,
	});
	static childContextTypes={
		onSelect:PropTypes.func,	
	};
	static propTypes={
		onSelect:PropTypes.func,
		placeholder:PropTypes.string,
		defaultRole:PropTypes.string,
	  	relation:PropTypes.shape({
	  		//关联的数据应该为该职位的唯一Id,和该职位的名称
	  		Id:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	  		Name:PropTypes.string
	  	}),
	};
	static defaultProps={
		onSelect:(selectOBJ)=>{console.log(selectOBJ);},	
	};	
}


//export default SelectRole