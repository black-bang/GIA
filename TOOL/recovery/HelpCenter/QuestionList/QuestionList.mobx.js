import {observable,action,flow,computed} from "mobx"
import ListPageState from "publicComponent/BeatComponent/ListPage/ListPage.mobx.js"
import {getFetch} from "fetchFn"

export default class QuestionListState {
	constructor(){
		this.ListPageState=new ListPageState();
	}
	//--<>--//
	@observable ClassifyLabel=[];
	getClassifyLabel=flow(function*(){
		//获取选项卡分类
		try{
			const result=yield getFetch({
				url:"/api/Operate_Label/ListAsync/",
				data:{}
			})
			if(result.length>0){
				this.selectLabel(result[0]["Id"])
				this.ClassifyLabel=result
			}
			console.log(result);
			this.ClassifyLabel=result
		}catch(error){
			throw error
		}
	})
	//--<>--//
	getQuestionList=flow(function*(){
		try{
			this.ListPageState.loadInitData({
				url:"/api/Operate_Essay/ListAsync/",
				data:{labelId:this.selectedLabelId}
			})
		}catch(error){
			throw error
		}
	})
	@observable selectedLabelId=null;
	@action selectLabel(LabelId){
		this.selectedLabelId=LabelId
		this.getQuestionList()
	}
}