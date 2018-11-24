
import './ShopCard.scss'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import MyShopCardItem from './ShopCardItem.Router/ShopCardItem.jsx'

class ShopCard extends React.Component{
    render(){
        return (<Page>
                <div className="ListBox">
                <MyShopCardItem/>
                </div>


            <Page.Bottom>
              <div className="CardBottom">
                    <div className="CardCheck"><p><span>&#xe7fc;</span>全选</p> <span>合计:{'￥9898'}</span></div>
              <div className="CardOrder"></div>
              </div>
           </Page.Bottom>
        </Page>
        )
    }
}


export default ShopCard;