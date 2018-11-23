import "./LoginLogCard.scss"
//import NumberFormat from "react-number-format"

const LoginLogCard=function(props){
	const {Id,Mobile,Name,Success,Templet}=props
	return (
	<div className="LoginLogCard">
		<div className="Primary">
			<div className="Area">
				{"上海"}
			</div>
			<div className="IP">{"IP"}</div>
			<div className="Time">{"Time"}</div>
		</div>
		<div className="MessageTip">
			{Templet}
		</div>
	</div>
)}

export default LoginLogCard