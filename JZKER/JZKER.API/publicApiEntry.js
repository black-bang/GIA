//当组件在iframe中的时候使用这个装饰器
import withFrame from "./iframe.api/withFrame.js"
export {withFrame}

//当组件内部包含iframe的时候使用这个装饰器
import includeFrame from "./iframe.api/includeFrame.js"
export {includeFrame}

//操作storage的Api
import storage from "./storage.api/storage.js"
export {storage}

//方便调试的登录
import WithLogin from "./LoginComponent/WithLogin.jsx"
export {WithLogin}

//webview相关的Api
import webview from "./WebView.api/WeiChatWebView.js"
export {webview}

//基于webviewApi的高阶方法兼容webview和浏览器渲染
import StartToRedner from "./WebView.api/StartToRedner.js"
export {StartToRedner}

//针对金钻客接口封装的fetch请求
import ajax from "./fetch.api/fetchFunction.js"
export {ajax}


import signout from "./Login.api/signout.js"
export {signout}