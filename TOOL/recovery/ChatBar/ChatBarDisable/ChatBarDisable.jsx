import "./ChatBarDisable.scss"
import Button from "publicComponent/Button/Button.jsx"

const ChatBarDisableDisable=function(props){
	return (
	<div className="ChatBarDisable">
		<div className="ChatBarDisable_top">
			<div className="ChatBarDisable_top_middle">
				<div className="ChatBarDisable_input">
					{props.text}
				</div> 
			</div>
			<div className="ChatBarDisable_top_right">
				<Button 
					active={false}
					style={{height:"24px",borderRadius:"30px"}} 
					text="发送"
				/>
			</div>
		</div>		
	</div>
)}

export default ChatBarDisableDisable