import "STYLE/initStyle.scss"
import ReactDOM from "react-dom"
import Photo from "COMP/Photo/Photo/Photo.jsx"
import Icon from "COMP/Icon/Icon/Icon.jsx"
import icons from "./IMAGE/IconCss/UserCenterIcon.css"
import FlowInput from "./COMP/FlowInput/index.js"
import Lable from "./COMP/Lable/index.js"
import OnOffSwitch from "./COMP/OnOffSwitch/index.js"
import SwipeCard from "./COMP/SwipeCard/index.js"
import TabSwitch from "./COMP/TabSwitch/index.js"
import Page from "./COMP/Page/index.js"
import TopBar from "./COMP/TopBar/index.js"

const target=document.getElementById("AppView");
ReactDOM.render(
	<Page>
		<TopBar>
			<TopBar.Middle>
				<TabSwitch>
					<TabSwitch.ButtonItem keyname={1}>
						{"选项1"}
					</TabSwitch.ButtonItem>
					<TabSwitch.ButtonItem keyname={2}>
						{"选项2"}
					</TabSwitch.ButtonItem>
				</TabSwitch>
			</TopBar.Middle>
		</TopBar>
		<Page.Top>
			{56545645}
		</Page.Top>
		<Photo src={"http://up.qqjia.com/z/19/tu21240_13.jpg"}/>
		<Icon icon={icons["Help"]}></Icon>
	</Page>
,target)	




