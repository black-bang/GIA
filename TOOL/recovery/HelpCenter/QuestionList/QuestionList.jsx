import Page from "publicComponent/Page/Page.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import ListPage from "publicComponent/BeatComponent/ListPage/ListPage.jsx"
import TabSwitch from "publicComponent/BeatComponent/TabSwitch/TabSwitch.jsx"
import HelpCard from "WorkStore/WorkStore.component/HelpCard/HelpCard.jsx"

import {observer,inject} from "mobx-react"
import {Route} from "react-router-dom" 
import PathName from "PathName"


@inject((stores)=>(stores))
@observer class QuestionList extends React.Component {
	render(){
		return (
		<Page>
			<TopBar>
				<TopBar.Middle>{"常见问题"}</TopBar.Middle>
			</TopBar>
			<Page.Top>
				<TabSwitch relation={this.store.selectedLabelId} onChange={this.handleChange}>
					{this.store.ClassifyLabel.map((Label,index)=>{
						return (
						<TabSwitch.Item key={index} keyname={Label["Id"]}>
							{Label["Label"]}
						</TabSwitch.Item>)
					})}
				</TabSwitch>				
			</Page.Top>
			<ListPage store={this.store.ListPageState}>
				{this.store.ListPageState.dataList.map((ListItem,index)=>{
					return <HelpCard {...ListItem} key={index}/>
				})}
			</ListPage>
		</Page>		
	)}
	constructor(props){
	  	super(props);
	  	this.store=this.props.HelpCenterStore.ListState
	}
	handleChange=(SwitchOBJ)=>{
		const {keyname,keyvalue}=SwitchOBJ;
		this.store.selectLabel(keyname)
	}
}
export default QuestionList