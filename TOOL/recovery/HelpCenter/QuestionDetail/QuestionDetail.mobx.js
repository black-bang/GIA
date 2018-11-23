import {observable,action,flow,computed} from "mobx"
import {getFetch} from "fetchFn"

class QuestionDetailState {
	constructor(queryOBJ){
		this.queryOBJ=queryOBJ
	}	
	//--<>--//
	@observable QuestionDetailMap=new Map();
	@computed get QuestionDetail(){
		return this.QuestionDetailMap.toJSON()
	}
	getQustionById=flow(function*(){
		try{
			const result=yield getFetch({
				url:"/api/Operate_Essay/InfoAsync/",
				data:{essayId:this.queryOBJ["Id"]}
			})
			console.log(result[0]);
			this.QuestionDetailMap=observable.map(result[0])
		}catch(error){
			throw error
		}
	})
}

export default QuestionDetailState