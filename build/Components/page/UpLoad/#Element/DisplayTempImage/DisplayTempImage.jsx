import css from "./DisplayTempImage.module.scss"
import {Icon as AntdIcon} from "antd-mobile"


export default class DisplayTempImage extends React.Component {
	render(){
		return (
		<div className={css.DisplayTempImageWrap}>
			<div className={css.DisplayTempImage} style={{backgroundImage:`url(${this.props.TempPath})`}}>
				{this.RenderDeleteButton}
				<div className={css.ReplaceButton}>
					<div>{"替换"}</div>
					<form ref="formElement">
						<input type="file" accept="image/*" className={css.FileElement} onChange={this.handleReplace}/>
					</form>			
				</div>
			</div>				
		</div>
	)}
	get RenderDeleteButton(){
		if(this.props.canDelete){
			return (
			<div className={css.DeleteButton} onClick={this.handleClick}>
				<AntdIcon type="cross" size="xs"/>
			</div>
		)}else{
			return null
		}
	}
	handleReplace=(e)=>{
		const {formElement}=this.refs
		const file=e.target.files[0];
		if(!file){return false}
		this.props.onReplace({
			prevPath:this.props.TempPath,
			nextFile:{keyname:window.URL.createObjectURL(file),file:file}
		})
		formElement.reset()
	};
	handleClick=()=>{
		this.props.onDelete(this.props.TempPath)
	};
	static defaultProps={
		canDelete:true,
	  	onDelete:()=>{},
	  	onReplace:()=>{},
	};
	static propTypes={
	  	TempPath:PropTypes.string
	};
}