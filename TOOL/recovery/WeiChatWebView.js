/*
	-重要结论
	原生端和js端的方法是相反的
	当原生端使用registerHandler注册事件后,js端需要使用callHandler来调用方法
	当js端使用registerHandler注册事件后,原生端需要使用callHandler来注册方法
	ios和Android初始化webview的方式不同
*/


class WeiChatWebView {
	constructor(){
		this._ua=window.navigator.userAgent.toLowerCase()
	}
	get isWebView(){
		//console.log(ua);
		if(this._ua.match("com.jzker.weiliao.android")){
			return true
		}
		if(this._ua.match("com.jzker.weiliao.ios")){
			return true
		}
		return false
	}
	get isIOS(){
		if(this._ua.match("com.jzker.weiliao.ios")){
			return true
		}else{
			return false
		}
	}
	get isAndroid(){
		if(this._ua.match("com.jzker.weiliao.android")){
			return true
		}else{
			return false
		}		
	}
	get WebViewType(){
		if(this._ua.match("com.jzker.weiliao.ios")){
			return "ios"
		}
		if(this._ua.match("com.jzker.weiliao.android")){
			return "android"
		}
		return "other"
	}
	ready=(AfterReadyFn)=>{
		if(!this.isWebView){window.onload=function(){AfterReadyFn()}}
		if(this.isAndroid){
			//webview为安卓的情况
		    if(window.WebViewJavascriptBridge){
	       		WeiChatWebView.initWebViewJavascriptBridge()
	       		AfterReadyFn(window.WebViewJavascriptBridge)
		    }else{
			    document.addEventListener("WebViewJavascriptBridgeReady",function(){
	       			WeiChatWebView.initWebViewJavascriptBridge()
	       			AfterReadyFn(window.WebViewJavascriptBridge)     
			    },false);
		    }			
		}
		if(this.isIOS){
			//webview为IOS的情况
	        if(window.WebViewJavascriptBridge){ 
	            AfterReadyFn(window.WebViewJavascriptBridge);
	            return false 
	        }
	        if(window.WVJBCallbacks){ 
	            window.WVJBCallbacks.push(AfterReadyFn);
	            return false 
	        }
	        //以上两者都不存在的情况下使用iframe
	        window.WVJBCallbacks=[AfterReadyFn];
	        const WVJBIframe=document.createElement("iframe");
	        WVJBIframe.style.display="none";
	        WVJBIframe.src="wvjbscheme://__BRIDGE_LOADED__";
	        document.documentElement.appendChild(WVJBIframe);
	        setTimeout(function(){document.documentElement.removeChild(WVJBIframe)},0)				
		}
	};
	on=(handleName,handleFunction)=>{
		if(!window.WebViewJavascriptBridge){return false}
		window.WebViewJavascriptBridge.registerHandler(handleName,(data,responseCallback)=>{
            handleFunction(data)
            if(responseCallback){responseCallback("数据交接完成")}
        });	
	};
	emit=(handleName,param,callback)=>{
		if(!window.WebViewJavascriptBridge){return false}
	    window.WebViewJavascriptBridge.callHandler(handleName,param,function(responseData){
	        if(callback){callback(responseData)}
	    });		
	};
	static initWebViewJavascriptBridge=function(){
        window.WebViewJavascriptBridge.init(function(message,responseCallback){
            if(responseCallback){responseCallback({"Javascript Responds":"测试中文!"})}
        });
        window.localStorage.clear() 		
	};
}


export default new WeiChatWebView()


