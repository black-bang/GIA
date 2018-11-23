import css from "./AddFileButton.module.scss"


export default class AddFileButton extends React.Component {
	render(){
		return (
		<div className={css.AddFileButtonWrap}>
			<div className={css.AddFileButton}>
				<span className={css.Plus}>{"+"}</span>
				<form ref="formElement">
					<input type="file" accept="image/*" className={css.FileElement} onChange={this.handleChange}/>
				</form>
			</div>			
		</div>		
	)}
	handleChange=(e)=>{
		const {formElement}=this.refs;
		this.props.onChange(e);
		formElement.reset();
	};
	static defaultProps={
	 	onChange:()=>{}
	}
}