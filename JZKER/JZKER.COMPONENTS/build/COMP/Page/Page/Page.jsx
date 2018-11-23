import style from "./Page.scss"
import {PageTop,PageBottom,PageTopSplit} from "../Page.Other/PageOther.jsx" 

class Page extends React.PureComponent {
	render(){
		const Page=classnames(style["Page"],this.props.className)
		return (
		<div className={Page}>
			<div className={style["Page_Top"]}>
				{this.TopChild}
			</div>
			<div 
				//ref="PageMiddle" 
				className={style["Page_Middle"]}
			>
				{this.MiddleChild}
			</div>
			<div className={style["Page_Bottom"]}>
				{this.BottomChild}
			</div>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.PageMiddle=React.createRef();
	}
	//以下代码是为了解决ios键盘兼容性的问题
/*	stopContextMenu(e){
		e.preventDefault()
	}*/
	scroll=()=>{
		const PageMiddle=this.PageMiddle.current;
		document.body.scrollIntoView(false)
		if(PageMiddle){
			PageMiddle.scrollIntoView(false)
		}else{
			return false
		}
	};
	componentDidMount(){
		//document.addEventListener("contextmenu",this.stopContextMenu,true)
	  	window.addEventListener("resize",this.scroll,true)
	}
	componentWillUnmount(){
		window.removeEventListener("resize",this.scroll,true)
	}
	get TopChild(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(!child){return false};
			switch(child.type.componentName){
				case "TopBar":
					return child
				break;
				case "PageTop":
					return child
				break;
				case "PageTopSplit":
					return child
				break;
				default:
					return null
			}
		})	
	}
	get MiddleChild(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(!child){return false};
			switch(child.type.componentName){
				case "NavBar":
					return null
				break;
				case "TopBar":
					return null
				break;
				case "PageTop":
					return null
				break;
				case "PageBottom":
					return null
				break;		
				case "PageTopSplit":
					return null
				break;				
				default:
					return child
			}
		})		
	}
	get BottomChild(){
		return React.Children.map(this.props.children,(child,index)=>{
			if(!child){return false};
			switch(child.type.componentName){
				case "NavBar":
					return child
				break;
				case "PageBottom":
					return child
				break;
				default:
					return null
			}
		})	
	}
	static Top=PageTop;
	static Bottom=PageBottom;	
	static Split=PageTopSplit;
	static componentName="Page";
}


export default Page