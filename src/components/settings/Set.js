import React from 'react';
import '../styles/Settings.css'
const Set = (props) => {

    return (
        <section className={`app_settings ${props.theme ? "light" : "dark"}`}>
            <div className="settings_sorting settings_item">
                <h2 className="sub-tittle sorting-tittle">Sort by</h2>
                <form onChange={props.handleSortOption} action="" className="settings_sorting-inputs">
                    <div className="option">
                        <input type="radio" name="sorting" id="name" value="name" />
                        <label className="activeLabel" name="name" htmlFor="name">name</label>
                    </div>
                    <div className="option">
                        <input type="radio" name="sorting" id="price" value="price" />
                        <label name="price" htmlFor="price">price</label>
                    </div>
                    <div className="option">
                        <input type="radio" name="sorting" id="type" value="type" />
                        <label name="type" htmlFor="type">type</label>
                    </div>
                </form>
            </div>
            <div className="settings_theme settings_item">
                <h2 className="sub-tittle theme-tittle">Theme <span>{props.theme ? "light" : "dark"}</span></h2>
                <div className="theme-button-wrap" onClick={props.handleTheme}>
                    <div className="them-switch active" git ></div>
                </div>


            </div>
            <div className="numberOfBeersOnPage settings_item">
                <h2 className="sub-tittle numberOfBeers-tittle">Beers on page</h2>
                <select className={`select ${props.theme ? "light" : "dark"}`} onChange={props.handleBeersOnPage} name="beersOnPage" id="beersOnPage">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>

        </section>

    );

}

export default Set;