import {
	pollfilyApiHost,
	pollfilyJSONURL,
	createParma,
	createVarify,
	resultPipe
} from "./config.js"


export default function postFetch(json){
	const requestURL=`
		${pollfilyApiHost}/
		${pollfilyJSONURL(json["url"])}/
		?${createParma(json["data"])}
		${createVarify(json["varify"])}&${(new Date()).getTime()}
	`
	return fetch(requestURL,{method:"POST"})
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
		if(process.env.NODE_ENV=="development"){
			throw "抱歉,服务器开小差了"
		}else{
			throw {error:"抱歉,服务器开小差了"}
		}		
	})
	.then(resultPipe)	
}