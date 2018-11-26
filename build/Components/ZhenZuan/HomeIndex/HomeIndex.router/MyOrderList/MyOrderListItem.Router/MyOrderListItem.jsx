
import './MyOrderListItem.scss'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import { Icon } from 'antd-mobile'
import Lookpic from "../../../../../../static/Size_8.png";
import url from 'url'
import { withRouter } from 'react-router-dom'

@withRouter
class MyOrderListItem extends React.Component{;
render(){
    return(
        <Page style={{ backgroundColor:'#F0EFF5'}}>
            <div onClick={this.OrderDate.bind(this)} className="OrderList">
                <div className="ListTop Justify">
                    <div className="ListTopLeft">订单号:<span>123456789</span><em>2018-11-24</em></div>
                    <div className="ListTopRight">{'待收货'}<span >&#xe7eb;</span> </div>
                </div>
                <div className="ListBottom Justify">
                        <div className="ListBottomLeft">
                                <div className="ListBottomLeft_1">
                                    <div className="Pic Center"><span><img src={Lookpic} alt=""/></span></div>
                                    <div className="Location Center"><span>&#xe790;{'位置'}</span></div>
                                    <div className="Time Center"><span>{'逾期时间'}</span></div>
                                </div>
                                <div className="ListBottomLeft_2">
                                <h4>{'图形 0.50 H VS2'}</h4>
                                <p><span>{'浅咖'}</span>  <span>{'待查'}</span></p>
                                <p>{'云状物'}</p>
                                <p><span>{'GIA证书'}</span><span>价格{'￥7878'}</span></p>
                                </div>
                        </div>
                    <div className="ListBottomRight">
                        <span>{'xxx供货'}</span>
                    </div>
                </div>
            </div>
        </Page>
       
    )
  
}
constructor(props){
    super(props)
    this.query=url.parse(this.props.location.search,true)['query']
}
    OrderDate(){
        this.props.history.push("/HomeIndex/OrderListDate");
    }
}

export default MyOrderListItem;