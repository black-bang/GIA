import style from "../TopBar/TopBar.scss"

class TopBarLeft extends React.PureComponent {
	render(){
		return (
		<div className={style["TopBar_Left_comp"]}>
			{this.props.children}
		</div>				
	)}
}
TopBarLeft.componentName="TopBarLeft"
export {TopBarLeft}

class TopBarMiddle extends React.PureComponent {
	render(){
		return (
		<div className={style["TopBar_Middle_comp"]}>
			{this.props.children}
		</div>				
	)}
}
TopBarMiddle.componentName="TopBarMiddle"
export {TopBarMiddle}

class TopBarRight extends React.PureComponent {
	render(){
		return (
		<div className={style["TopBar_Right_comp"]}>
			{this.props.children}
		</div>				
	)}
}
TopBarRight.componentName="TopBarRight"
export {TopBarRight}

class TopBarExtendTool extends React.PureComponent {
	render(){
		return (
		<div className={style["TopBarExtendTool"]}>
			{this.props.children}
		</div>
	)}
}
TopBarExtendTool.componentName="TopBarExtendTool"
export {TopBarExtendTool}

class TopBarBack extends React.PureComponent {
	render(){
		const Back=classnames({
			TopBarBack:true
		})		
		return (
	/*	if(props.to){
			return (
				<NavLink className={Back} to={props.to} >
					<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
				</NavLink>
			)		
		}else{
			return (
				<div className={Back} onClick={function(){
					history.goBack()
				}}>
					<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
				</div>		
			)
		}*/
		<div></div>				
	)}
}
//const TopBarBack=function(props){
	//const Back=classnames({
		//TopBarBack:true
	//})
/*	if(props.to){
		return (
			<NavLink className={Back} to={props.to} >
				<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
			</NavLink>
		)		
	}else{
		return (
			<div className={Back} onClick={function(){
				history.goBack()
			}}>
				<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
			</div>		
		)
	}*/
	//return <div></div>
//}
TopBarBack.componentName="TopBarBack"
export {TopBarBack}

