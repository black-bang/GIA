import "./RemindCard.scss"
import NumberFormat from "react-number-format";

const RemindCard=function(props){
	const {Id,Mobile,Name,Success,Templet,DateText}=props
	const StatusClass=classnames({
		"Status":true,
		"Status-success":Success,
		"Status-pedding":!Success,
	})
	return (
	<div className="RemindCard">
		<div className="Primary">
			<div className="Mobile">
				{Mobile}
			</div>
			<div className="Name">{Name}</div>
			<div className={StatusClass}>{Success?"成功":"待发送"}</div>
		</div>
		<div className="MessageTip">
			{Templet}
		</div>
		<div className="Time">{DateText}</div>
	</div>			
)}

RemindCard.propTypes={
	Id:PropTypes.number,
	Mobile:PropTypes.string,
	Name:PropTypes.string,
	Success:PropTypes.bool,
	Templet:PropTypes.string,
	DateText:PropTypes.string,
}


export default RemindCard