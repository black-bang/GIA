import {observable,action,decorate,flow} from "mobx"
import {ajax} from "api"

class ListPageState {
	constructor(ROOTSTORE){
		this.ROOTSTORE=ROOTSTORE
		//数据暂存区,用于配合搜索
		this.TEMP={
			json:{},
			count:0,
			pagenum:0,
			dataList:[],
		};
		this.JSON={};
	}	
	//数据集合
	@observable count=0;
	@observable pagenum=0;
	@observable dataList=[];
	//当前加载状态("PEDDING","COMPLETE","FAIL")
	@observable loadState={
		state:"",
		message:"",
	};
	@action clearInitData(){
		this.count=0;
		this.pagenum=0;
		this.dataList=[];
		this.loadState["state"]=""
		this.loadState["message"]=""			
	}
	@action clearAll(){
		this.TEMP={
			json:{},
			count:0,
			pagenum:0,
			dataList:[],
		}
		this.count=0;
		this.pagenum=0;
		this.dataList=[];
		this.loadState["state"]=""
		this.loadState["message"]=""		
	}
	@action CACHE(){
		this.TEMP["json"]=this.JSON;
		this.TEMP["count"]=this.count;
		this.TEMP["pagenum"]=this.pagenum;
		this.TEMP["dataList"]=this.dataList.slice();
	}
	@action RECOVERY(){
		if(this.TEMP["dataList"].length!==this.dataList.length){
			this.JSON=this.TEMP["json"]
			this.count=this.TEMP["count"]
			this.pagenum=this.TEMP["pagenum"]
			this.dataList=this.TEMP["dataList"]			
		}else{
			return false
		}
	}
	@action PEDDING(text){
		this.loadState["state"]="PEDDING";
		this.loadState["message"]=text
	}
	@action COMPLETE(text){
		this.loadState["state"]="COMPLETE";
		this.loadState["message"]=text
	}
	@action FAIL(text){
		this.loadState["state"]="FAIL";
		this.loadState["message"]=text
	}
	loadInitData=flow(function*(json){
		//加载初始数据
		//取第0页的数据20条
		//this.pagenum=0;
		this.clearAll()
		this.JSON=json
		const dataOBJ=Object.assign({},this.JSON["data"],{
			pagenum:this.pagenum,
			pagesize:40,				
		})
		try{
			this.PEDDING("loading...")
			//this.ROOTSTORE.Loading.PEDDING("玩命加载中")
			const result=yield ajax.get({
				url:this.JSON["url"],
				data:dataOBJ
			})
			this.count=Number(result["count"])
			this.dataList=result.data
			//成功后将pagenum+1
			this.pagenum=this.pagenum+1
			if(this.count==0){
				//this.ROOTSTORE.Loading.COMPLETE("")
					this.COMPLETE("暂无数据");
			}else{
				this.COMPLETE("")
			}
		}catch(error){
			this.FAIL("服务器开小差了")
			throw error;
		}
	})
	loadMoreData=flow(function*(json){
		//翻页之前要先判断是否已经达到最大数量
		if(this.dataList.length>=this.count){
			//  this.COMPLETE("没有更多了")
			return false
		}
		//加载更多数据
		const dataOBJ=Object.assign({},this.JSON["data"],{
			pagenum:this.pagenum,
			pagesize:40,				
		})
		try{
			this.PEDDING("loading...")
			const result=yield ajax.get({
				url:this.JSON["url"],
				data:dataOBJ,
			})
			this.dataList=this.dataList.concat(result["data"])
			//成功后将pagenum+1
			this.pagenum=this.pagenum+1	
			this.COMPLETE("")		
		}catch(error){
			this.FAIL("服务器开小差了")
			throw error;
		}
	})
	searchData=flow(function*(json){
		//由于搜索业务需要条件做支持,所以需要额外调用
		//先判断搜索条件是否为空,
		let condition=true
		for(let key in json){
			//默认只有一个条件
			if(!json[key]){
				condition=false
				break;
			}
		}
		if(condition){
			//存在搜索条件,将之前的翻页信息缓存到TEMP,之后开始搜索逻辑
			this.CACHE()
			this.clearInitData()
			//重置翻页数
			this.pagenum=0;
			this.JSON=json;
			const dataOBJ=Object.assign({},this.JSON["data"],{
				pagenum:this.pagenum,
				pagesize:40,				
			})
			try {
				//this.ROOTSTORE.Loading.PEDDING("搜索中,请耐心等待...")
				this.PEDDING("loading...")
				const result=yield ajax.get({
					url:this.JSON["url"],
					data:dataOBJ
				});
				this.count=Number(result["count"])
				this.dataList=result["data"]
				this.pagenum=this.pagenum+1
				if(this.count==0){
					//this.ROOTSTORE.Loading.COMPLETE("")
					this.COMPLETE("无搜索结果")
				}else{
					this.COMPLETE("")
				}
			}catch(error){
				this.FAIL("服务器开小差了")
				throw error;
			}
		}else{
			//如果为空就跳出搜索逻辑,并从暂存区TEMP还原翻页数据
			this.RECOVERY()
		}
	})
}

export default ListPageState