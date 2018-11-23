const getLocalInfo=function(){
	return JSON.parse(window.localStorage.getItem("userInfo"))||{}
}

export default getLocalInfo