import style from "./FloatPage.scss"

const FloatPage=function(props){
	return (
	<div className={style["FloatPage"]}>
		{props.children}
	</div>
)}

export default FloatPage