import "./SelectRole.scss"
import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import DepartmentUnit from "AppComponent/DepartmentUnit/DepartmentUnit.jsx"
import {observer,inject} from "mobx-react"
import {toJS} from "mobx"

@inject("mobxStore")
@observer class RoleListPage extends React.Component {
	render(){
		return (
		<div className="RoleListPage-Container">
			<Page>
				<TopBar>
					<TopBar.Middle>{"角色列表"}</TopBar.Middle>
				</TopBar>
				{this.store.RoleTree.map((ListItem,index)=>{
					return <DepartmentUnit {...ListItem} key={index} onSelect={this.handleSelect}/>
				})}
			</Page>
		</div>
	)}
	constructor(props){
	  	super(props);
		this.store=this.props.mobxStore	
	}
	componentDidMount(){
	  	this.store.getRoleTree()
	}
	handleSelect=(selectOBJ)=>{
		this.store.switchRole(selectOBJ)
		this.context.onSelect(selectOBJ)
		this.props.history.goBack()
	};
	static contextTypes={
		onSelect:PropTypes.func
	}
}

export default RoleListPage