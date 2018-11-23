import {observable,action,flow,computed} from "mobx"

export default class UpLoadFileState {
	@observable DefaultImageArray=[];
	@action AppendDefaultImage(FilesArray){
		//有些图片已经上传完成了,需要以绝对路径进行显示
		Array.prototype.push.apply(this.DefaultImageArray,FilesArray);
	};
	//--<>--//
	@observable FILES=[];
	@action ReplaceFile(keyname,nextFile){
		const FindIndex=this.FILES.findIndex((element)=>{
			return element["keyname"]==keyname
		})	
		if(FindIndex==-1){
			return false
		}else{
			this.FILES.splice(FindIndex,1,nextFile)
		}
	}
	@action AppendFiles(FilesArray){
		//追加文件
		Array.prototype.push.apply(this.FILES,FilesArray);
	};
	@action RemoveFile(FileKeyname){
		//从数组中删除文件
		const FindIndex=this.FILES.findIndex((element)=>{
			return element["keyname"]==FileKeyname
		})
		if(FindIndex==-1){
			return false
		}else{
			this.FILES.splice(FindIndex,1)
		}
	};
	//--<>--//
	@computed get RecoveryArray(){
		//临时路径回收队列
		return this.FILES.map((fileOBJ)=>{
			return fileOBJ[""]
		})
	}
	@computed get hasFile(){
		return this.FILES.length>0
	}
	upLoad(path){
		//执行上传
		const formData=new FormData();
		formData.append("path", path || `ProductImage/plantFrom${1}/${999}`)
		this.FILES.map((fileOBJ,index)=>{
			formData.append(`file${index}`,fileOBJ["file"])
		})
		return fetch("http://106.14.115.8:8008/api/Oss/Upload2",{
			method:"POST",
			body:formData
		}).then((response)=>{
			return response.json()
		}).then((result)=>{
			//上传成功后回收临时路径队列
			this.RecoveryArray.map((TempPath)=>{
				window.URL.revokeObjectURL(TempPath)
			})
			return result["Result"].map((ResultFile)=>{
				return ResultFile["fileName"]
			})
		}).catch((error)=>{
			throw error
		})		
	}
}