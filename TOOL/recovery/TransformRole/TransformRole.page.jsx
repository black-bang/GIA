import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import List from "publicComponent/List/List.jsx"
import Button from "publicComponent/BeatComponent/Button/Button.jsx"
import BaseSelect from "publicComponent/Form/BaseSelect/BaseSelect.jsx"
//import SelectDepartment from "AppComponent/SelectDepartment/SelectDepartment.jsx"
import SelectRole from "AppComponent/SelectRole/SelectRole.jsx"
import getWeiChatStore from "getWeiChatStore"
import {inject,observer} from "mobx-react"
import url from "url"

@inject("RootStore")
@observer class TransformRole extends React.Component {
	render(){
		return (
		<Page>
			<TopBar>
				<TopBar.Middle>{"角色重置"}</TopBar.Middle>
				<TopBar.Right>
					<Button active={this.canSubmit} onClick={this.handleSubmit}>{"提交"}</Button>
				</TopBar.Right>
			</TopBar>
			<List>
				<List.Vertical>
					<div>{"选择职位"}</div>
					<SelectRole relation={this.store.relationRole} placeholder="请选择职位" onSelect={this.handleSelect.bind(this)}/>
				</List.Vertical>
			</List>
		</Page>
	)}
	constructor(props){
	  	super(props);
		this.store=getWeiChatStore(this).TransformRole;
		this.query=url.parse(this.props.location.search,true)["query"];
	}
	componentDidMount(){
		this.store.selectRoleId({Id:this.query["RoleListId"],Name:this.query["RoleName"]})
	}
	get canSubmit(){
		if(!this.query["EmployeeId"]){return false}
		if(!this.store.relationRole["Id"]){return false}
		return true
	}
	handleSelect=(roleOBJ)=>{
		this.store.selectRoleId(roleOBJ)
	};
	handleSubmit=async ()=>{
		try{
			await this.store.submit(this.query["EmployeeId"])
			this.props.history.replace("/WeiChat/EmployeeManage")
		}catch(error){
			return false
		}
	};
}

export default TransformRole