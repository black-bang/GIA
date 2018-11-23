import district from "./RegionList.js"


class _RegionArrayToTextArray{
	constructor(RegionArray){
		this.ProvinceId=RegionArray[0];
		this.CityId=RegionArray[1];
		this.AreaId=RegionArray[2];		
	}
	get ProvinceArray(){
		//省的数组
		return district
	}
	get CityArray(){
		//市的数组
		let City=[]
		this.ProvinceArray.map((ProvinceOBJ,index)=>{
			ProvinceOBJ.children.map((CityOBJ,index)=>{
				City.push(CityOBJ)
			})
		})
		return City
	}
	get AreaArray(){
		//区的数组
		let Area=[];
		this.CityArray.map((CityOBJ,index)=>{
			if(CityOBJ.children){
				CityOBJ.children.map((AreaOBJ,index)=>{
					Area.push(AreaOBJ)
				})				
			}else{
				return false
			}
		})
		return Area
	}	
	getProvinceNameById(ProvinceId){
		//根据省的代号获取省的中文名称
		return (this.ProvinceArray.find((Province)=>{
			return Province.value==ProvinceId
		}))["label"]
	}
	getCityNameById(CityId){
		//根据城市编号获取城市名称
		return (this.CityArray.find((City)=>{
			return City.value==CityId
		}))["label"]		
	}
	getAreaNameById(AreaId){
		//根据地区Id获取地区名称
		const AreaOBJ=this.AreaArray.find((Area)=>{
			return Area.value==AreaId
		})
		if(AreaOBJ){
			return AreaOBJ["label"]
		}else{
			return null
		}
	}
	getTextArray(){
		return [
			this.getProvinceNameById(this.ProvinceId),
			this.getCityNameById(this.CityId),
			this.getAreaNameById(this.AreaId),
		] 
	}
}

export default function RegionArrayToTextArray(RegionArray){
	return (new _RegionArrayToTextArray(RegionArray)).getTextArray()
}

