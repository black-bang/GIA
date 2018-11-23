//开发环境配置,快捷启动命令npm run dev
const path=require("path");
const webpack=require(require.resolve("webpack"));
const HtmlWebpackPlugin=require(require.resolve("html-webpack-plugin"));
const ExtractTextPlugin=require(require.resolve("extract-text-webpack-plugin"));
const OpenBrowserPlugin=require(require.resolve("open-browser-webpack-plugin"))

const PublicEntry=require("./PublicEntry.js")
const PublicModule=require("./PublicModule.js")
const PublicResolve=require("./PublicResolve.js")
const EasyConfig=require("../EasyConfig.js")

module.exports={
	entry:{
		TestEntry:PublicEntry.TestEntry,
	},
	output:{
		path:"/",
		publicPath:"/",
		filename:"[name].js",
	},
	devtool:"source-map",
    devServer:{
        inline:true,
        host:"0.0.0.0",
        publicPath:"/",
        contentBase:"./",
        watchContentBase:true,
        historyApiFallback:true,
        port:EasyConfig.devPort,
    },
	module:PublicModule,
	plugins:[
		new OpenBrowserPlugin({
			url:`http://localhost:${EasyConfig.devPort}`
		}),
		new ExtractTextPlugin({
			filename:"[name].css",
		}),
		/*以下是提取公共模块的插件*/
		new webpack.ProvidePlugin(PublicEntry.ProvideNames),
		/*全局变量*/
		new webpack.DefinePlugin({
		   	"process.env":{NODE_ENV:'"development"'}
		}),
		/*html模板*/
		new HtmlWebpackPlugin({
			filename:"index.html",
			template:path.resolve(__dirname,"./template.html"),
			cache:false,
		})
	],
	//定义路径别名
	resolve:{
		modules:PublicResolve.modules.concat(EasyConfig.modules),
		alias:Object.assign({},PublicResolve.alias,EasyConfig.alias)
	}
}


