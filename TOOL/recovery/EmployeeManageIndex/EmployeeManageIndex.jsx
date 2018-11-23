import "./EmployeeManageIndex.scss"
import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import Icon from "publicComponent/Icon/Icon.jsx"
import List from "publicComponent/List/List.jsx"
import ListPage from "publicComponent/BeatComponent/ListPage/ListPage.jsx"
import TabSwitch from "publicComponent/BeatComponent/TabSwitch/TabSwitch.jsx"
import MailListItem from "WorkStore/WorkStore.component/MailListItem/MailListItem.jsx"
import DepartmentListItem from "WorkStore/WorkStore.component/DepartmentListItem/DepartmentListItem.jsx"
import getWeiChatStore from "getWeiChatStore"
import getLocalInfo from "getLocalInfo"
import {observer,inject} from "mobx-react"
import PathName from "PathName"
import {toJS} from "mobx"
import url from "url"

@inject((stores)=>(stores))
@observer class EmployeeManageIndex extends React.Component {
	render(){
		return (
		<Page>
			<TopBar>
				<TopBar.Middle>
					<TabSwitch relation={this.store.switchTag} onChange={this.handleSwitch}>
						<TabSwitch.ButtonItem keyname="员工">
							{"员工"}
						</TabSwitch.ButtonItem>
						<TabSwitch.ButtonItem keyname="部门">
							{"部门"}
						</TabSwitch.ButtonItem>						
					</TabSwitch>
				</TopBar.Middle>
				<TopBar.Right>
					{this.renderButton}
				</TopBar.Right>
			</TopBar>
			<Page.Top>
				<TabSwitch>
					<TabSwitch.Item keyname="1">
						{"在职"}
					</TabSwitch.Item>
					<TabSwitch.Item keyname="0">
						{"离职"}
					</TabSwitch.Item>						
				</TabSwitch>			
			</Page.Top>
			<Page.Split/>
			<ListPage store={this.store.ListPageState}>
				{this.renderList}
			</ListPage>
		</Page>	
	)}
	constructor(props){
	  	super(props);
	  	this.store=this.props.IndexStore;
	}
	componentDidMount(){
		this.store.changeTag("员工")
	}
	get renderButton(){
		switch(this.store.switchTag) {
			case "员工":
				return <Icon className="toAddBtn" icon="fa fa-plus" to={this.toAddEmployee}/>
			break;
			case "部门":
				return <Icon className="toAddBtn" icon="fa fa-plus" to={this.toAddDepartment}/>
			break;
		}
	}
	get renderList(){
		switch(this.store.switchTag){
			case "员工":
			return this.store.ListPageState.dataList.map((ListItem,index)=>{
				//console.log(toJS(ListItem));
				return (
				<MailListItem
					{...ListItem}
					key={index}
					Detail={true}
					onDelete={this.handleDeleteEmployee}		
				/>)					
			})
			break;
			case "部门":
			return (
				<List>
					{this.store.ListPageState.dataList.map((ListItem,index)=>{
						//console.log(toJS(ListItem));
						return (
						<DepartmentListItem {...ListItem} key={index} onDelete={this.handleDeleteDepartment} onModefiy={this.handleModefiy}>
							<div>{`${ListItem["RoledName"]}(${ListItem["EmployeeCount"]}人)`}</div>
						</DepartmentListItem>)									
					})}
				</List>)	
			break
		}
	}
	get toAddDepartment(){
		return url.format({
			pathname:PathName.AddRole,
	  	})
	}
	get toAddEmployee(){
		return url.format({
			pathname:PathName.AddEmployee,
	  	}) 	
	}
	handleSwitch=(SwitchOBJ)=>{
		this.store.changeTag(SwitchOBJ["keyname"])
	};
	handleModefiy=(targetProps)=>{
		this.store.modefiyDepartment(targetProps)
	};
	handleDeleteEmployee=(targetProps)=>{
		this.store.deleteEmployee(targetProps)
	};
	handleDeleteDepartment=(targetProps)=>{
		this.store.deleteDepartment(targetProps)
	};
}

export default EmployeeManageIndex