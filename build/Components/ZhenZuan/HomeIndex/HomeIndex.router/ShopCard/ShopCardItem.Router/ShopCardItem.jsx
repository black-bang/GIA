
import './ShopCardItem.scss'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import { Icon } from 'antd-mobile'
import Lookpic from "../../../../../../static/Size_8.png";

class MyShopCardItem extends React.Component {
    ;
    render() {
        return (
            <Page style={{ backgroundColor: '#F0EFF5' }}>
                <div className="CardList">
                    <div className="ListBottom Justify">
                        <div className="ListBottomLeft">
                            <div className="CardBtn">
                                <span>&#xe7fc;</span>
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
                                <p><span>{'GIA证书'}</span><span>价格{'￥7878'}</span></p>
                            </div>
                        </div>
                        <div className="ListBottomRight">
                            <span>{'***'}</span>
                            <span>{'xxx供货'}</span>
                        </div>
                    </div>
                </div>
            </Page>

        )

    }
}

export default MyShopCardItem;