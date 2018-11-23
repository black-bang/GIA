import "./QuestionDetail.scss"
import Page from "publicComponent/Page/Page.jsx"
import FloatPage from "publicComponent/Page/FloatPage/FloatPage.jsx"
import TopBar from "publicComponent/TopBar/TopBar.jsx"
import {observer,inject} from "mobx-react"
import url from "url"

import QuestionDetailState from "./QuestionDetail.mobx.js"

@inject((stores)=>(stores))
@observer class QuestionDetail extends React.Component {
	render(){
		return (
		<FloatPage>
		<Page>
			<TopBar>
				<TopBar.Middle>{this.store.QuestionDetail["Label"]}</TopBar.Middle>
			</TopBar>
			<div className="QuestionDetail-content" dangerouslySetInnerHTML={{__html:this.store.QuestionDetail["Content"]}}>

			</div>
		</Page>	
		</FloatPage>		
	)}
	constructor(props){
	  	super(props);
	  	this.query=url.parse(this.props.location.search,true)["query"];
	  	this.RootStore=this.props.RootStore;
	  	this.store=new QuestionDetailState(this.query)
	}
	async componentDidMount(){
		try{
			await this.store.getQustionById()
		}catch(error){
			this.RootStore.Tips.Tip(error)
		}
	}
}


export default QuestionDetail