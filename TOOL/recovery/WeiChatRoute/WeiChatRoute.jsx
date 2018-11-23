import "./WeiChatRoute.scss"
import {Route,Switch} from "react-router-dom"
import Page from "publicComponent/Page/Page.jsx"
import NavBar from "publicComponent/NavBar/NavBar.jsx"
//import NavBar from "AppComponent/NavBar/NavBar.jsx"
import Icon from "publicComponent/Icon/Icon.jsx"



import AllInShopRecord from "Record/AllInShopRecord/AllInShopRecord.jsx"

//用户中心相关
import UserCenter from "User/UserCenter/UserCenter.jsx"
import AccountAndSecurity from "User/AccountAndSecurity/AccountAndSecurity.jsx"

//关于微聊
import AboutWeiChat from "User/AboutWeiChat/AboutWeiChat.jsx"
import Suggest from "User/Suggest/Suggest.jsx"

//门店信息
import TranslateDetail from "User/TranslateDetail/TranslateDetail.jsx"
//扫二维码
import QRCodePage from "User/QRCodePage/QRCodePage.jsx"
//店员考核
import EmployeeDate from "User/EmployeeDate/EmployeeDate.jsx"
import EmployeeAllCustomer from "User/EmployeeDate/EmployeeAllCustomer/EmployeeAllCustomer.jsx"
import EmployeeAllInShopRecord from "User/EmployeeDate/EmployeeAllInShopRecord/EmployeeAllInShopRecord.jsx"
//员工通讯录
import MailListDetail from "User/MailListDetail/MailListDetail.jsx"
//员工管理
import EmployeeManage from "User/EmployeeManage/EmployeeManage.jsx"
import AddEmployee from "User/EmployeeManage/AddEmployee/AddEmployee.jsx"
import AddDepartment from "User/EmployeeManage/AddDepartment/AddDepartment.jsx"
import DepartmentDetail from "User/DepartmentDetail/DepartmentDetail.jsx"

//聊天收藏列表
import ChatCollection from "User/ChatCollection/ChatCollection.jsx"
//需求管理
import DemandManage from "User/DemandManage/DemandManage.jsx"
import AddDemand from "User/AddDemand/AddDemand.jsx"


//评价列表
import AppraiseList from "Appraise/AppraiseList/AppraiseList.jsx"
//评价页面
import AppraisePage from "Appraise/AppraisePage/AppraisePage.jsx"
//评价详情
import AppraiseDetail from "Appraise/AppraiseDetail/AppraiseDetail.jsx"
//评价成功
import AppraiseSuccess from "Appraise/AppraiseSuccess/AppraiseSuccess.jsx"



//悬浮框
import FloatButton from "publicComponent/FloatButton/FloatButton.jsx"

//搜索页面
import SearchPage from "../../SearchPage/SearchPage.jsx"
import UserDetail from "User/UserDetail/UserDetail.jsx"

//工作台内容
import TransformRole from "WorkStore/TransformRole/TransformRole.page.jsx"

class WeiChatRoute extends React.Component {
	render(){
		return (
		<Page>
			{
				this.state.FloatButton?
				<FloatButton>
					<FloatButton.Item text="会员记录" to="/WeiChat/CustomerList"/>
					<FloatButton.Item text="游客记录" to="/WeiChat/AddInShopRecord"/>
				</FloatButton>
				:null
			}
			<Switch>
				<Route exact={true} path="/WeiChat/ChatIndex" component={ChatIndex}/>
				<Route exact={true} path="/WeiChat/ChatRoom" component={ChatRoom}/>
				<Route exact={true} path="/WeiChat/ChatMemberList" component={ChatMemberList}/>
				<Route exact={true} path="/WeiChat/AddMemberFromEmployee" component={AddMemberFromEmployee}/>
				<Route exact={true} path="/WeiChat/AddMemberFromCustomer" component={AddMemberFromCustomer}/>
				<Route exact={true} path="/WeiChat/DeleteMember" component={DeleteMember}/>
			</Switch>
			<Switch>
				{/*评价相关的路由*/}
				<Route exact={true} path="/WeiChat/AppraiseList" component={AppraiseList}/>
				<Route exact={true} path="/WeiChat/AppraisePage" component={AppraisePage}/>
				<Route exact={true} path="/WeiChat/AppraiseDetail" component={AppraiseDetail}/>
				<Route exact={true} path="/WeiChat/AppraiseSuccess" component={AppraiseSuccess}/>
			</Switch>
			<Switch>
				<Route exact={true} path="/SearchPage" component={SearchPage}/>
			</Switch>
			<Switch>
				{/*客户相关的路由*/}
				<Route exact={true} path="/WeiChat/CustomerIndex" component={CustomerIndex}/>
				<Route exact={true} path="/WeiChat/CustomerList" component={CustomerList}/>
				<Route exact={true} path="/WeiChat/AddInShopRecord" component={AddInShopRecord}/>
				<Route exact={true} path="/WeiChat/CustomerInShopRecord" component={CustomerInShopRecord}/>
				<Route exact={true} path="/WeiChat/AllotCustomer" component={AllotCustomerList}/>
				<Route exact={true} path="/WeiChat/CustomerDetail" component={CustomerDetail}/>
				<Route exact={true} path="/WeiChat/EmployeeList" component={EmployeeList}/>
				<Route exact={true} path="/WeiChat/CustomerCenter" component={CustomerCenter}/>
				
				<Route path="/WeiChat/EditCustomerInfo" component={EditCustomerInfo}/>
				
				<Route exact={true} path="/WeiChat/CustomerDemand" component={CustomerDemand}/>
				<Route exact={true} path="/WeiChat/AddCustomerDemand" component={AddCustomerDemand}/>
				<Route exact={true} path="/WeiChat/LinkCustomer" component={LinkCustomer}/>
				<Route exact={true} path="/WeiChat/LinkDevice" component={LinkDevice}/>
				{/*<Route exact={true} path="/WeiChat/TransformCustomer" component={TransformCustomer}/>*/}
			</Switch>
			<Switch>
				<Route exact={true} path="/WeiChat/AllInShopRecord" component={AllInShopRecord}/>
				{/*<Route exact={true} path="/WeiChat/SystemMessage" component={SystemMessage}/>*/}
			</Switch>
			<Switch>
				{/*用户中心*/}
				<Route exact={true} path="/WeiChat/TranslateDetail" component={TranslateDetail}/>
				<Route exact={true} path="/WeiChat/UserCenter" component={UserCenter}/>
				<Route exact={true} path="/WeiChat/AboutWeiChat" component={AboutWeiChat}/>
				<Route exact={true} path="/WeiChat/QRCodePage" component={QRCodePage}/>
				<Route exact={true} path="/WeiChat/Suggest" component={Suggest}/>
				<Route exact={true} path="/WeiChat/AccountAndSecurity" component={AccountAndSecurity}/>
				<Route exact={true} path="/WeiChat/ChatCollection" component={ChatCollection}/>
				<Route exact={true} path="/WeiChat/AddDemand" component={AddDemand}/>
				<Route exact={true} path="/WeiChat/DemandManage" component={DemandManage}/>
				
				<Route exact={true} path="/WeiChat/EmployeeManage" component={EmployeeManage}/>
				<Route exact={true} path="/WeiChat/DepartmentDetail" component={DepartmentDetail}/>
				<Route exact={true} path="/WeiChat/MailListDetail" component={MailListDetail}/>

				<Route path="/WeiChat/AddEmployee" component={AddEmployee}/>
				<Route path="/WeiChat/AddDepartment" component={AddDepartment}/>
				{/*员工考核*/}
				<Route exact={true} path="/WeiChat/EmployeeDate" component={EmployeeDate}/>
				<Route exact={true} path="/WeiChat/EmployeeAllCustomer" component={EmployeeAllCustomer}/>
				<Route exact={true} path="/WeiChat/EmployeeAllInShopRecord" component={EmployeeAllInShopRecord}/>
				<Route exact={true} path="/WeiChat/UserDetail" component={UserDetail}/>
			</Switch>
			<Switch>
				<Route path="/WeiChat/TransformRole" component={TransformRole}/>
			</Switch>
			{
				this.state.NavBar?
				<NavBar>
					<NavBar.Icon icon="fa fa-commenting-o fa fa-lg" text="聊天" to="/WeiChat/ChatIndex"/>
					<NavBar.Icon icon="fa fa-users fa fa-lg" text="客户" to="/WeiChat/CustomerIndex"/>
					<NavBar.Icon icon="fa fa-calendar-plus-o fa-lg" text="到店记录" to="/WeiChat/AllInShopRecord"/>
					<NavBar.Icon icon="fa fa-street-view fa-lg" text="我" to="/WeiChat/UserCenter"/>
				</NavBar>:null			
			}
			{/*this.state.NavBar?<NavBar></NavBar>:null*/}
		</Page>	
	)}
	constructor(props){
	  	super(props);
	  	this.state={
	  		FloatButton:true,
	  		NavBar:true,
	  	};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
		const {pathname}=nextProps.location
		switch(pathname.replace(/\/$/g,"")){
			case "/WeiChat/ChatIndex":
				nextState.NavBar=true
				nextState.FloatButton=true
			break;
			case "/WeiChat/CustomerIndex":
				nextState.NavBar=true
				nextState.FloatButton=true
			break;
			case "/WeiChat/CustomerWorkStore":
				nextState.NavBar=true
				nextState.FloatButton=true				
			break;
			case "/WeiChat/AllInShopRecord":
				nextState.NavBar=true
				nextState.FloatButton=true
			break;
			case "/WeiChat/UserCenter":
				nextState.NavBar=true
				nextState.FloatButton=false
			break;
			default:
				nextState.NavBar=false
				nextState.FloatButton=false
		}
	}
}
export default WeiChatRoute