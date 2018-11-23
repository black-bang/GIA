import "./ScrollView.scss"
import {observer} from "mobx-react"
import {Icon as AntdIcon} from "antd-mobile"
import Url from '../../../static/Order/completePic.png'

//console.log(process.env.NODE_ENV);

@observer class ScrollView extends React.Component {
	render(){
		const peddingTip=classnames({
			"loadingTip-pedding":true,
			"loadingTip-pedding-center":this.mobxStore.count==0
		})
		const completeTip=classnames({
			"loadingTip-complete":true,
			//获取成功但没有数据的情况下如果没有数据需要居中显示
			"loadingTip-complete-center":this.mobxStore.count==0
		})
		const failTip=classnames({
			"loadingTip-fail":true,
			//如果连总数都拿不到,算为严重错误
			"loadingTip-fail-center":this.mobxStore.count==0,
		})
		return (
		<div ref="outer" className="ScrollView" onScroll={this.handleScroll}>
			<div ref="inner" className="content">
				{this.props.children}
				{(()=>{
					switch(this.mobxStore.loadState.state) {
						case "PEDDING":
							return (
							<div className={peddingTip}>
								<AntdIcon type="loading" size="xs" color="#B3B3B3"/>
								<span>{this.mobxStore.loadState["message"]}</span>
							</div>)	
						break;
						case "COMPLETE":
							return (
							<div className={completeTip}>
									{/* <div><img src={Url} alt=""/></div> */}
								<span>{this.mobxStore.loadState["message"]}</span>
							</div>)
						break;
						case "FAIL":
							return (
							<div className={failTip}>
								{
									process.env.NODE_ENV=="development"?
									<span>{this.mobxStore.loadState["message"]}</span>:null
								}
							</div>)
					}
				})()}			
			</div>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.maxScroll=0;
	  	this.mobxStore=this.props.store
	}
	handleScroll=()=>{
		const {outer}=this.refs;
		//没有翻到最底部不执行翻页逻辑
		//console.log("outer=>",Math.round(outer.scrollTop));
		//console.log("maxScroll=>",Math.round(this.maxScroll));
		if(Math.round(outer.scrollTop)<Math.round(this.maxScroll)){
			return false
		};
		//只有当前状态为加载完成的时候才可以翻页
		if(this.mobxStore.loadState["state"]=="COMPLETE"){
			this.mobxStore.loadMoreData()
		}
	};
	componentWillUnmount(){
		if(this.props.cache){
			return false
		}else{
			this.props.store.clearAll()
		}
	}
	componentDidUpdate(prevProps,prevState){
		const {outer,inner,loading}=this.refs
		this.maxScroll=parseInt(inner.offsetHeight-outer.offsetHeight);		
	}
	static propTypes={
		//props中应该传递一个mobx状态机,一切翻页逻辑都交给mobx处理
		store:PropTypes.object
	};
	static defaultProps={
	  	cache:false
	} 
}


export default ScrollView

//需要在全局加一个Loading组件