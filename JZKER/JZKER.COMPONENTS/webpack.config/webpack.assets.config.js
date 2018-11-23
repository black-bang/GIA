//生产环境配置,快捷启动命令npm run assets
const path=require("path");
const webpack=require(require.resolve("webpack"));
const ExtractTextPlugin=require(require.resolve("extract-text-webpack-plugin"));

const PublicEntry=require("./PublicEntry.js")
const PublicModule=require("./PublicModule.js")
const PublicResolve=require("./PublicResolve.js")
const EasyConfig=require("../EasyConfig.js")
const EntryFormat=require("./ComponentsMapping.js")


module.exports={
	entry:EntryFormat.Mapping,
	output:{
		path:path.resolve(__dirname,"../lib/"),
		filename:"./[name]/index.js",
	    libraryTarget:"umd",
	},
	module:PublicModule,
	plugins:[
		new ExtractTextPlugin({
			filename:"./[name]/style.css",
		}),
		/*以下是提取公共模块的插件*/
		//new webpack.ProvidePlugin(PublicEntry.ProvideNames),
		/*全局变量*/
		new webpack.DefinePlugin({
		   	"process.env":{NODE_ENV:'"production"'}
		}),
	],
	resolve:{
		modules:PublicResolve.modules.concat(EasyConfig.modules),
		alias:Object.assign({},PublicResolve.alias,EasyConfig.alias)
	}
}


