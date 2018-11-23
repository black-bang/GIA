const path=require("path")

module.exports={
	modules:[
		__dirname+"/build/",
		"node_modules",
	],	
	alias:{
		//模块/路径别名,配置此项可以精确的告知webpack对应的模块/路径是什么
		api: path.resolve(__dirname, "../JZKER/JZKER.API/publicApiEntry.js")
	},
}