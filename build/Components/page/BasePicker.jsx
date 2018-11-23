import {Picker} from "antd-mobile"

const ChildDisplay=(props)=>{
	return (
	<div onClick={props.onClick}>
	    <div>{props.extra}</div>
	</div>	
)}


class BasePicker extends React.Component {
  render() {
    return (
      <Picker
        cols={1}
        cascade={false}
        data={[this.FormatData]}
        title={this.props.placeholder}
        value={this.state.value}
        extra={this.props.placeholder}
        onChange={this.handleChange}
        onOk={this.handleOk}
      >
        <ChildDisplay />
      </Picker>
    );
  }
  constructor(props) {
    super(props);
    this.state = { value: null };
  }
  get FormatData() {
    //将data抹平成标准的data
    return this.props.data.map((dataUnit, index) => {
      return { value: String(dataUnit["value"]), label: dataUnit["label"] };
    });
  }
  componentDidMount(){
	  this.forceUpdate()
	 
  }
  componentWillUpdate(nextProps, nextState) {
    //console.log(nextProps.keyname,nextProps.relation);
    if (!nextProps.relation) {
      return false;
    }
    if (nextProps.relation == undefined) {
      return false;
    }
    if (nextProps.relation == null) {
      return false;
    }
    //关联值也需要抹平
    nextState.value = [String(nextProps.relation)];
  }
  handleChange = value => {
    this.setState({ value: value });
    this.props.onChange({ keyname: this.props.keyname, keyvalue: value[0] });
  };
  handleOk = value => {
    this.setState({ value: value });
	this.props.onEnter({ keyname: this.props.keyname, keyvalue: value[0] });
  };
  static defaultProps = {
    placeholder: "请选择",
    data: [{label: "2" }, { value: "3", label: "3" }],
    onChange: pickerOBJ => {
      /*console.log(pickerOBJ)*/
    },
    onEnter: pickerOBJ => {
      /*console.log(pickerOBJ)*/
    }
  };
  static propTypes = {
    relation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  static type = {
    AP: pramaOBJ => {
      //ArithmeticProgression等差数列
      let ExperienceArray = new Array();
      const defaultConfig = Object.assign(
        { strat: 0, step: 1, loop: 100, unit: "年" },
        pramaOBJ
      );
      for (
        let i = defaultConfig["strat"];
        i < defaultConfig["loop"];
        i = i + defaultConfig["step"]
      ) {
        ExperienceArray.push({
          value: String(i + 1),
          label: i + 1 + defaultConfig["unit"]
        });
      }
      return ExperienceArray;
    },
    sex: () => {
      return [{ value: "1", label: "男" }, { value: "0", label: "女" }];
	},
	kind: () => {
		return [
			// { value: "1", label: "扫码领券" }, 
			{ value: "2", label: "扫码完善信息" },
			// { value: "3", label: "扫码领取红包" },
			// { value: "4", label: "其他业务场景" },
			{ value: "5", label: "无，仅仅扫码关注" }
			];
  },
  empoly:()=>{
    return[
      { value: "40", label: "jackey"}
    ]
  }
  };
}

//console.log(BasePicker.type.AP());
export default BasePicker