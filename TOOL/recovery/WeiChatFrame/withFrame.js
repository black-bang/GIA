export default function withFrame(Component){
	let isFrame=false
	if(window.top!==window.self){
		isFrame=true
	}else{
		isFrame=false
	}
	//console.log("当前环境是否为iframe=>",isFrame);
	const frameApi={
		on:function(handleName,callback){
			//当在iframe中加载时监听外界的消息
			if(!isFrame){return false}
			const handle=function(e){
				if(e.data.eventName==handleName){
					callback(e.data.data)
				}else{
					return false
				}
			}
			window.addEventListener("message",handle)
			return function(){
				window.removeEventListener("message",handleFuction)
			}
		}
	}
	const parentWindowApi={
		emit:function(handleName,data){
			//当在iframe中加载时向外界发送消息
			if(!isFrame){return false}
			window.parent.postMessage({eventName:handleName,data:data},"*")
		},
	}
	return function(props){
		return (
		<Component {...props} isFrame={isFrame} self={frameApi} parentWindow={parentWindowApi}/>
	)}
}