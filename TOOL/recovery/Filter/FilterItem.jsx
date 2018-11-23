import "./FilterItem.scss"

class FilterItem extends React.Component {
	render(){
		const FilterItemClass=classnames({
			"FilterItem":true,
			"FilterItem-active":this.state.active
		})
		return (
		<div className={FilterItemClass} onClick={this.handleClick}>
			{this.props.children}
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={active:false};
	}
	componentDidMount(){
		this.forceUpdate()
	}
	componentWillUpdate(nextProps,nextState,nextContext){
	  	const {group}=nextContext;
	  	const findIndex=group.findIndex((element)=>{
			return element["keyname"]==nextProps.keyname
	  	})
	  	if(findIndex==-1){
			nextState.active=false
	  	}else{
			nextState.active=true
	  	}
	}
	handleClick=(e)=>{
		e.stopPropagation()
		const {pushAction}=this.context
		pushAction({keyname:this.props.keyname,value:this.props.value})
	};	
	static contextTypes={
		group:PropTypes.array,
		pushAction:PropTypes.func,		
	};
	static propTypes={
		keyname:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
		value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	}
}
export default FilterItem