import "./TransformCustomer.scss"
import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import List from "publicComponent/List/List.jsx"
import BaseInput from "publicComponent/Form/BaseInput/BaseInput.jsx"
import TextArea from "publicComponent/Form/TextArea/TextArea.jsx"
import BaseSelect from "publicComponent/Form/BaseSelect/BaseSelect.jsx"
import Button from "publicComponent/BeatComponent/Button/Button.jsx"
import getWeiChatStore from "getWeiChatStore"
import history from "RouteConfig"
import {observer,inject} from "mobx-react"
import url from "url"

@inject("RootStore")
@observer class TransformCustomer extends React.Component {
	render(){
		return (
		<Page>
			<TopBar>
				<TopBar.Middle>
					{"增加员工"}
				</TopBar.Middle>
				<TopBar.Right>
					<Button className="TransformCustomer-btn" active={this.store.canSubmit} onClick={this.handleSubmit.bind(this)}>
						{"提交"}
					</Button>
				</TopBar.Right>
			</TopBar>
			<div className="otherInfo">{"主要信息(必填)"}</div>
			<List>
				<List.Vertical>
					<div>{"登录昵称:"}</div>
					<BaseInput 
						keyname="name" 
						relation={this.store.Employee.name} 
						placeholder="请输入登录昵称"
						onChange={this.handleChange.bind(this)}
					/>
				</List.Vertical>
				<List.Vertical>
					<div>{"真实姓名:"}</div>
					<BaseInput 
						keyname="account" 
						relation={this.store.Employee.account} 
						placeholder="请输入真实姓名"
						onChange={this.handleChange.bind(this)}
					/>
				</List.Vertical>
				<List.Vertical>
					<div>{"设置密码:"}</div>
					<BaseInput 
						keyname="password" 
						relation={this.store.Employee.password} 
						placeholder="设置登录密码"
						onChange={this.handleChange.bind(this)}
					/>
				</List.Vertical>
				<List.Vertical>
					<div>{"角色职称:"}</div>
					<BaseSelect relation={this.store.Employee.roleListId} onSelect={this.handleSwitch.bind(this)} placeholder="请选择角色职称">
						{this.store.RoleList.map((ListItem,index)=>{
							return <BaseSelect.Item key={index} value={ListItem["Id"]} text={ListItem["Name"]}/>
						})}
					</BaseSelect>
				</List.Vertical>
			</List>
			<div className="otherInfo">{"其他信息(选填)"}</div>
			<List>
				<List.Vertical>
					<div>{"地址:"}</div>
					<BaseInput keyname="address" placeholder="请输入员工姓名"/>
				</List.Vertical>
				<List.Vertical>
					<div>{"电话:"}</div>
					<BaseInput keyname="mobile" placeholder="请输入电话号码"/>
				</List.Vertical>					
				<List.Vertical>
					<div>{"手机号:"}</div>
					<BaseInput keyname="mobile" placeholder="请输入手机号"/>
				</List.Vertical>	
				<List.Vertical>
					<div>{"电子邮箱:"}</div>
					<BaseInput keyname="Email" placeholder="请输入员工姓名"/>
				</List.Vertical>
				<List.Vertical>
					<div>{"QQ:"}</div>
					<BaseInput keyname="QQ" placeholder="请输入员工姓名"/>
				</List.Vertical>
				<List.Vertical>
					<div>{"微信:"}</div>
					<BaseInput keyname="weixin" placeholder="请输入员工姓名"/>
				</List.Vertical>
				<List.Vertical>
					<div>{"职位:"}</div>
					<BaseInput keyname="job" placeholder="请输入职位"/>
				</List.Vertical>
				<List.Item>
					<TextArea maxLength={200} placeholder="备注信息"/>
				</List.Item>
			</List>
		</Page>
	)}
	constructor(props){
	  	super(props);
	  	this.query=url.parse(this.props.location.search,true)["query"];
	  	this.store=getWeiChatStore(this).TransformCustomer
	}
	componentDidMount(){
		this.store.setInitData(this.query)
	  	this.store.getRoleList()
	}
	handleChange(inputOBJ){
		this.store.input(inputOBJ)
	}
	handleSwitch(switchItem){
		this.store.switchRole(switchItem)
	}
	async handleSubmit(){
		try{
			await this.store.submit()
			history.replace({pathname:"/WeiChat/UserCenter"})
		}catch(error){
			return false
		}
	}
}
export default TransformCustomer