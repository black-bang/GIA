
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import './MyOrderListDate.Router.scss'
import Input from '../../../../../../page/BaseIput.jsx'

class OrderListDate extends React.Component {
    render() {
        return <div className="OrderDateBox ">
            <div className="DateTop DateCss">
              <div>
                <span>{"货品参数"}</span> <em>
                  {"0.5 H VS2 GIA 7296736292"}
                </em>
              </div>
              <div>
                <span>{"下单备注"}</span>
                {}
              </div>
            </div>
            <div className="DateMoney DateCss">
              <div>
                <span>{"订单金额"}</span>
                <em>{"￥8989"}</em>
              </div>
              <div>
                <span>{"已付金额"}</span>
                <em style={{ color: "#50B03E" }}>{"￥0"}</em>
              </div>
              <div>
                <span>{"未付金额"}</span>
                <em style={{ color: "#B63348" }}>{"￥8989"}</em>
              </div>
            </div>
            <div className="DateInfo DateCss Justify">
              <div>
                <span>{"账户信息"}</span>
              </div>
              <div>
                <em>{"我要付款"}</em>
              </div>
            </div>
            <div className="custom DateCss Justify">
              <div>
                <span>{"客服姓名"}</span>
                <em>{"微微"}</em>
              </div>
              <div>
                <span>{"客服电话"}</span> <em>{"18539871831"}</em>
              </div>
            </div>
            <div className="UserInfo DateCss ">
              <div className="UserTop Justify">
                <div className="UserName">
                  <span>{"姓名"}</span>
                  <em>{"张帮"}</em>
                </div>
                <div className="UserTel">
                  <span>{"电话"}</span>
                  <em>{"18790682701"}</em>
                </div>
              </div>
              <div className="UserLocation">
                <span>{"收件地址"}</span>
                <em>{"杭州市萧山区"}</em>
              </div>
            </div>

            <div className="SendMesg DateCss">
              <Input />
              <span>{"发送"}</span>
            </div>

            <div className="OrderStateBox">
              <div>
                <span>&#xead9;</span>
                <p>
                  {
                    "目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间目前时间"
                  }{" "}
                </p>
              </div>
              <div>
                <span>&#xead9;</span>
                <p>
                  {
                    "时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了时间久了"
                  }{" "}
                </p>
              </div>
            </div>
          </div>;
    }
    componentDidMount(){
        document.title='订单详细'
    }
}


export default OrderListDate;