
import './ShopCardItem.scss'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import { Icon } from 'antd-mobile'
import Lookpic from "../../../../../../static/Size_8.png";
import ShopCardChild from './ShopCardItemChild.Router/ShopCardItemChild.Router.jsx'

class MyShopCardItem extends React.Component {
    ;
    render() {
        return (
            <Page style={{ backgroundColor: '#F0EFF5' }}>
                <div className="CardList">
                    {this.props.data.map((ListItem, index) => {
                    //     let a=[]
                    //     a.push(ListItem.value)
                    //     console.log(a)
                    //   sessionStorage.setItem("CardList", JSON.stringify(a));
                        return (
                            <ShopCardChild
                                {...ListItem}
                                key={index}
                                activeArray={this.props.value}
                                onClick={this.handleClick}
                            />
                        )
                    })}
              
                </div>
            </Page>

        )
    }
    constructor(props){
        super(props)
        this.state={
            List:[]
        }
    }
    handleClick = (SelectOBJ) => {
        this.props.onChange(SelectOBJ)
       // console.log(SelectOBJ);
       
    }
    componentDidMount(){
        //console.log(sessionStorage.getItem('CardList'))
    }
}
export default MyShopCardItem;