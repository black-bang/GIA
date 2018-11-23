//测试环境配置,快捷启动命令npm run test
const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");

const PublicEntry=require("./PublicEntry.js")
const PublicModule=require("./PublicModule.js")
const PublicResolve=require("./PublicResolve.js")
const EasyConfig=require("../EasyConfig.js")


module.exports={
	entry:{
		"public":PublicEntry.EntryArray,
		"bundle":"./build/entry.js",
	},
	output:{
		path:path.resolve(__dirname,"../TOOL/TestServer/test"),
		filename:"[name].js",
	},
	devtool:"source-map",
	module:PublicModule,
	plugins:[
		new ExtractTextPlugin({
			filename:"./[name].css",
		}),
		/*以下是提取公共模块的插件*/
		new webpack.ProvidePlugin(PublicEntry.ProvideNames),
		/*全局变量*/
		new webpack.DefinePlugin({
			"hostname":JSON.stringify(EasyConfig.interfaceHost.test),
		   	"process.env":{NODE_ENV:'"production"'},
		}),
		/*打包公共文件*/
		new webpack.optimize.CommonsChunkPlugin({
			name:"public",
			filename:"./public.js",
		}),
		/*html模板*/
		new HtmlWebpackPlugin({
			filename:"./index.html",
			template:path.resolve(__dirname,"./template.html"),
			cache:false
		})
	],
	resolve:{
		modules:PublicResolve.modules.concat(EasyConfig.modules),
		alias:Object.assign({},PublicResolve.alias,EasyConfig.alias)
	}
}


