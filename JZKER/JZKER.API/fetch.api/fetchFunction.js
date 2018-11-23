const ApiHost=hostname

const postFetch=function(postObject){
	const {url,data}=postObject
	let dataString="?"
	for(let key in data){
		switch(key){
			case "host":
				dataString=dataString+key+"="+data[key]+"&"
			break;
			case "pagenum":
				dataString=dataString+key+"="+data[key]+"&"
			break;
			case "pagesize":
				dataString=dataString+key+"="+data[key]+"&"
			break;
			default:
				dataString=dataString+"param."+key+"="+data[key]+"&"
		}
	} 
	dataString=
		dataString.replace(/\&$/ig,"")+
		(function(){
			let checkStr=""
			if(localStorage.getItem("PlantFrom")){
				checkStr=checkStr+"&param.plantFrom="+localStorage.getItem("PlantFrom")
			}
			if(localStorage.getItem("SecretID")){
				checkStr=checkStr+"&param.secretId="+localStorage.getItem("SecretID")
			}
			if(localStorage.getItem("SecretKey")){
				checkStr=checkStr+"&param.secretKey="+localStorage.getItem("SecretKey")
			}
			return checkStr
		})()
	return fetch(ApiHost+url.replace(/^\//ig,"").replace(/\/$/ig,"")+"/"+dataString,{
		method:"POST"
	})
	.catch((error)=>{
		//fetch请求自身出了问题
		throw "请检查fetch请求"
	})
	.then((response)=>{
		return response.json()
	})
	.catch((error)=>{
		//请求成功但接口报错
		console.log(`错误接口:${url}`);
		throw "抱歉,服务器开小差了"
	})
	.then((result)=>{
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
	})
}

const getFetch=function(getObject){
	const {url,data}=getObject
	let dataString="?"
	for(let key in data){
		switch(key){
			case "host":
				dataString=dataString+key+"="+data[key]+"&"
			break;
			case "pagenum":
				dataString=dataString+key+"="+data[key]+"&"
			break;
			case "pagesize":
				dataString=dataString+key+"="+data[key]+"&"
			break;
			default:
				dataString=dataString+"param."+key+"="+data[key]+"&"
		}
	} 
	dataString=
	dataString.replace(/\&$/ig,"")+
	(function(){
		let checkStr=""
		if(localStorage.getItem("PlantFrom")){
			checkStr=checkStr+"&param.plantFrom="+localStorage.getItem("PlantFrom")
		}
		if(localStorage.getItem("SecretID")){
			checkStr=checkStr+"&param.secretId="+localStorage.getItem("SecretID")
		}
		if(localStorage.getItem("SecretKey")){
			checkStr=checkStr+"&param.secretKey="+localStorage.getItem("SecretKey")
		}
		checkStr=checkStr+`&_=${(new Date()).getTime()}`
		return checkStr
	})()
	return fetch(ApiHost+url.replace(/^\//ig,"").replace(/\/$/ig,"")+"/"+dataString,{
		method:"GET",
	})
	.catch((error)=>{
		//fetch请求自身出了问题
		throw "请检查fetch请求"
	})
	.then((response)=>{
		return response.json()
	})
	.catch((error)=>{
		//请求成功但接口报错
		console.log(`错误接口:${url}`);
		throw "抱歉,服务器开小差了"
	})
	.then((result)=>{
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
	})
}

export default {
	post:postFetch,
	get:getFetch
}
