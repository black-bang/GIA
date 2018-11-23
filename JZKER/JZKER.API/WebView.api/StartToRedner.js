import webview from "./WeiChatWebView.js"
import storage from "../storage.api/storage.js"

//高阶方法兼容webview和浏览器渲染
export default function StartToRedner(renderFunction){
	webview.ready(function(){
		//这段话是兼容webview的
		if(webview.isWebView){
			webview.on("functionInJs",(data)=>{
				storage.saveLoginInfo(JSON.parse(data))
				renderFunction()
	        })
		}else{
			renderFunction()
		}
	})	
}