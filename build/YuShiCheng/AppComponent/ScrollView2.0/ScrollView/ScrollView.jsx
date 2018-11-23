import css from "./ScrollView.scss"

class ScrollView extends React.Component {
	render(){
		return (
		<div className={css.OuterContainer} onScroll={this.handleScroll}>
			{this.RenderList}
			
		</div>
	)}
	constructor(props){
	  	super(props);
	  	//this.state={data:[]};
	}
	handleScroll=(e)=>{
		const target=e.target;

	};
	get RenderList(){
		const DataSource=this.state.data
		DataSource.map((DataUnit,index)=>{
			return this.props.unit(DataUnit)
		})		
	}
	static propTypes={
	  	unit:PropTypes.func,//列表单元
	  	cache:PropTypes.bool,
	  	timeout:PropTypes.number,//首屏延时加载
	  	autoLoad:PropTypes.bool,//是否自动加载
	};
	static defaultProps={
	  	timeout:100,
		cache:false,
		autoLoad:false
	};
}
export default ScrollView

{/*
	<ScrollView
		controller={[object,mobx]}
		unit={(DataUnit)=>(<Component {...DataUnit}/>)}
	/>
*/}