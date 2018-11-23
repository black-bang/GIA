import {flow} from "mobx"
import getLocalInfo from "getLocalInfo"


export default {
	formatTime:function(chatHistoryArray){
		//对聊天记录的每一项时间进行处理,时差在5分钟之内的不显示时间标尺
		return chatHistoryArray.map((element,index)=>{
			if(index==0){return element}
			let prevTime=moment(chatHistoryArray[index-1]["CreateTime"]).unix()
			let nowTime=moment(element["CreateTime"]).unix()
			if(nowTime-prevTime<300){
				element["DateText"]=null
			}
			return element	
		})
	},
	upLoadImageToTest:async function(imageFile){
		//对上传文件的类型进行检查
		switch(imageFile.type){
			case "image/png":
				
			break;
			case "image/jpg":

			break;
			case "image/jpeg":

			break;
			case "image/bmp":

			break;
			case "image/gif":

			break;
			default:
				throw `不支持的文件类型${imageFile.type}`
		}
		//对上传文件的大小进行检查
		// if(imageFile.size>1024*1024*5){
		// 	throw "抱歉,上传的文件不能超过5M"
		// }
 		const fileRead=new FileReader()
		fileRead.readAsDataURL(imageFile)
		const formData=new FormData()
		try{		
			const resultRead=await new Promise((resolve,reject)=>{
				fileRead.onload=function(){
					resolve(fileRead.result)
				}
				fileRead.onerror=function(){
					reject("读取文件时发生错误")
				}	
			})	
			formData.append("file",resultRead)
			formData.append("path",`plantFrom${getLocalInfo()["PlantFrom"]}/${getLocalInfo()["Id"]}`)
			const result=await fetch("http://106.14.115.8:8008/api/Oss/Upload",{
				method:"POST",
				body:formData
			}).then((response)=>{
				return response.json()
			})	
			//const imagePath=`http://jzker.cn:3000/image${result["filePath"]}`
			return `${result["path"]}`
		}catch(error){
			throw "发送失败,请稍后重试"
		}
	}	
}
