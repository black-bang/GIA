const path=require("path")
//项目常用的开源js模块
const publicArray=[
	"pubsub-js",
	"moment",
	"react",
	"prop-types",
	"mobx",
	"mobx-react",
	"classnames"
]

module.exports={
	publicArray:publicArray,
	TestEntry:Array.from(["babel-polyfill"]).concat(publicArray,[
		path.resolve(__dirname,"../build/entry.js")
	]),
	ProvideNames:{
		//公共模块的在全局的变量名
		React:"react",
		moment:"moment",
		PropTypes:"prop-types",
		classnames:"classnames",
		PubSub:"pubsub-js"
	}
}