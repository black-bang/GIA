import './ChildListItem.scss'
class ChildSingerList extends React.Component{
    render(){
        const { active, BgImg, BgImgs}=this.props
        return(
            <div className="childItem" style={{ 
                color:!this.isActive?"#000":"#fff",
                backgroundColor: !this.isActive ? "#fff" : "red", 
                backgroundImage: this.isActive ? `url(${BgImgs})` : `url(${BgImg})`,
                backgroundSize: '30px'         
            }} 
                onClick={this.handleClick}>
                    <span style={this.ComputedStyle}></span>
                {this.props.label}
            </div>)
    }   
    get ["isActive"](){
        const {activeArray,value}=this.props
        return activeArray.includes(value)
    }
    get ComputedStyle(){
        const { img, imgs } = this.props
        if(this.props.img){
            return{
                backgroundImage: this.isActive ? `url(${imgs})` : `url(${img})`,
                backgroundSize: '100% 100%'
            }
        }
        return{
            display:'none'
        }
    }
    constructor(props){
        super(props)      
    }
    handleClick=()=>{
        const { activeArray, value } = this.props
        if(!this.isActive){
            this.props.onClick({ action: "PUSH", keyname:this.props.keyname, value: this.props.value })
        }else{
            this.props.onClick({ action: "SPLICE", keyname: this.props.keyname, value: this.props.value })
           
        }
        
    };
}
export default ChildSingerList; 