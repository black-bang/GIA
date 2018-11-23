import "./HomeIndex.router.scss";
import {Page,TopBar,SelectRegion, Lable, List,SelectDate,BasePicker,SwiperCard} from "component";
import  ButtonPromise from '../../../page/ButtonPromise/ButtonPromise/ButtonPromise.jsx'
// import SpanList from "../HomeIndexItem/HomeIndexItem.jsx";
import ChildList from "../ChildList/ChildList.jsx";
import classNames from "classnames";
import url from "url";
import UserCenter from "../UserCenter/UserCenter.jsx";
import { Toast } from 'antd-mobile'
import Input from '../../../page/BaseIput.jsx'


import HomeIndexRouterState from "./HomeIndexRouterState.mobx.js";
import { inject, observer } from "mobx-react";
@inject(stores => stores)
@observer
class HomeIndexRouter extends React.Component {
  render() {
    return (
      <Page>
        <Page.Top style={{ height: "45px" }}>
          <div className="HomeTop">
            <UserCenter />
          </div>
        </Page.Top>
        <div className="Content">
          <div className="ContentLeft">
            <div className="jeweiFace">
              <ChildList
                data={this.state.TextNumberFace}
                onChange={SelectOBJ => {
                 //console.log(SelectOBJ);
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.a;
                    // if (originArray.length == 7) {
                    //   Toast.info('最多选择七个',.5)
                    //   return false;
                    // }
                 
                    originArray.push(SelectOBJ.value);
                    this.setState({ a: originArray });
                    console.log(originArray);
                  } if (SelectOBJ.action =="SPLICE"){
                    let originArray = this.state.a
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1);
                    this.setState({ a: originArray });
                  }
                  console.log(this.state.a)
                  let array = this.state.a
                  sessionStorage.setItem("Face", JSON.stringify(array));
                 
                }}
                value={this.state.a}
              />
            </div>
            <div className="jeweiType">
              <ChildList
                data={this.state.TextNumberType}
                onChange={SelectOBJ => {
                  // this.setState({ b: SelectOBJ.value });
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.b;
                    originArray.push(SelectOBJ.value);
                    console.log(originArray);
                    this.setState({ b: originArray });
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.b
                    console.log(originArray);
                    let spliceState = SelectOBJ.value;
                    console.log(spliceState);
                    originArray.splice(originArray.indexOf(spliceState),1); 
                    console.log(originArray);
                    this.setState({ b: originArray });
                  }
                  let array = this.state.b;
                  sessionStorage.setItem("Type", JSON.stringify(array));
                }}
                value={this.state.b}
              />
            </div>
            <div className="jeweiSize">
              <ChildList
                data={this.state.TextNumberSize}
                onChange={SelectOBJ => {
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.c;
                    originArray.push(SelectOBJ.value);
                    this.setState({ c: originArray });
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.c
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1);
                    this.setState({ c: originArray });
                  }
                  let array = this.state.c;
                  sessionStorage.setItem("Size", JSON.stringify(array));
                }}
                value={this.state.c}
              />
            </div>
          </div>
          <div className="ContentRight">
            <div className="RightTop">
              <span onClick={this.Weight.bind(this)}>{"重量ct"}</span>
              <span onClick={this.CMANO.bind(this)} className="CMANO"> {"证书号"} </span>
              <span onClick={this.Money.bind(this)}>{"价格"}</span>
            </div>
            <div style={this.ComputedStyle.a} className="WatchNumber">
              <Input type="number"
              onChange={this.LowWeight.bind(this)}
                value={this.state.LW}
              />
              <span>-</span>
              <Input type="number"
                onChange={this.HeightWeight.bind(this)}
                value={this.state.HW}
              />
            </div>
            <div style={this.ComputedStyle.b} className="WatchCMANO">
              <Input type="text"
                onChange={this.CMANONumber.bind(this)}
                value={this.state.CMANO}
              />
            </div>
            <div style={this.ComputedStyle.c} className="WatchMoney">
              <Input type="number"
                onChange={this.LowMoney.bind(this)}
                value={this.state.LWMoney}
              />
              <span>-</span>
              <Input type="number"
                onChange={this.HeightMoney.bind(this)}
                value={this.state.HWMoney}
              />
            </div>
            <div className="RightTitle">{"切工/抛光/对称"}</div>
            <div className="WorkList">
              <ChildList
                data={this.state.TextNumber_1}
                onChange={SelectOBJ => {
                  this.setState({ d: SelectOBJ.value });
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.d;
                    originArray.push(SelectOBJ.value);
                    this.setState({ d: originArray });
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.d
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1)
                    this.setState({ d: originArray });
                  }
                  let array = this.state.d;
                  sessionStorage.setItem("WorkList", JSON.stringify(array));   
                }}
                value={this.state.d}
              />
            </div>
            <div className="RightTitle">{"荧光"}</div>
            <div className="EleseList">
              <ChildList
                data={this.state.Singer_1}
                onChange={SelectOBJ => {
                  console.log(SelectOBJ);
                  if (SelectOBJ.action == "PUSH") {
                    this.setState({ e: SelectOBJ.value })
                    let array = SelectOBJ.value;
                    sessionStorage.setItem("Light", JSON.stringify(array));
                  }if (SelectOBJ.action == "SPLICE") {
                    this.setState({ e: '' })
                  }
                  let array = this.state.e;
                  sessionStorage.setItem("Light", JSON.stringify(array));             
                }}
                value={this.state.e}
              />
            </div>
            <div className="RightTitle">{"证书"}</div>
            <div className="EleseList">
              <ChildList
                data={this.state.Singer_2}
                onChange={SelectOBJ => {
                  if (SelectOBJ.action == "PUSH") {
                    this.setState({ f: SelectOBJ.value })
                    let array = SelectOBJ.value;
                    sessionStorage.setItem("CMANO", JSON.stringify(array));
                  } if (SelectOBJ.action == "SPLICE") {
                    this.setState({ f: '' })
                  }
                }}
                value={this.state.f}
              />
            </div>
            <div className="RightTitle">{"所在地"}</div>
            <div className="EleseList">
              <ChildList
                data={this.state.Singer_3}
                onChange={SelectOBJ => {
                  if (SelectOBJ.action == "PUSH") {
                    this.setState({ g: SelectOBJ.value })
                    let array = SelectOBJ.value;
                    sessionStorage.setItem("Area", JSON.stringify(array));
                  } if (SelectOBJ.action == "SPLICE") {
                    this.setState({ g: '' })
                  }
                 
                }}
                value={this.state.g}
              />
            </div>
            <div className="RightTitle">{"更多"}</div>
            <div className="MoreList">
              <ChildList
                data={this.state.TextNumber_2}
                onChange={SelectOBJ => {
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.h;
                    originArray.push(SelectOBJ.value);
                    this.setState({ h: originArray });
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.h
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1)
                    this.setState({ h: originArray });
                  }
                  let array=this.state.h;
                  sessionStorage.setItem("More", JSON.stringify(array));
                }}
                value={this.state.h}
              />

            </div>
          </div>
        </div>

        <div className="footer">
          <span onClick={this.Reset.bind(this)}>{"重置"}</span>
          <div className="Button">
            <ButtonPromise
              onClick={this.SubBtn.bind(this)}
              active={this.submit}
              className="ButtonPromise"
            >
              {"搜索"}
            </ButtonPromise>
           </div>
      
        </div>
      </Page>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.store = new HomeIndexRouterState();
    this.state = {
      LW:'',
      HW:'',
      LWMoney:'',
      HWMoney:'',
      CMANO:'',
      flag:'0',
      a: JSON.parse(sessionStorage.getItem('Face')) ||[],
      b: JSON.parse(sessionStorage.getItem('Type')) || [],
      c: JSON.parse(sessionStorage.getItem('Size')) || [],
      d: JSON.parse(sessionStorage.getItem('WorkList')) || [],
      e: JSON.parse(sessionStorage.getItem('Light')) || [],
      f: JSON.parse(sessionStorage.getItem('CMANO')) || [],
      g: JSON.parse(sessionStorage.getItem('Area')) || [],
      h: JSON.parse(sessionStorage.getItem('More')) || [],
      TextNumberFace: [
        { value: "钻石一", label: "", BgImg: './build/static/Size_1.png', BgImgs: './build/static/Size_1.1.png' },
        { value: "钻石二", label: "", BgImg: './build/static/Size_2.png', BgImgs: './build/static/Size_2.2.png'},
        { value: "钻石三", label: "", BgImg: './build/static/Size_3.png', BgImgs: './build/static/Size_3.3.png' },
        { value: "钻石四", label: "", BgImg: './build/static/Size_4.png', BgImgs: './build/static/Size_4.4.png' },
        { value: "钻石五", label: "", BgImg: './build/static/Size_5.png', BgImgs: './build/static/Size_5.5.png' },
        { value: "钻石六", label: "", BgImg: './build/static/Size_6.png', BgImgs: './build/static/Size_6.6.png' },
        { value: "钻石七", label: "", BgImg: './build/static/Size_7.png', BgImgs: './build/static/Size_7.7.png' },
        { value: "钻石八", label: "", BgImg: './build/static/Size_8.png', BgImgs: './build/static/Size_8.8.png' },
        { value: "钻石九", label: "", BgImg: './build/static/Size_9.png', BgImgs: './build/static/Size_9.9.png' },
        { value: "钻石十", label: "", BgImg: './build/static/Size_10.png', BgImgs: './build/static/Size_10.10.png'}
      ],
      TextNumberType: [
        { value: "D", label: "D" },
        { value: "E", label: "E" },
        { value: "F", label: "F" },
        { value: "G", label: "G" },
        { value: "H", label: "H" },
        { value: "I", label: "I" },
        { value: "J", label: "J" },
        { value: "K", label: "K" },
        { value: "L", label: "L" },
        { value: "M-N", label: "M-N" }
      ],
      TextNumberSize: [
        { value: "IF", label: "IF" },
        { value: "VVS1", label: "VVS1" },
        { value: "VVS2", label: "VVS2" },
        { value: "VS1", label: "VS1" },
        { value: "VS2", label: "VS2" },
        { value: "SI1", label: "SI1" },
        { value: "SI2", label: "SI2" },
        { value: "I1", label: "I1" },
        { value: "I2", label: "I2" },
        { value: "I3", label: "I3" }
      ],
      TextNumber_1: [
        { value: "EX", label: "EX" },
        { value: "VG", label: "VG" },
        { value: "GD", label: "GD" },
        { value: "FR", label: "FR" },
        { value: "EX1", label: "EX" },
        { value: "VG1", label: "VG" },
        { value: "GD1", label: "GD" },
        { value: "FR1", label: "FR" },
        { value: "EX2", label: "EX" },
        { value: "VG2", label: "VG" },
        { value: "GD2", label: "GD" },
        { value: "FR2", label: "FR" }
      ],
      Singer_1: [
        { value: "N", label: "N" },
        { value: "VSL", label: "VSL" },
        { value: "F", label: "F" },
        { value: "M", label: "M" },
      ],
      Singer_2: [
        { value: "GIA", label: "GIA" },
        { value: "VSL", label: "VSL" },
        { value: "国检", label: "国检" },
        { value: "HRD", label: "HRD" },
      ],
      Singer_3: [
        { value: "香港", label: "香港" },
        { value: "大陆", label: "大陆" },
        { value: "印度", label: "印度" },
        { value: "欧美", label: "欧美" },
      ],
      TextNumber_2: [
        { value: "优选", label: "优选", img: './build/static/Icon_1.png', imgs:'./build/static/Icon_1.1.png' },
        { value: "肉眼净", label: "肉眼净", img: './build/static/Icon_2.png', imgs: './build/static/Icon_2.2.png' },
        { value: "图片", label: "图片", img: './build/static/Icon_3.png', imgs: './build/static/Icon_3.3.png' },
        { value: "无咖奶", label: "无咖奶", img: './build/static/Icon_4.png', imgs: './build/static/Icon_4.4.png' },
      ],
    };
  }
  get submit(){
    if (this.state.a==''){return false}
    if (this.state.b == '') { return false }
    if (this.state.c == '') { return false }
    if (this.state.d == '') { return false }
    if (this.state.e == '') { return false }
    if (this.state.f == '') { return false }
    if (this.state.g == '') { return false }
    if (this.state.h == '') { return false }
  }
  LowWeight(e,value){
    this.setState({LW:value})
  }
  HeightWeight(e, value) {
    this.setState({ HW: value })
  }
  LowMoney(e,value){
    this.setState({ LWMoney: value });
  }
  HeightMoney(e,value){
    this.setState({ HWMoney: value });
  }
  CMANONumber(e,value){
    this.setState({ CMANO: value })
  }

  Weight(){
    this.setState({ flag: '0' });
  }
  CMANO() {
    this.setState({ flag: '1' });
  }
  Money() {
    this.setState({ flag: '2' });
  }
  get ComputedStyle(){
    if(this.state.flag ==1){
      return {
        a: { display: 'none' },
        b: { display: 'block' },
        c: { display: 'none' }
      }
    }
    if (this.state.flag == 2) {
      return {
        a: { display: 'none' },
        b: { display: 'none' },
        c: { display: 'block' }
      }
    }
    return {
      a: { display: 'block' },
      b: { display: 'none' },
      c: { display: 'none' }
    }
  }
  Reset(spanObj) {
    // this.props.history.go(0)
    this.setState({ index: "0" });
    this.setState({ book: "0" });
    this.setState({ share: "0" });
    this.setState({ a: [] });
    this.setState({ b: [] });
    this.setState({ c: [] });
    this.setState({ d: [] });
    this.setState({ e: [] });
    this.setState({ f: [] });
    this.setState({ g: [] });
    this.setState({ h: [] });
    this.setState({ LW: '' });
    this.setState({ HW: '' });
    this.setState({ CMANO: [] });
    this.setState({ LWMoney: '' });
    this.setState({ HWMoney: '' });
  }
  SubBtn(){
    console.log('a'+':'+this.state.a.toString(),
                'b' + ':' + this.state.b.toString(),
                'c' + ':' + this.state.c.toString(),
                'd' + ':' + this.state.d.toString(),
                'e' + ':' + this.state.e.toString(),
                'f' + ':' + this.state.f.toString(),
                'g' + ':' + this.state.g.toString(),
                'h' + ':' + this.state.h.toString(),
                'CMANO' + ':' + this.state.CMANO.toString(),
                'weight'+':'+this.state.LW.toString()+'-'+this.state.HW.toString(),
                'weight'+':'+this.state.LWMoney.toString()+'-'+this.state.HWMoney.toString(),

    )
  }
  async componentDidMount() {
    document.title = "甄钻首页";
    const resut = await this.store.getState();
  }
}

export default HomeIndexRouter;
