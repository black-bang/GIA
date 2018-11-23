import "./MailListDetail.scss"
import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import Portrait from "publicComponent/Portrait/Portrait.jsx"
import BaseInput from "publicComponent/Form/BaseInput/BaseInput.jsx"
import ReadWriteInput from "publicComponent/Edit/ReadWriteInput/ReadWriteInput.jsx"
import SelectDepartment from "AppComponent/SelectDepartment/SelectDepartment.jsx"
import List from "publicComponent/List/List.jsx"
import Button from "publicComponent/Button/Button.jsx"
import getWeiChatStore from "getWeiChatStore"
import {observer,inject} from "mobx-react"
import history from "RouteConfig"
import url from "url"

@inject("RootStore")
@observer class MailListDetail extends React.Component {
	render(){
		return (
		<Page>
{/*			<TopBar className="MailListDetail-TopBar">
				<TopBar.Left>
					{(()=>{
						if(this.state.edit){
							return <div onClick={this.handleCancelEdit}>{"取消"}</div>
						}else{
							return null
						}
					})()}					
				</TopBar.Left>
				<TopBar.Middle>{"联系人详情"}</TopBar.Middle>
				<TopBar.Right>
					{(()=>{
						if(this.state.edit){
							return <div onClick={this.handleSubmit}>{"提交"}</div>
						}else{
							return <div onClick={this.handleEdit}>{"编辑"}</div>
						}
					})()}
				</TopBar.Right>
			</TopBar>*/}
{/*			<div className="MailListDetail-photoWall" style={{backgroundImage:`url(${this.store.Detail["Picture"]})`}}>
				<div className="EmployeeName">
					{this.store.Detail["EmployeeName"]}
				</div>
			</div>*/}
			<List className="MailListDetail-List">
				<List.Item>
					<div className="ListItem-title">{"选择职位"}</div>
					<ReadWriteInput
						keyname="Name"
						type="SelectDepartment"
						edit={this.state.edit} 
						relation={this.store.Detail["RoleName"]} 
						onSelect={this.handleSelect}
					/>	
				</List.Item>	
				<List.Item>
					<div className="ListItem-title">{"姓名:"}</div>
					<ReadWriteInput
						keyname="EmployeeName"
						edit={this.state.edit} 
						relation={this.store.Detail["EmployeeName"]} 
						placeholder="请输入姓名"
						onChange={this.handleChange}
					/>
				</List.Item>				
				<List.Item>
					<div className="ListItem-title">{"手机号:"}</div>
					<ReadWriteInput 
						keyname="Mobile"
						edit={this.state.edit} 
						relation={this.store.Detail["Mobile"]} 
						placeholder="请输入手机号"
						onChange={this.handleChange}
					/>
				</List.Item>	
				<List.Item>
					<div className="ListItem-title">{"电子邮箱:"}</div>
					<ReadWriteInput 
						keyname="Email"
						edit={this.state.edit} 
						relation={this.store.Detail["Email"]} 
						placeholder="请输入员工电子邮箱"
						onChange={this.handleChange}
					/>
				</List.Item>
				<List.Item>
					<div className="ListItem-title">{"QQ:"}</div>
					<ReadWriteInput 
						keyname="Qq"
						edit={this.state.edit} 
						relation={this.store.Detail["Qq"]} 
						placeholder="请输入员工QQ"
						onChange={this.handleChange}
					/>
				</List.Item>
				<List.Item>
					<div className="ListItem-title">{"微信:"}</div>
					<ReadWriteInput
						keyname="WeiXin"
						edit={this.state.edit} 
						relation={this.store.Detail["WeiXin"]} 
						placeholder="请输入员工微信"
						onChange={this.handleChange}
					/>
				</List.Item>	
			</List>
		</Page>	
	)}
	constructor(props){
	  	super(props);
	  	this.state={edit:false}
	  	this.store=getWeiChatStore(this).MailListDetail
	  	this.query=url.parse(this.props.location.search,true)["query"]
	}
	get canSubmit(){
		if(!this.store.Detail["Mobile"]){
			return false
		}else{
			return true
		}
	}
	componentDidMount(){
		if(this.query["EmployeeId"]){
			this.store.getDetailMapByEmployeeId(this.query["EmployeeId"])
		}
	  	if(this.query["AccountId"]){
	  		this.store.getDetailMapByAccountId(this.query["AccountId"])
	  	}
	}
	componentWillUnmount(){
		this.store.clearState()
	}
	handleEdit=()=>{
		this.setState({edit:true})
	};
	handleCancelEdit=()=>{
		this.setState({edit:false})
		window.location.reload()
	};
	handleChange=(inputOBJ)=>{
		this.store.inputText(inputOBJ)
	};
	handleSelect=(DepartmentOBJ)=>{
		this.store.selectRole(DepartmentOBJ["selectItem"])
	};
	handleSubmit=async ()=>{
		try{
			if(this.query["EmployeeId"]){
				await this.store.submitByEmployeeId(this.query["EmployeeId"])
			}
			if(this.query["AccountId"]){
				await this.store.submitByAccountId(this.query["AccountId"])
			}
			this.props.history.replace({pathname:"/WeiChat/EmployeeManage/"})
		}catch(error){
			console.log(error);
		}
	};
}


export default MailListDetail