const path=require("path")


module.exports={
	devPort:8085,//本地开发服务器的端口号
	testPort:5004,//本地测试服务器的端口号
	modules:[
		//模块寻找地址,配置此项可以让webpack按照以下配置的文件夹顺序查找模块
		
	],	
	alias:{
		//模块/路径别名,配置此项可以精确的告知webpack对应的模块/路径是什么
		publicStyle:path.resolve(__dirname,"./build/STYLE/_public.scss"),
		STYLE:path.resolve(__dirname,"./build/STYLE/"),
		COMP:path.resolve(__dirname,"./build/COMP/")
	},	
}