
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import './ShopCardItemChild.Router.scss'
import { Icon } from "antd-mobile";
import Lookpic from "../../../../../../../static/Size_8.png";

class ShopCardChild extends React.Component {
    render() {
        const { active } = this.props
        return (
                <div className="CardListItem">
                <div className="ListBottom Justify">
                    <div className="ListBottomLeft">
                        <div className="CardBtn">
                            <span style={{
                                color: this.isActive ? "#fff":"#fff",
                                backgroundColor: this.isActive ? "#f66" : "#eee"
                            }}
                                onClick={this.handleClick}>
                                &#xe7fc;
                             </span>
                        </div>
                        <div className="ListBottomLeft_1">
                            <div className="Pic Center"><span><img src={Lookpic} alt="" /></span></div>
                            <div className="Location Center"><span>&#xe790;{'位置'}</span></div>
                            <div className="Time Center"><span>{'逾期时间'}</span></div>
                        </div>
                        <div className="ListBottomLeft_2">
                            <div className="ListTitle">{'此货品已被下架'} <span>{',点击删除'}</span></div>
                            <p><span>{'浅咖'}</span>  <span>{'待查'}</span></p>
                            <p>{'云状物'}</p>
                            <div className="CMANO"><div><span>{'GIA证书'}</span><div style={this.ComputedStyle.a}>&#xe7da;</div> </div><div>价格{'￥7878'}</div></div>
                        </div>
                    </div>
                    <div className="ListBottomRight">
                        <span>{'***'}</span>
                        <span>{'xxx供货'}</span>
                    </div>
                </div>
      </div>
        )
    }
    get ["isActive"]() {
        const { activeArray, value } = this.props
        return activeArray.includes(value)
    }
    constructor(props) {
        super(props)
    }
    get ComputedStyle(){
        if(this.props.mark){
            return{
                a:{display:'inline-block'}
            }
        }else{
            return{
                a: { display: 'none' }
            }
        }
    }
    handleClick = () => {
        const { activeArray, value } = this.props
        if (this.isActive) {
            this.props.onClick({ action: "SPLICE", keyname: this.props.keyname, value: this.props.value })
        }else {
            this.props.onClick({ action: "PUSH", keyname: this.props.keyname, value: this.props.value })
        } 

    };
    componentDidMount(){
        // console.log(this.props)
    }
}


export default ShopCardChild;