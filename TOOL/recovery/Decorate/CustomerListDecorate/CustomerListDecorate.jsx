import ListPageState from "publicComponent/BeatComponent/ListPage/ListPage.mobx.js"
import {inject,observer} from "mobx-react"

const CustomerListDecorate=function(Component){
	@observer class CustomerList extends React.Component {
		render(){
			return (
			<Component 
				ListPageState={this.store}
				dataList={this.store.dataList} 
				loadInitData={this.loadInitData.bind(this)}
				searchData={this.handleSearch.bind(this)}
			/>
		)}
		constructor(props){
		  	super(props);
		  	this.store=new ListPageState();	
		}
		loadInitData(){
			this.store.loadInitData({
				url:"/api/Wl_Customer_Employee/NewListAsync/",
				data:{}
			})
		}
		handleSearch(searchOBJ){
			this.store.searchData({
				url:"/api/Wl_Customer_Employee/NewListAsync/",
				data:{keyWord:searchOBJ["keyvalue"]}
			})
		}
	}
	CustomerList.contextTypes=Component.contextTypes
	return CustomerList 
}


export default CustomerListDecorate