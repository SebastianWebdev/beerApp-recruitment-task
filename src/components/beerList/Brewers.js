import React from 'react';
import '../styles/Brewers.css'
const Brewers = (props) => {
    const options = props.brewers.map(e => <option key={e.id} value={e.brewer}>{e.brewer}</option>)
    options.splice(0, 0, <option key="0" value="">Choose Brewer</option>)
    return (
        <div className="brewers_wrap">
            <select className={`select ${props.theme ? "light" : "dark"}`} size="1" name="" id="brewers" onChange={props.handler}>
                {options}
            </select>
        </div>
    );
}

export default Brewers;