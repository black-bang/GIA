import "./CustomerPage.scss"
import Page from "publicComponent/Page/Page.jsx"
import FloatPage from "publicComponent/Page/FloatPage/FloatPage.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import Search from "publicComponent/Search/Search.jsx"
import SectionSwitch from "publicComponent/BeatComponent/SectionSwitch/SectionSwitch.jsx"
import ListPage from "publicComponent/BeatComponent/ListPage/ListPage.jsx"
import CustomerCard from "Customer/Customer.component/CustomerCard/CustomerCard.jsx"
import EmployeeCard from "Customer/Customer.component/EmployeeCard/EmployeeCard.jsx"
import {observer,inject} from "mobx-react"


@inject("mobxStore")
@observer class CustomerPage extends React.Component {
	render(){
		return (
		<FloatPage>
		<Page>
			<TopBar>
				<TopBar.Middle>
					<SectionSwitch relation={this.mobxStore.TagName} onSwitch={this.handleSwitch}>
						<SectionSwitch.Item keyname="员工">
							{"员工"}
						</SectionSwitch.Item>
						<SectionSwitch.Item keyname="客户">
							{"客户"}
						</SectionSwitch.Item>
					</SectionSwitch>
				</TopBar.Middle>
			</TopBar>
			<ListPage store={this.mobxStore.ListPageState}>
				{this.ListPageState.dataList.map((ListItem,index)=>{
					//console.log(ListItem);
					switch(this.mobxStore.TagName){
						case "员工":
							return (
							<EmployeeCard {...ListItem} key={index} IsGroup={false}>
								<EmployeeCard.Select onClick={this.handleSelect}/>
							</EmployeeCard>)								
						break;
						case "客户":
							return (
							<CustomerCard {...ListItem} key={index} IsGroup={false}>
								<CustomerCard.Quick>
									<CustomerCard.Select onClick={this.handleSelect}/>
								</CustomerCard.Quick>
							</CustomerCard>)
						break;
					}
				})}
			</ListPage>
		</Page>		
		</FloatPage>
	)}
	constructor(props){
	  	super(props);
	 	this.mobxStore=this.props.mobxStore;
	 	this.ListPageState=this.mobxStore.ListPageState;
	}
	componentDidMount(){
		this.mobxStore.switchTag("员工")
	}
	handleSwitch=(swicthOBJ)=>{
		this.mobxStore.switchTag(swicthOBJ["switchItem"])
	};
	handleSelect=(CustomerOBJ)=>{
		this.context.onChange(CustomerOBJ)
		this.props.history.goBack()
	};
	static contextTypes={
		onChange:PropTypes.func,
	}
}


export default CustomerPage