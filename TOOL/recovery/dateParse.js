const dateParse=function(dataStr){
	let nowDate=new Date()
	let date=dataStr
	if(!date){
		return {
			year:"",
			month:"",
			day:"",
			time:"",
			remark:"",
		}
	}
	let year,month,day,time="";
	if(date.split("T").length>=2){
		year=Number(date.split("T")[0].split("-")[0])
		month=Number(date.split("T")[0].split("-")[1])
		day=Number(date.split("T")[0].split("-")[2])
		time=date.split("T")[1].replace(/.{3}$/ig,"");		
	}else{
		year=Number(date.split(" ")[0].split("-")[0])
		month=Number(date.split(" ")[0].split("-")[1])
		day=Number(date.split(" ")[0].split("-")[2])
		time=date.split(" ")[1].replace(/.{3}$/ig,"");	
	}
	return {
		year:year,
		month:month,
		day:day,
		time:time,
		remark:(()=>{
			if(nowDate.getFullYear()<year){
				return `${year}-${month}-${day}`
			}
			if(nowDate.getMonth()+1<month){
				return `${year}-${month}-${day}`
			}
			if(nowDate.getDate()==day){
				return `今天 ${time}`
			}else{
				if(nowDate.getDate()-1==day){
					return `昨天 ${time}`
				}else if(nowDate.getDate()-2==day){
					return `前天 ${time}`
				}
				else{
					let week=["星期一","星期二","星期三","星期四","星期五","星期六","星期天"]
					return week[(new Date(dataStr)).getDay()]
				}					
			}
		})()
	}	
}

export default dateParse