import "./Filter.scss"
import PropTypes from "prop-types"
import FilterItem from "./FilterItem.jsx"

class Filter extends React.Component {
	render(){
		const FilterClass=classnames({
			"Filter":true
		})
		return (
		<div className={FilterClass}>
			{this.props.children}
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={
	  		group:[]//[{keyname:"",value:""}]
	  	};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState){
	  	if(this.relation==undefined){
	  		return false
	  	}
	  	if(this.relation==null){
	  		return false
	  	}
	  	nextState.group=nextProps.relation
	}
	getChildContext(){
		return {
			group:this.state.group,
			pushAction:(pushOBJ)=>{
				let newGroup=Array.from(this.state.group)
				const findIndex=newGroup.findIndex((element)=>{
					return element["keyname"]==pushOBJ["keyname"]
				})
				if(findIndex==-1){
					newGroup.push(pushOBJ)
				}else{
					newGroup.splice(findIndex,1)
				}
				this.setState({group:newGroup})
				if(this.props.onSwitch){
					this.props.onSwitch({group:newGroup})
				}
			}
		}
	}
	static childContextTypes={
		group:PropTypes.array,
		pushAction:PropTypes.func,
	};
	static propTypes={
		onSwitch:PropTypes.func,
/*	  	relation:PropTypes.shape([{
	  		keyname:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	  		value:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	  	}])*/
	};
	static Item=FilterItem;
}
export default Filter