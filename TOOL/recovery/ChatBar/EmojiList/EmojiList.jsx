import "./EmojiList.scss"

class EmojiList extends React.Component {
	render(){
		return (
		<div ref="EmojiList" className="EmojiList">
			<div className="EmojiList_inner">
				{(()=>this.Emoji.map(function(val,index){
					let insterImage=function(src){
						document.execCommand("insertImage",true,src)
					}
					return 	<div key={index} onMouseDown={insterImage.bind(this,val)}>
								<img src={val} width={30} height={30}/>
							</div>
				}))()}
			</div>
		</div>
	)}
	constructor(props){
		super(props);
		this.Emoji=(function(){
			//搬运百度富文本编辑器的表情
			const emojiArr=new Array()
			let num
			for(let i=1;i<50;i++){
				if(i<10){
					num="0"+i
				}else{
					num=i
				}
				emojiArr.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f${num}.png?t=20140803`)
			}	
			return emojiArr
		})()
	}
}
export default EmojiList