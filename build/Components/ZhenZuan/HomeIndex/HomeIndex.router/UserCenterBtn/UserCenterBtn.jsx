import './UserCenterBtn.scss'
import url from 'url'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard, ButtonPromise } from "component"
import logo from '../../../../../static/logo.png'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCenter extends React.Component{
    render(){
        return(<div style={{width:'100%'}}>
                <div className="HomeTop">
                <div onClick={this.toShow.bind(this)} className="menu">&#xe7f4;</div>
                <div className="logo"> <p><img src={logo} alt="" /></p> <span>{'甄钻'}</span></div>
                    <div onClick={this.ServiceNotice.bind(this)}><p><span>&#xe730;</span>{'大钻服务须知'}</p></div>
                </div>
                <div style={this.ComputedStyle.a} onClick={this.boxWrap.bind(this)} className='UserCenterBox'></div>
                <div style={this.ComputedStyle.b} className="UserCenterContent">
                <Page>
                    <div style={{width:'100%',height:'100%',background:'#fff'}}>
                    <Page.Top>
                        <div className="ListTop">
                                <div className="UserPic"><span><img src={logo} alt="" /></span></div>
                                <div className="UserNumber">{'18790682701'}</div>
                                <div className="HaveData">有效期至<span>{'2018-11-21'}</span></div>
                                <div className="balance"><span>账户余额:￥4600.00</span></div>
                        </div>
                    </Page.Top>
                        <div className="ListJusity">
                            <div >
                                <span>{'888888'}</span>
                                <span>{'成交金额(元)'}</span>
                            </div>
                            <div>
                                <span>{'999'}</span>
                                <span>{'成交数量(个)'}</span>
                            </div>
                        </div>
                        <div className="UserMenuList">
                            <div onClick={this.ToMyCard.bind(this)}><span>&#xe887;</span>{'购物车'}</div>
                            <div onClick={this.ToMyOrder.bind(this)}><span>&#xe655;</span>{'我的订单'}</div>
                            <div onClick={this.ToMyCenter.bind(this)}><span>&#xe7ae;</span>{'个人中心'}</div>
                            <div onClick={this.ToMySetting.bind(this)}><span>&#xeb80;</span>{'设置'}</div>
                            <div onClick={this.ToMyCMANO.bind(this)}><span>&#xe7b4;</span>{'证书查询'}</div>
                         </div>
                    </div>
                </Page>
            </div>
        </div>
        )
    }
    constructor(props) {
        super(props)
        this.query = url.parse(this.props.location.search, true)['query']
        this.state={
            flag:'0'
        }
    }
    ToMyCard(){
        this.props.history.push("/HomeIndex/ShopCard");
    }
    ToMyOrder(){
        this.props.history.push("/HomeIndex/MyOrderList");
    }
    ToMyCenter(){
        this.props.history.push("/HomeIndex/UserCenter");
    }
    ToMySetting(){
        this.props.history.push("/HomeIndex/Setting");
    }
    ToMyCMANO(){
        this.setState({ flag: '0' })
    }
    get ComputedStyle() {
        if (this.state.flag == 1) {
            return {
                a: { transform: 'translate(0, 0) '},
                b: { transform: 'translate(0, 0) ' }
            }
        }
        return {
            a: { transform: 'translate(-100%,0)' },
            b: {  transform: 'translate(-100%,0)'  }
        }
    }
    toShow(){
        if (this.state.flag == 0) {
            this.setState({ flag: '1' })
        } else {
            this.setState({ flag: '0' })
        }
    }
    boxWrap(){
        this.setState({ flag: '0' })
    }
    ServiceNotice() {
        this.props.history.push("/HomeIndex/ServiceNotice");
    }
}

export default UserCenter