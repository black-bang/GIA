import './MyOrderList.scss'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import { Tabs, Badge } from 'antd-mobile'
import MyOrderListItem from './MyOrderListItem.Router/MyOrderListItem.jsx'

class MyOrderList extends React.Component {
    render() {
        const tabs = [
            { title: <Badge>最近</Badge> },
            { title: <Badge>定成功</Badge> },
            { title: <Badge>待付款</Badge> },
            { title: <Badge>代收款</Badge> },
            { title: <Badge>已完成</Badge> },
            { title: <Badge>已作废</Badge> }
        ];
        return (<Page>
            <div className="TabList" style={{ width: '100%', height: '100%' }}>
                <Tabs
                    tabs={tabs}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
                    initialPage={0}
                    // onChange={this.onTab.bind(this)}
                    onTabClick={(tab, index) => { }}
                >
                    <div style={{width:'100%',height:'100%'}}><MyOrderListItem/></div>
                </Tabs>
           </div>

        </Page>
        )
    }

    componentDidMount(){
        document.title='我的订单'
    }
}


export default MyOrderList;