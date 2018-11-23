import QuestionList from "./QuestionList/QuestionList.jsx"
import QuestionDetail from "./QuestionDetail/QuestionDetail.jsx"
import {Switch,Route} from "react-router-dom"
import {Provider,inject,observer} from "mobx-react"
import PathName from "PathName"

import HelpCenterState from "./HelpCenter.mobx.js"


@inject("RootStore")
@observer class HelpCenterRouter extends React.Component {
	render(){
		return (
		<Provider HelpCenterStore={this.stores}>
			<React.Fragment>
				<Route path={PathName.QuestionList} component={QuestionList}/>
				<Route path={PathName.QuestionDetail} component={QuestionDetail}/>
			</React.Fragment>			
		</Provider>
	)}
	constructor(props){
	  	super(props);
	  	this.stores=new HelpCenterState();
	  	this.RootStore=this.props.RootStore
	}
	async componentDidMount(){
		try{
			await this.stores.ListState.getClassifyLabel()
		}catch(error){
			this.RootStore.Tips.Tip(error)
		}
	}
}
export default HelpCenterRouter