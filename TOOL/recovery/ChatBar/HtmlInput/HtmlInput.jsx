import "./HtmlInput.scss"
import {Editor,EditorState,ContentState,Modifier,AtomicBlockUtils,convertFromHTML} from "draft-js";


class Image extends React.Component {
    render() {
        return (
        <div className="HtmlInput-IMAGE" style={this.SpanStyle}></div>
    )}
    get SpanStyle(){
        const {block,contentState}=this.props;
        const {src,alt,height,width}=contentState.getEntity(block.getEntityAt(0)).getData();    	
		return {
			width:"100px",
			height:"100px",
			backgroundImage:`url(${src})`,
		}
    }
}


class HtmlInput extends React.Component {
	render(){
		const HtmlInput=classnames({
			HtmlInput:true,
		},this.props.className)
		const placeholder=classnames({
			"HtmlInput-placeholder":true,
			"HtmlInput-placeholder-hide":(this.state.active)||(this.innerHTML),
		})
		return (
		<div className={HtmlInput}>
			<div className={placeholder}>
				{this.props.placeholder}
			</div>
			<Editor blockStyleFn={this.blockStyleFn} blockRendererFn={this.BlockRenderer} editorState={this.state.editorState} onChange={this.onChange}/>
			<button onClick={this.insertText}>{"插入文字"}</button>
			<button onClick={this.testImage}>{"插入图片"}</button>
			<button onClick={this.testHtml}>{"插入html"}</button>
		</div>
	)}
	constructor(props){
	  	super(props);
	  	this.state={editorState:EditorState.createEmpty()};
	}
	insertText=()=>{
		const {editorState}=this.state
		const contentState=editorState.getCurrentContent()
		const selection=editorState.getSelection();
     	const nextContentState=Modifier.insertText(contentState,selection,`这是要插入的文字`)
     	const nextEditorState=EditorState.push(
     		editorState,
     		nextContentState,
     		"insert-characters"
     	)
		this.setState({editorState:nextEditorState})
	};
	BlockRenderer=(contentBlock)=>{
		//块元素的渲染方式
		const type=contentBlock.getType();
		if(type==="atomic"){
			const contentState=this.state.editorState.getCurrentContent()
			const entity=contentState.getEntity(contentBlock.getEntityAt(0));
		    return {
		      	component:Image,
		      	editable:false,
		    };
		}
	};
	insertImage=(e)=>{	
		//插入图片需要配合上面的BlockRenderer来呈现图片
		//https://draftjs.org/docs/api-reference-atomic-block-utils.html
		const {editorState}=this.state;
		const contentStateWithEntity=editorState.getCurrentContent().createEntity(
			"PHOTO", 
			"MUTABLE",
			{
	            src:"http://fanyi.bdstatic.com/static/translation/img/header/logo_cbfea26.png",
	            height:"100px",
	            width:"100px",
			}
		)
		const entityKey=contentStateWithEntity.getLastCreatedEntityKey();
	    const newEditorState=EditorState.set(
	      	editorState,
	      	{currentContent:contentStateWithEntity},
	    );
        const newState=AtomicBlockUtils.insertAtomicBlock(editorState,entityKey," ")
		this.setState({editorState:newState})
	};
	testHtml=()=>{
		//https://draftjs.org/docs/api-reference-data-conversion.html
		const html=`<h1>46454</h1>`
		const blocksFromHTML=convertFromHTML(html)
		const content=ContentState.createFromBlockArray(
	        blocksFromHTML.contentBlocks,
	        blocksFromHTML.entityMap,
		)
		this.setState({editorState:EditorState.createWithContent(content)})	
	};
	blockStyleFn=(contentBlock)=>{
		//特殊的块样式
		const type=contentBlock.getType();
		if(type==="atomic"){
		    return "IMAGE";
		}			
	};
	onChange=(editorState)=>{
		//console.log(editorState.getCurrentContent().getPlainText());
		this.setState({editorState})
	};
}

export default HtmlInput