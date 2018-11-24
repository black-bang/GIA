import "./HomeIndex.router.scss";
import {Page,TopBar,SelectRegion, Lable, List,SelectDate,BasePicker,SwiperCard} from "component";
import  ButtonPromise from '../../../page/ButtonPromise/ButtonPromise/ButtonPromise.jsx'
// import SpanList from "../HomeIndexItem/HomeIndexItem.jsx";
import ChildList from "./ChildList/ChildList.jsx";
import classNames from "classnames";
import url from "url";
import UserCenterBtn from "./UserCenterBtn/UserCenterBtn.jsx";
import { Toast } from 'antd-mobile'
import Input from '../../../page/BaseIput.jsx'


import HomeIndexRouterState from "./HomeIndexRouterState.mobx.js";
import { inject, observer } from "mobx-react";
@inject(stores => stores)
@observer
class HomeIndexRouter extends React.Component {
  render() {
    const SearchDetail = this.store.Search;
    return (
      <Page>
        <Page.Top style={{ height: "45px" }}>
          <div className="HomeTop">
            <UserCenterBtn />
          </div>
        </Page.Top>
        <div className="Content">
          <div className="ContentLeft">
            <div className="jeweiFace">
              <ChildList
                data={this.state.TextNumberFace}
                relation={SearchDetail["shape"]}               
                onChange={SelectOBJ => {
                  console.log(SelectOBJ)
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.a;
                    // if (originArray.length == 7) {
                    //   Toast.info('最多选择七个',.5)
                    //   return false;
                    // }
                 
                    originArray.push(SelectOBJ.value);
                    this.setState({ a: originArray });
                  } if (SelectOBJ.action =="SPLICE"){
                    let originArray = this.state.a
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1);
                    this.setState({ a: originArray });
                  }
                  let array = this.state.a
                  let arrayString = array.toString();
                  const {keyname,keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString);
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
                    this.setState({ b: originArray });                
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.b
                    let spliceState = SelectOBJ.value;
                    originArray.splice(originArray.indexOf(spliceState),1); 
                    this.setState({ b: originArray });
                  }
                  let array = this.state.b;
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString);
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
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString);
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
                   let arrayString = array.toString();
                   const { keyname, keyvalue } = SelectOBJ
                   this.store.SaveSearchInfo(keyname, arrayString);
                  sessionStorage.setItem("WorkList", JSON.stringify(array));   
                }}
                value={this.state.d}
              />
              <ChildList
                data={this.state.TextNumber_1_1}
                onChange={SelectOBJ => {
                  this.setState({ d_1: SelectOBJ.value });
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.d_1;
                    originArray.push(SelectOBJ.value);
                    this.setState({ d_1: originArray });
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.d_1
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1)
                    this.setState({ d_1: originArray });
                  }
                  let array = this.state.d_1;
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString);
                  sessionStorage.setItem("WorkList_1", JSON.stringify(array));
                }}
                value={this.state.d_1}
              />
              <ChildList
                data={this.state.TextNumber_1_2}
                onChange={SelectOBJ => {
                  this.setState({ d_2: SelectOBJ.value });
                  if (SelectOBJ.action == "PUSH") {
                    let originArray = this.state.d_2;
                    originArray.push(SelectOBJ.value);
                    this.setState({ d_2: originArray });
                  } if (SelectOBJ.action == "SPLICE") {
                    let originArray = this.state.d_2
                    originArray.splice(originArray.indexOf(SelectOBJ.value), 1)
                    this.setState({ d_2: originArray });
                  }
                  let array = this.state.d_2;
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString);
                  sessionStorage.setItem("WorkList_2", JSON.stringify(array));
                }}
                value={this.state.d_2}
              />
            </div>
            <div className="RightTitle">{"荧光"}</div>
            <div className="EleseList">
              <ChildList
                data={this.state.Singer_1}
                onChange={SelectOBJ => {
                  if (SelectOBJ.action == "PUSH") {
                    this.setState({ e: SelectOBJ.value })
                    let array = SelectOBJ.value;
                    sessionStorage.setItem("Light", JSON.stringify(array));
                  }if (SelectOBJ.action == "SPLICE") {
                    this.setState({ e: '' })
                  } 
                  let array=this.state.e
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString);          
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
                  let array = this.state.f
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString); 
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
                  let array = this.state.g
                  let arrayString = array.toString();
                  const { keyname, keyvalue } = SelectOBJ
                  this.store.SaveSearchInfo(keyname, arrayString); 
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
      d_1: JSON.parse(sessionStorage.getItem('WorkList_1')) || [],
      d_2: JSON.parse(sessionStorage.getItem('WorkList_2')) || [],
      e: JSON.parse(sessionStorage.getItem('Light')) || [],
      f: JSON.parse(sessionStorage.getItem('CMANO')) || [],
      g: JSON.parse(sessionStorage.getItem('Area')) || [],
      h: JSON.parse(sessionStorage.getItem('More')) || [],
      TextNumberFace: [
        { value: "ROUND", label: "",keyname:"shape",BgImg: './build/static/Size_1.png', BgImgs: './build/static/Size_1.1.png' },
        { value: "PEAR", label: "", keyname: "shape", BgImg: './build/static/Size_2.png', BgImgs: './build/static/Size_2.2.png'},
        { value: "HEART", label: "", keyname: "shape", BgImg: './build/static/Size_3.png', BgImgs: './build/static/Size_3.3.png' },
        { value: "OVAL", label: "", keyname: "shape",BgImg: './build/static/Size_4.png', BgImgs: './build/static/Size_4.4.png' },
        { value: "PILLOW", label: "", keyname: "shape", BgImg: './build/static/Size_5.png', BgImgs: './build/static/Size_5.5.png' },
        { value: "EMERALD", label: "", keyname: "shape",BgImg: './build/static/Size_6.png', BgImgs: './build/static/Size_6.6.png' },
        { value: "TRIANGLE", label: "", keyname: "shape", BgImg: './build/static/Size_7.png', BgImgs: './build/static/Size_7.7.png' },
        { value: "PRINCESS", label: "", keyname: "shape", BgImg: './build/static/Size_8.png', BgImgs: './build/static/Size_8.8.png' },
        { value: "RADIANT", label: "", keyname: "shape", BgImg: './build/static/Size_9.png', BgImgs: './build/static/Size_9.9.png' },
        { value: "MARQUISE", label: "", keyname: "shape",BgImg: './build/static/Size_10.png', BgImgs: './build/static/Size_10.10.png'}
      ],
      TextNumberType: [
        { value: "D", label: "D", keyname: "color", },
        { value: "E", label: "E", keyname: "color" },
        { value: "F", label: "F", keyname: "color" },
        { value: "G", label: "G", keyname: "color"},
        { value: "H", label: "H", keyname: "color" },
        { value: "I", label: "I", keyname: "color" },
        { value: "J", label: "J", keyname: "color" },
        { value: "K", label: "K", keyname: "color"},
        { value: "L", label: "L", keyname: "color" },
        { value: "M-N", label: "M-N", keyname: "color" }
      ],
      TextNumberSize: [
        { value: "IF", label: "IF", keyname: "clarity",},
        { value: "VVS1", label: "VVS1", keyname: "clarity", },
        { value: "VVS2", label: "VVS2", keyname: "clarity", },
        { value: "VS1", label: "VS1", keyname: "clarity", },
        { value: "VS2", label: "VS2", keyname: "clarity", },
        { value: "SI1", label: "SI1", keyname: "clarity", },
        { value: "SI2", label: "SI2", keyname: "clarity", },
        { value: "I1", label: "I1", keyname: "clarity", },
        { value: "I2", label: "I2", keyname: "clarity", },
        { value: "I3", label: "I3", keyname: "clarity", }
      ],
      TextNumber_1: [
        { value: "EX", label: "EX", keyname: "cut", },
        { value: "V", label: "V",keyname: "cut", },
        { value: "G", label: "G", keyname: "cut", },
        { value: "F", label: "F", keyname: "cut", },
      ],
      TextNumber_1_1: [
        { value: "EX", label: "EX", keyname: "polish", },
        { value: "V", label: "V", keyname: "polish", },
        { value: "G", label: "G", keyname: "polish", },
        { value: "F", label: "F", keyname: "polish", },
      ],
      TextNumber_1_2: [
        { value: "EX", label: "EX", keyname: "sym", },
        { value: "V", label: "V", keyname: "sym", },
        { value: "G", label: "G", keyname: "sym", },
        { value: "F", label: "F", keyname: "sym", },
      ],
      Singer_1: [
        { value: "N", label: "N", keyname: "flour", },
        { value: "VSL", label: "VSL", keyname: "flour", },
        { value: "F", label: "F", keyname: "flour", },
        { value: "M", label: "M", keyname: "flour", },
      ],
      Singer_2: [
        { value: "GIA", label: "GIA", keyname: "cert", },
        { value: "VSL", label: "VSL", keyname: "cert", },
        { value: "国检", label: "国检", keyname: "cert", },
        { value: "HRD", label: "HRD", keyname: "cert", },
      ],
      Singer_3: [
        { value: "香港", label: "香港", keyname: "location", },
        { value: "大陆", label: "大陆", keyname: "location", },
        { value: "印度", label: "印度", keyname: "location", },
        { value: "欧美", label: "欧美", keyname: "location", },
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
  
    // if (this.state.a==''){return false}
    // if (this.state.b == '') { return false }
    // if (this.state.c == '') { return false }
    // if (this.state.d == '') { return false }
    // if (this.state.d_1 == '') { return false }
    // if (this.state.d_2 == '') { return false }
    // if (this.state.e == '') { return false }
    // if (this.state.f == '') { return false }
    // if (this.state.g == '') { return false }
    // if (this.state.h == '') { return false }
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
  Reset() {
    // this.props.history.go(0)
    this.setState({ a: [] });
    this.setState({ b: [] });
    this.setState({ c: [] });
    this.setState({ d: [] });
    this.setState({ d_1: [] });
    this.setState({ d_2: [] });
    this.setState({ e: [] });
    this.setState({ f: [] });
    this.setState({ g: [] });
    this.setState({ h: [] });
    this.setState({ LW: '' });
    this.setState({ HW: '' });
    this.setState({ CMANO: [] });
    this.setState({ LWMoney: '' });
    this.setState({ HWMoney: '' });
    sessionStorage.removeItem('Face');
    sessionStorage.removeItem('Type');
    sessionStorage.removeItem('Size');
    sessionStorage.removeItem('WorkList');
    sessionStorage.removeItem('WorkList_1');
    sessionStorage.removeItem('WorkList_2');
    sessionStorage.removeItem('Light');
    sessionStorage.removeItem('CMANO');
    sessionStorage.removeItem('Area');
    sessionStorage.removeItem('More');
  }
  SubBtn = async() => {
    try{
      await this.store.getSearchState();
    }catch(error){
      throw error
    }
    console.log('A'+':'+this.state.a.toString(),
                'B' + ':' + this.state.b.toString(),
                'C' + ':' + this.state.c.toString(),
                'D' + ':' + this.state.d.toString(),
                'E' + ':' + this.state.e.toString(),
                'F' + ':' + this.state.f.toString(),
                'G' + ':' + this.state.g.toString(),
                'H' + ':' + this.state.h.toString(),
                'CMANO' + ':' + this.state.CMANO.toString(),
                'Weight'+':'+this.state.LW.toString()+'-'+this.state.HW.toString(),
                'Money'+':'+this.state.LWMoney.toString()+'-'+this.state.HWMoney.toString(),

    )
  }
  async componentDidMount() {
    document.title = "甄钻首页";
      try{
    
      }catch(error){
        throw error
      }
  }
}

export default HomeIndexRouter;
