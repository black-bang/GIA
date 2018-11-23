const APIHOST=hostname||"http://api.jzker.cn/"||"http://106.14.115.8:8012/"
//抹平ApiHost,统一去掉主机名的/后缀
const pollfilyApiHost=APIHOST.replace(/\/$/ig,"")
export {pollfilyApiHost}
export function pollfilyJSONURL(url){
	//抹平JSON中的url,统一去掉url的"/"前缀和"/"后缀
	return url.replace(/^\//ig,"").replace(/\/$/ig,"")
}
export function createParma(data){
	//根据json的data生成参数部分
	return Object.keys(data).map((key)=>{
		return `${key}=${data[key]}`
	}).join("&")
}
export function createVarify(canVarify){
	let Varify=true;
	const noExist=function(parma){
		//是否有参数的判断
		return [undefined,null].map((type)=>{
			return parma===type
		}).includes(true)
	}
	if(noExist(canVarify)){
		//使用者没有传递是否验证的参数
		Varify=true
	}else{
		//使用者传递了是否验证的参数
		Varify=canVarify
	}
	if(Varify){
		const VarifyOBJ={
			
		}		
		return Object.keys(VarifyOBJ).map((key)=>{
			return `${key}=${VarifyOBJ[key]}`
		}).join("&")		
	}else{
		return ""
	}
}
export function resultPipe(result){
	//根据返回结果的不同走不同的管道
	switch(result.Code){
		case "0":
			throw result.Tips
		break;
		case "1":
			return result.Result
		break;
		case "-1":
			throw "网络超时"
		break;
		case "-2":
			throw "无权限,非法访问"
		break;
	}
}
