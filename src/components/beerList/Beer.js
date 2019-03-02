import React from 'react';
import '../styles/Beer.css'
const Beer = (props) => {
    return (
        <div className={`beer ${props.theme ? "light" : "dark"}`}>
            <div className="beer-info">
                <p className="beer_name"> Name: {props.name}</p>
                <p className="beer_type">Type: {props.type}</p>
                <p className="beer_price">Price per litre: {props.price}$</p>
            </div>
            <div className="beer-img">
                <img name="img" src={props.imgUrl} alt={props.name} />
            </div>
        </div>

    );
}

export default Beer;