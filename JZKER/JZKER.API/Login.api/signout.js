import {createHashHistory} from "history"
const history=createHashHistory()

export default function signout(){
	window.parent.postMessage({eventName:"signout",data:{}},"*")
	window.localStorage.clear()
	history.replace("/")
	window.location.reload()
}