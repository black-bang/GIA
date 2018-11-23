import getLocalInfo from "./getLocalInfo"

class storage {
	get isLogin(){
		if(getLocalInfo()["Type"]){
			return true
		}else{
			return false
		}
	}
	get loginInfo(){
		return JSON.parse(window.localStorage.getItem("userInfo"))
	}
	get isMockLogin(){
		if(!this.loginInfo){
			return false
		}
		if(this.loginInfo.LoginType==2){
			return true
		}else{
			return false
		}
	}
	get originUserInfo(){
		return JSON.parse(window.localStorage.getItem("originUser"))
	}
	saveLoginInfo=(result)=>{
		switch(result.LoginType){	
			case 1:
				//切换门店
				window.localStorage.setItem("PlantFrom",result["PlantFrom"])
				window.localStorage.setItem("SecretID",result["SecretID"])
				window.localStorage.setItem("SecretKey",result["SecretKey"])
				window.localStorage.setItem("userInfo",JSON.stringify(result))				
			break;				
			case 2:
				//伪登录模式
				window.localStorage.setItem("PlantFrom",result["PlantFrom"])
				window.localStorage.setItem("SecretID",result["SecretID"])
				window.localStorage.setItem("SecretKey",result["SecretKey"])
				window.localStorage.setItem("originUser",JSON.stringify(this.loginInfo))
				window.localStorage.setItem("userInfo",JSON.stringify(result))			
			break;
			default :
				//0和3的情况
				window.localStorage.setItem("PlantFrom",result["PlantFrom"])
				window.localStorage.setItem("SecretID",result["SecretID"])
				window.localStorage.setItem("SecretKey",result["SecretKey"])
				window.localStorage.setItem("userInfo",JSON.stringify(result))			
		}
	};
	signoutMockLogin=()=>{
		window.localStorage.setItem("PlantFrom",this.originUserInfo["PlantFrom"])
		window.localStorage.setItem("SecretID",this.originUserInfo["SecretID"])
		window.localStorage.setItem("SecretKey",this.originUserInfo["SecretKey"])
		window.localStorage.setItem("userInfo",JSON.stringify(this.originUserInfo))
		window.localStorage.removeItem("originUser")
	};
	setUserInfo=(keyname,keyvalue)=>{
		const nextUserInfo=getLocalInfo();
		switch(keyname){
			case "PlantFrom":
				window.localStorage.setItem("PlantFrom",keyvalue)
				nextUserInfo["PlantFrom"]=keyvalue
			break;
			case "SecretID":
				window.localStorage.setItem("SecretID",keyvalue)
				nextUserInfo["SecretID"]=keyvalue				
			break;
			case "SecretKey":
				window.localStorage.setItem("SecretKey",keyvalue)
				nextUserInfo["SecretKey"]=keyvalue				
			break;
			case "companyName":
				window.localStorage.setItem("companyName",keyvalue)
			break;
			default :
				if(Object.keys(nextUserInfo).includes(keyname)){
					nextUserInfo[keyname]=keyvalue
				}			
		}
		window.localStorage.setItem("userInfo",JSON.stringify(nextUserInfo))
	};
}

export default new storage()