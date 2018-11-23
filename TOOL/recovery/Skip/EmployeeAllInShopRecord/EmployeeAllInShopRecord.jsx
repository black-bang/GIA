import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx" 
import ListPage from "publicComponent/BeatComponent/ListPage/ListPage.jsx"
import AllInshopRecordItem from "Record/Record.component/AllInshopRecordItem/AllInshopRecordItem.jsx"
import getWeiChatStore from "getWeiChatStore"
import getLocalInfo from "getLocalInfo"
import {observer,inject} from "mobx-react"
import {toJS} from "mobx"
import url from "url"


@inject("RootStore")
@observer class EmployeeAllInShopRecord extends React.Component {
	render(){
		return (
		<Page>
			<TopBar>
				<TopBar.Left><TopBar.Back/></TopBar.Left>
				<TopBar.Middle>{"昨日进店"}</TopBar.Middle>
			</TopBar>
			<ListPage store={this.store.ListPageState}>
				{this.store.ListPageState.dataList.map((ListItem,index)=>{
					//console.log(ListItem);
					return <AllInshopRecordItem {...ListItem} key={index}/>					
				})}
			</ListPage>
		</Page>	
	)}
	constructor(props) {
	  	super(props);
	  	this.store=getWeiChatStore(this).EmployeeAllInShopRecord
	  	this.query=url.parse(this.props.location.search,true)["query"]
	}
	componentDidMount(){
		this.store.ListPageState.loadInitData({
			//url:"/api/Wl_Customer_Employee/ListInShopAsync",
			//data:{user_Employee_Id:this.query["UserAccount"]}	
			url:"/api/Wl_Inshop_Record/LatestInShopNeedListAsync",
			data:{
				keyWord:"",
				flag:"2",
				sys_PlatFrom_Translate_Id:getLocalInfo()["TranslateId"]
			}		
		})
	}
}
export default EmployeeAllInShopRecord