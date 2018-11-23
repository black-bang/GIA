import Url from '../../static/Order/completePic.png'
import React, { Component } from "react";
class loadingPic extends React.Component {
    render(){
        return(
            <div className="bgPic" style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                bottom: '20%',
                margin: 'auto'
            }} ><img src={Url} /></div>
        )
    }
}
export default loadingPic