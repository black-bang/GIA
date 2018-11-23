
//这是一个临时的方案
//SessionStorage缓存方案的底层方法
export default class SessionCache {
	constructor(){
		this._PREFIX="@SESSIONCACHE-"
	}
	prefix(prefixName){
		//自定义缓存识别标识
		this._PREFIX=this._PREFIX+prefixName
	}
	toCacheFormat(OriginFormat){
		//转换成缓存格式
		return JSON.stringify(OriginFormat)
	}
	toOriginFormat(CacheFormat){
		//还原缓存
		return JSON.parse(CacheFormat)
	}
	set(kayname,data){

	}
	get(keyname){

	}

}