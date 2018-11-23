import PropTypes from "prop-types"
import TabSwitchPrototype from "./ProtoType/TabSwitch.Prototype.jsx"
import SwitchItemDefault from "./SwitchItem.Default.jsx"

class TabSwitchMarquee extends TabSwitchPrototype {
	constructor(props){
	  	super(props);
	  	this.className="TabSwitchMarquee"
	}
}


TabSwitchMarquee.Item=SwitchItemDefault

export default TabSwitchMarquee