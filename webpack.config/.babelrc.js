const path=require("path")

//自定组件库和antd-mobile的组件库
const importPluginArray=[{
    "libraryName":"antd-mobile",
    "style":"css"
},{
    "libraryName":"component",
    "camel2UnderlineComponentName":false,
    "camel2DashComponentName":false,
    "customName":(name)=>{
        //默认会指定到index.js文件
        return path.resolve(__dirname,`../JZKER/JZKER.COMPONENTS/lib/${name}`)
    },
    "style":(name)=>{
        //这里的name是上一个customName输出的路径名
        return `${name}/style.css`
    }    
}]

module.exports={
    "presets":["es2015","stage-1","react"],
    "plugins":[
        "transform-decorators-legacy",
        ["import",importPluginArray]
    ],
    "ignore":[path.resolve(__dirname,"../JZKER/JZKER.COMPONENTS/lib/**/*.js")]
}

