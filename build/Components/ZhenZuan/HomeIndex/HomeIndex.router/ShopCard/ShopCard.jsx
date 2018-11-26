
import './ShopCard.scss'
import { Page, TopBar, SelectRegion, Lable, List, SelectDate, BasePicker, SwiperCard } from "component";
import MyShopCardItem from './ShopCardItem.Router/ShopCardItem.jsx'

class ShopCard extends React.Component{
    render(){
        return (<Page>
                <div className="ListBox">
                <MyShopCardItem
                        data={this.state.CardList}
                        onChange={SelectOBJ => {
                            console.log(SelectOBJ);
                        if (SelectOBJ.action == "PUSH") {
                        let originArray = this.state.SelectCard;
                        originArray.push(SelectOBJ.value);
                        this.setState({ SelectCard: originArray });                
                    } if (SelectOBJ.action == "SPLICE") {
                        let originArray = this.state.SelectCard
                        let spliceState = SelectOBJ.value;
                        originArray.splice(originArray.indexOf(spliceState),1); 
                        this.setState({ SelectCard: originArray });
                    }
                    let array = this.state.SelectCard;
                    let arrayString = array.toString();
                    const { keyname, keyvalue } = SelectOBJ
                    //this.store.SaveSearchInfo(keyname, arrayString);
                    sessionStorage.setItem("Type", JSON.stringify(array));
                            }}
                    value={this.state.SelectCard}
                />
                </div>
            <Page.Bottom>
              <div className="CardBottom">
                    <div className="CardCheck"><p  onClick={this.CheckBtn.bind(this)}><span style={this.ComputedStyle.a}>&#xe7fc;</span>全选</p> <span>合计:{'￥9898'}</span></div>
                    <div className="CardOrder" onClick={this.payOrder.bind(this)}>下单</div>
              </div>
           </Page.Bottom>
        </Page>
        )
    }
    constructor(props){
        super(props)
        this.state={
            State:"0",
            SelectCard:[],
            CardList: [
                { value: "1", label: "", keyname: "Card",mark:'1' },
                { value: "2", label: "", keyname: "Card", mark: '2' },
                { value: "3", label: "", keyname: "Card", },
                { value: "4", label: "", keyname: "Card", },
                { value: "5", label: "", keyname: "Card", mark: '5' },
                { value: "6", label: "", keyname: "Card", },
                { value: "7", label: "", keyname: "Card", },
                { value: "8", label: "", keyname: "Card", mark: '8' },
            ],
        }
    }
    get ComputedStyle(){
        if(this.state.State==0){
            return{
                a:{
                    background:'#eee',
                    color:'#fff'
                }
            }
        }else{
            return {
                a: {
                    background: '#f66',
                    color: '#fff'
                }
            }
        }
    }
    CheckBtn(){
        if(this.state.State==0){
            this.setState({ SelectCard: ['1', '2', '3', '4', '5', '6', '7', '8']})
            this.setState({ State:'1'})
        }else{
            this.setState({ State: '0' })
            this.setState({ SelectCard: [] })
        }
    }
    payOrder(){
        console.log(this.state.SelectCard)
    }

}


export default ShopCard;