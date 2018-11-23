import {Picker} from "antd-mobile"
import RegionArrayToTextArray from "../RELY_API/RegionArrayToTextArray.js"//地区码转地区字符串
import TextArrayToRegionArray from "../RELY_API/TextArrayToRegionArray.js"//地区字符串转地区码
import district from "../RELY_API/RegionList.js"


const CustomChildren=(props)=>{
  	return (
  	<div onClick={props.onClick}>
	    <div>{props.children}</div>
	    <div>{props.extra}</div>
  	</div>
)};


class SelectRegion extends React.Component {
	render(){
		return (
        <Picker 
        	data={district}
        	title={this.props.placeholder}
        	extra={this.props.placeholder}
        	value={this.state.value}
          	onOk={this.handleOk}
        >
          	<CustomChildren></CustomChildren>
        </Picker>					
	)}
	constructor(props){
	  	super(props);
	  	this.state={value:null};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
	  	const {Province,City,Area}=nextProps;
	  	if(!Province){return false}//数组第一个元素不存在的情况下就不要有后面的逻辑了
	  	//console.log(TextArrayToRegionArray([Province,City,Area]));
	  	nextState.value=TextArrayToRegionArray([Province,City,Area]);
	}
	handleOk=(DistrictArray)=>{
		const {keyname}=this.props;
		this.setState({value:DistrictArray});
		const textArray=RegionArrayToTextArray(DistrictArray)
		this.props.onChange({keyname:keyname,keyvalue:textArray})
	};
	static defaultProps={
		onChange:(json)=>{console.log(json)},
		placeholder:"请选择所在地区"
	};
	static propTypes={
		Province:PropTypes.string,
		City:PropTypes.string,
		Area:PropTypes.string,
	  	keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	  	relation:PropTypes.oneOfType([PropTypes.array,PropTypes.object])
	};
}
export default SelectRegion