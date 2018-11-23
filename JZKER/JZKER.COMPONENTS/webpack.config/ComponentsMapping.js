//用于匹配多组件的方法

const path=require("path");
const glob=require(require.resolve("glob"));

const reg=path.resolve(__dirname,"../build/COMP/**/*.js")
const PathArrays=glob.sync(reg)
const EntryFormat=new Object();
PathArrays.map((pathString)=>{
	const DirArray=path.parse(pathString).dir.split("/")
	const ComponentName=DirArray[DirArray.length-1]
	EntryFormat[ComponentName]=pathString	
})



exports.Mapping=EntryFormat

/*
	最终将输出类似于以下的内容,为webpack提供多入口映射
	{
		List:"G:/会员中心/JZKER.COMPONENT/build/COMP/List/index.js",
		Page:"G:/会员中心/JZKER.COMPONENT/build/COMP/Page/index.js"
	}
*/


