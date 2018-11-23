
export default function Ridio(Component){
	class Ridio extends React.Component {
		state={
			selectItem:"";
		};
		RidioContext=React.creatContext({
			
		});
		render(){
			return (
			<RidioContext.Provider value={this.getChildContext()}>
				<Component>
					<RidioContext.Consumer>
						{()=>(
							
						)}
					</RidioContext.Consumer>
				</Component>
			</RidioContext.Provider>
		)}
		componentDidMount(){
			this.forceUpdate()
		}
		componentWillUpdate(nextProps,nextState){
			if(nextProps.relation==undefined){return false}
			if(nextProps.relation==null){return false}
			nextState.selectItem=nextProps.relation
		}
		getChildContext=()=>({
			selectItem:this.selectItem,
			switchAction:this.switchAction,
		});
		switchAction=(switchItem)=>{
			this.setState({selectItem:switchItem})
			if(this.props.onSwitch){this.props.onSwitch({selectItem:switchItem})}
		};
		static childContextTypes={
			selectItem:PropTypes.string,
			switchAction:PropTypes.func,
		};
		static propTypes={
			relation:PropTypes.string,
			onSwitch:PropTypes.func,
		};
	}
	return Ridio
}