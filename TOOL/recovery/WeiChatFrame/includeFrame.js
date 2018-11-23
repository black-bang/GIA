
export default function includeFrame(Component){
	const selfApi={
		on:function(handleName,callback){
			//当在iframe中加载时监听外界的消息
			const handle=function(e){
				if(e.data.eventName==handleName){
					callback(e.data.data)
				}else{
					return false
				}
			}
			window.addEventListener("message",handle)
			return function(){
				window.removeEventListener("message",handle)
			}
		}
	}
	const includeFrameApi={
		_target:null,
		target:function(targetFrame){
			this._target=targetFrame
		},
		emit:function(handleName,data,targetFrame){
			(targetFrame||this._target).contentWindow.postMessage({eventName:handleName,data:data},"*")
		}		
	}
	return function(props){
		return (
		<Component {...props} includeFrame={includeFrameApi} self={selfApi}/>
	)}
}