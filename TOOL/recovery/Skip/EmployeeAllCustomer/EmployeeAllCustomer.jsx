import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx" 
import ListPage from "publicComponent/BeatComponent/ListPage/ListPage.jsx"
import CustomerCard from "Customer/Customer.component/CustomerCard/CustomerCard.jsx"
import getWeiChatStore from "getWeiChatStore"
import {observer,inject} from "mobx-react"
import {toJS} from "mobx"
import url from "url"


@inject("RootStore")
@observer class EmployeeAllCustomer extends React.Component {
	render(){
		const {query}=url.parse(this.props.location.search,true)
		return (
		<Page>
			<TopBar>
				<TopBar.Left><TopBar.Back/></TopBar.Left>
				<TopBar.Middle>{"客户数量"}</TopBar.Middle>
			</TopBar>
			<ListPage store={this.store.ListPageState}>
				{this.store.ListPageState.dataList.map((ListItem,index)=>{
					return <CustomerCard {...ListItem} key={index}></CustomerCard>
				})}
			</ListPage>		
		</Page>			
	)}
	constructor(props){
	  	super(props);
	  	this.query=url.parse(this.props.location.search,true)["query"]
	  	this.store=getWeiChatStore(this).EmployeeAllCustomer
	}
	componentDidMount(){
		this.store.ListPageState.loadInitData({
			url:"/api/Wl_Customer_Employee/ListCustomerAsync",
			data:{user_Employee_Id:this.query["UserAccount"]}			
		})
	}
}
export default EmployeeAllCustomer