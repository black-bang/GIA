import css from "./UpLoadFile.module.scss"
import AddFileButton from "../#Element/AddFileButton/AddFileButton.jsx"
import DisplayTempImage from "../#Element/DisplayTempImage/DisplayTempImage.jsx"
import UpLoadFileState from "./UpLoadFile.mobx.js"
import {observer} from "mobx-react"


@observer class UpLoadFile extends React.Component {
	render(){
		return (
		<div className={css.UpLoadFile}>
			{this.RenderDefaultImage}
			{this.store.FILES.map((fileOBJ,index)=>{
				return (
				<DisplayTempImage 
					key={index} 
					TempPath={fileOBJ["keyname"]} 
					onDelete={this.handleDelete}
					onReplace={this.handleReplace}
				/>)
			})}
			{this.RenderAddButton}
		</div>			
	)}
	constructor(props){
	  	super(props);
	  	this.store=this.props.store
	}
	get RenderDefaultImage(){
		if(this.store.FILES.length){
			return null
		}else{
			return this.store.DefaultImageArray.map((FilePath,index)=>{
				return (
				<DisplayTempImage 
					key={index} 
					canDelete={false}
					TempPath={FilePath} 
					onReplace={this.handleReplaceDefaultImage}
				/>)
			})			
		}
	}
	get RenderAddButton(){
		if(this.store.FILES.length>=this.props.MaxFile){
			return null
		}else{
			return <AddFileButton onChange={this.handleAppend}/>
		}
	}
	handleDelete=(TempPath)=>{
		this.store.RemoveFile(TempPath)
		window.URL.revokeObjectURL(TempPath)
	};
	handleAppend=(e)=>{
		const files=Array.from(e.target.files);
		const formatFiles=files.map((file,index)=>{
			const keyname=window.URL.createObjectURL(file)
			return {keyname:keyname,file:file}
		})
		this.store.AppendFiles(formatFiles)
	};
	handleReplace=(ReplaceOBJ)=>{
		const {prevPath,nextFile}=ReplaceOBJ;
		this.store.ReplaceFile(prevPath,nextFile)
		window.URL.revokeObjectURL(prevPath)
	};
	handleReplaceDefaultImage=(ReplaceOBJ)=>{
		//在初始图片上点击替换按钮
		const {prevPath,nextFile}=ReplaceOBJ;
		this.store.AppendFiles([nextFile])		
	};
	static propTypes={
		MaxFile:PropTypes.number,
	  	relation:PropTypes.object,
	  	UpLoadTeam:PropTypes.object,
	};
	static defaultProps={
	  	MaxFile:1
	};
	static MC=UpLoadFileState;
}

export default UpLoadFile