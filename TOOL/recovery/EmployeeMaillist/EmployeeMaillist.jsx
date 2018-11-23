import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import MailListItem from "WorkStore/WorkStore.component/MailListItem/MailListItem.jsx"
import ListPage from "publicComponent/BeatComponent/ListPage/ListPage.jsx"
import {observer,inject} from "mobx-react"
import getWeiChatStore from "getWeiChatStore"


@inject("RootStore")
@observer class EmployeeMaillist extends React.Component {
	render(){
		return (
		<Page>
			<TopBar>
				<TopBar.Middle>{"员工通讯录"}</TopBar.Middle>
			</TopBar>
			<ListPage store={this.store.ListPageState}>
				{this.store.ListPageState.dataList.map((ListItem,index)=>{
					//console.log(ListItem);
					return (
					<MailListItem
						{...ListItem}
						key={index}
						Reset={false}
						Detail={false}
					/>)			
				})}
			</ListPage>
		</Page>					
	)}
	constructor(props){
	  	super(props);
	  	this.store=getWeiChatStore(this).EmployeeMaillist
	}
	componentDidMount(){
		this.store.loadInitData()
	}
}
export default EmployeeMaillist