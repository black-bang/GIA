import {observable,action,flow,computed} from "mobx"
import {format} from "../#ScrollView.api/ScrollViewApi.js"
import {ajax} from "api"

export default class LoadState {
	constructor(){
		this.conut=0;
		this.pagenum=0;
		this.pagesize=40;
		this._loadConfig={};
	}
	//--<>--//
	loadConfig(config){
		this._loadConfig=config
	}
	get formatSearchParma(){
		//格式化成分页数据
		const {url,data}=this._loadConfig
		return {
			url:url,
			data:Object.assign({
				pagenum:this.pagenum,
				pagesize:this.pagesize,
			},data)
		}
	}
	@observable dataList=[];
	search=flow(function*(){
		//加载初始数据
		try{
			const {data,count}=yield ajax.get(this.formatSearchParma)
			this.pagenum=this.pagenum+1
			this.dataList.concat(data)
			this.count=count;
		}catch(error){
			throw error
		}
	})
	loadMore=flow(function*(){
		//加载更多数据
		try{
			const {data,count}=yield ajax.get(this.formatLoadParma)
			this.pagenum=this.pagenum+1
			this.dataList.concat(data)
		}catch(error){
			throw error
		}		
	})
	@comouted get loadOver(){
		//数据是否全部加载完成
		return (this.dataList.length>=this.count)
	}
}


// this.ScrollViewState=new ScrollViewState()
// this.ScrollViewState.loadConfig({
// 	url:"",
// 	data:{}
// })
