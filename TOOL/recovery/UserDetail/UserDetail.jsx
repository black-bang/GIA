import "./UserDetail.scss"
import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import List from "publicComponent/List/List.jsx"
import {NavLink} from "react-router-dom"
import ReadWriteInput from "publicComponent/Edit/ReadWriteInput/ReadWriteInput.jsx"
import getWeiChatStore from "getWeiChatStore"
import {observer,inject} from "mobx-react"

@inject("RootStore")
@observer class UserDetail extends React.Component {
	state={edit:false};
	render(){
		const {name,mobile}=this.store.EmployeeInfo
		return (
		<Page>
			<TopBar>
				<TopBar.Left>
					{(()=>{
						if(this.state.edit){
							return <div onClick={this.handleCancleEdit}>{"取消"}</div>
						}else{
							return null
						}
					})()}
				</TopBar.Left>
				<TopBar.Middle>
					{"员工详情"}
				</TopBar.Middle>
				<TopBar.Right>
					{(()=>{
						if(this.state.edit){
							return <div onClick={this.handleSave}>{"保存"}</div>
						}else{
							return <div onClick={this.handleEdit}>{"编辑"}</div>
						}
					})()}
				</TopBar.Right>
			</TopBar>
			<List>
				<List.Item>
					<div className="UserDetail-item">{"姓名:"}</div>
					<ReadWriteInput keyname="name" edit={this.state.edit} relation={name} onChange={this.handleChange}/>
				</List.Item>
				<List.Item>
					<div className="UserDetail-item">{"手机号:"}</div>
					<ReadWriteInput keyname="mobile" edit={this.state.edit} relation={mobile} onChange={this.handleChange}/>
				</List.Item>			
			</List>
		</Page>
	)}
	constructor(props){
	  	super(props);
	  	this.store=getWeiChatStore(this).UserDetail
	}
	componentDidMount(){
		this.store.getEmployeeInfoByLocalStorage()
	}
	handleChange=(textOBJ)=>{
		this.store.inputValue(textOBJ)
	};
	handleSave=async ()=>{
		await this.store.saveModify()
		this.setState({edit:false})
	};
	handleEdit=()=>{
		this.setState({edit:true})
		this.store.editStart()
	};
	handleCancleEdit=()=>{
		this.setState({edit:false})
		this.store.editCancel()
	};
}
export default UserDetail