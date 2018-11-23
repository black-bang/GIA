import QuestionListState from "./QuestionList/QuestionList.mobx.js"
import QuestionDetailState from "./QuestionDetail/QuestionDetail.mobx.js"

export default class HelpCenterState {
	constructor(){
		this.ListState=new QuestionListState();
		this.DetailState=new QuestionDetailState();
	}
}