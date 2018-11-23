import $ from "jquery"
import {createInterFace,setLocalValue} from "./InterFace.Identity.API.js"


const post=function(args){
	return new Promise((resolve,reject)=>{
		$.ajax({
				url:args["url"],
				type:"POST",
				cache:false,
				data:createInterFace(args["data"]),
				dataType:"json",
				success:function(result,status,xhr){
					//console.log(result);
					try{
						if(result.msg=="success"){
							resolve(JSON.parse(result.result))
						}else{
							reject({tip:"服务器错误",error:result})
						}						
					}catch(error){
						console.log(`错误接口=>${args["url"]}`);
						console.log(error);
					}
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					reject({tip:"AJAX错误",error:errorThrown})
				},
		});			
	})
}

export default {post:post}