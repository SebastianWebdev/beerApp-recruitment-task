import React from 'react';
import "./styles/FullImg.css"
const FullImg = (props) => {

    return (
        <div className="img_wrap">
            <div name="background" className="background exit"></div>
            <i class="far fa-times-circle exit"></i>
            <img src={props.url} alt="" />
        </div>

    );
}

export default FullImg;