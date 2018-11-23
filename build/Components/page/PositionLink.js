//在百度地图上显示位置的API
//相关文献请参考http://lbsyun.baidu.com/index.php?title=uri/api/web
class createPositionLink {
	constructor(string,content){
		console.log(string)
		this.BMAP_HOST="http://api.map.baidu.com/marker?";
		this.OUTPUT="html";
		this.SRC="webapp.baidu.openAPIdemo";
		// this.positionMessage=positionString.split("@@");
		this.positionMessage = string
		this.posX=this.positionMessage[0];
		this.posY=this.positionMessage[1];
		this.title=this.positionMessage[2];
		this.content=content||this.title;				
	}
	get link(){
		return `${this.BMAP_HOST}location=${this.posX},${this.posY}&title=${this.title}&content=${this.content}&output=${this.OUTPUT}&src=${this.SRC}`
	}

}

const PositionLink=function(string,content){
	return new createPositionLink(string,content)
}

export default PositionLink