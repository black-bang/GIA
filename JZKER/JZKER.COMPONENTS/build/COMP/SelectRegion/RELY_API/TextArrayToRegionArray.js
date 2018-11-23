import district from "./RegionList.js"


/*
	直辖市
	北京,上海,天津,重庆,海外
*/

class _TextArrayToRegionArray {
	constructor(TextArray){
		this.ProvinceName=TextArray[0];
		this.CityName=TextArray[1];
		this.AreaName=TextArray[2];	
		if(this.ProvinceName.match(/(北京|上海|天津|重庆|海外)/ig)){
			this.CityName=TextArray[0]
		}		
	}
	get ProvinceRange(){
		//锁定省
		const findOBJ=district.find((ProvinceOBJ)=>{
			if(ProvinceOBJ.label.match(this.ProvinceName)){
				return true 
			}else{
				return false
			}
		})			
		return findOBJ||{value:"",label:"",children:[]}
	}
	get CityRange(){
		//锁定市
		const findOBJ=this.ProvinceRange.children.find((CityOBJ)=>{
			if(CityOBJ.label.match(this.CityName)){
				return true
			}else{
				return false
			}
		})	
		return findOBJ||{value:"",label:"",children:[]}
	}
	get AreaRange(){
		//锁定区
		return this.CityRange.children.find((AreaOBJ)=>{
			if(AreaOBJ.label.match(this.AreaName)){
				return true
			}else{
				return false
			}
		})
	}
	getIdArray(){
		return [
			this.ProvinceRange["value"],
			this.CityRange["value"],
			(this.AreaRange?this.AreaRange["value"]:null)
		]
	}
}

export default function TextArrayToRegionArray(RegionArray){
	return new _TextArrayToRegionArray(RegionArray).getIdArray()
}


