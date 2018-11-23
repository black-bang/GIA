import style from "./SelectDate.scss"
import {DatePicker} from "antd-mobile";
import DateFormat from "date-format"


const DateDisplay=({extra,onClick,children})=>{
	return (
	<div className={style["DateDisplay"]} onClick={onClick}>
		<div className={style["extra"]}>{extra}</div>
	</div>
)}

class SelectDate extends React.Component {
	render(){
		return (
		<div className={style["SelectDate"]}>
			<DatePicker
	          	mode={this.props.type}
	          	format={this.format.component}
	          	title={this.props.placeholder}
	          	minDate={this.props.type=="time"?null:this.props.minDate}
	          	maxDate={this.props.type=="time"?null:this.props.maxDate}
	          	value={this.state.date}
	          	onChange={this.handleChange}
	          	extra={this.props.placeholder}
			>
				<DateDisplay></DateDisplay>
			</DatePicker>
		</div>				
	)}
	constructor(props){
	  	super(props);
	  	this.state={date:null};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	get format(){
		if(this.props.type=="date"){
			return {
				component:"YYYY-MM-DD",
				dateformat:"yyyy-MM-dd"
			}
		}
		if(this.props.type=="datetime"){
			return {
				component:"YYYY-MM-DD HH:mm",
				dateformat:"yyyy-MM-dd hh:mm"
			}
		}
		if(this.props.type=="time"){
			return {
				component:"HH:mm",
				dateformat:"hh:mm"				
			}
		}
	}
	componentWillUpdate(nextProps,nextState){
		if(!nextProps.relation){
			nextState.date=null
			return false
		}
		// if(nextProps.relation==""){return false}
		// if(nextProps.relation==undefined){return false}
		// if(nextProps.relation==null){return false}
		if(nextProps.type=="time"){
			nextState.date=moment(`1997-04-12 ${nextProps.relation}`).toDate()
		}else{
			nextState.date=moment(nextProps.relation).toDate()
		}
	}
	handleChange=(dateValue)=>{
		//console.log(dateValue);
		this.setState({date:dateValue})
		this.props.onChange({
			keyname:this.props.keyname,
			keyvalue:DateFormat.asString(this.format.dateformat,dateValue)
		})
	};
	static propTypes={
		type:PropTypes.oneOf(["date","time","datetime","year","month"]),
		keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
		relation:PropTypes.string,
		placeholder:PropTypes.string,
		onChange:PropTypes.func,
	};
	static defaultProps={
		type:"date",
		placeholder:"请选择日期",
	  	onChange:()=>{},
	  	minDate:moment("1930-01-01").toDate(),
	  	maxDate:moment("2020-12-31").toDate(),
	};
}
export default SelectDate