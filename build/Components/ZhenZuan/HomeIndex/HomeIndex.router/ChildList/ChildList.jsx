import "./ChildList.scss";
import ChildListItem from "../ChildListItem/ChildListItem.jsx";

class ChildList extends React.Component {
  render() {
    return (
    <div>
        <span></span>
        {this.props.data.map((ListItem,index)=>{
                return (             
                  <ChildListItem
                    {...ListItem}
                    key={index}
                    activeArray={this.props.value}
                    onClick={this.handleClick}
                  />
                )
        })}
    </div>);
  }
  handleClick = (SelectOBJ)=>{
        this.props.onChange(SelectOBJ)
  }
}
export default ChildList;
