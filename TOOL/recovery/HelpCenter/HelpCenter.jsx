import FramePage from "publicComponent/Page/FramePage/FramePage.jsx"
import {observer,inject} from "mobx-react"
import {includeFrame} from "api"

@includeFrame
class HelpCenter extends React.PureComponent {
	render(){
		return (
		<FramePage name="HelpCenter" src="http://submodel.jzker.cn/HelpCenter"/>
	)}
	constructor(props){
	  	super(props);
	  	this.RootStore=this.props.RootStore;
	  	this.unlisten=null
	}
	componentDidMount(){
		//显示二维码的逻辑
	}
	componentWillUnmount(){
		
	}
}
export default HelpCenter