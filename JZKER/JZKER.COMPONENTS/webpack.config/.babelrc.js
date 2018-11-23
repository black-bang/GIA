const path=require("path")

//自定组件库和antd-mobile的组件库
const importPluginArray=[{
    "libraryName":"antd-mobile",
    "style":"css"
}]

module.exports={
    "presets":["es2015","stage-1","react"],
    "plugins":[
        "transform-decorators-legacy",
        ["import",importPluginArray]
    ]
}

