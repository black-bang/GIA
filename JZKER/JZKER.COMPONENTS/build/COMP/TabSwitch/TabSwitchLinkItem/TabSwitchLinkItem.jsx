import style from "./TabSwitchLinkItem.scss"
import {NavLink} from "react-router-dom"

const TabSwitchLinkItem=function(props){
	const TabSwitchLinkItemClass=classnames({
		[style["TabSwitchLinkItem"]]:true
	},props.className)
	return (
	<NavLink to={props.to} className={TabSwitchLinkItemClass}>
		{props.children}
	</NavLink>
)}

export default TabSwitchLinkItem