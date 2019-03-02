import React from 'react';
import Beer from './Beer';
const BeerList = (props) => {
    const { count, sort, beers, handleBtn, multi } = props
    let numberOfDisplaingBeers = count * multi;


    const sortingBeers = (sortType = "name", beers) => {
        const sortByNamesFunc = (a, b) => {
            if (a.name < b.name) {
                return -1
            } else if (a.name === b.name) {
                return 0
            } else return 1
        }
        const sortByPriceFunc = (a, b) => {
            if (a.price < b.price) {
                return -1
            } else if (a.price === b.price) {
                return 0
            } else return 1
        }
        const sortByTypeFunc = (a, b) => {
            if (a.type < b.type) {
                return -1
            } else if (a.type === b.type) {
                return 0
            } else return 1
        }
        if (sortType === "name") {
            const beersByNames = beers.sort(sortByNamesFunc)
            return beersByNames
        }
        else if (sortType === "type") {
            const beersBytype = beers.sort(sortByTypeFunc)
            return beersBytype
        } else if (sortType === "price") {
            const beersByPrice = beers.sort(sortByPriceFunc)
            return beersByPrice
        }

    }

    const sortedBeers = sortingBeers(sort, beers);
    const filteredBeers = sortedBeers.filter((e, i) => i < numberOfDisplaingBeers);
    const beersHtml = filteredBeers.map(beer => <Beer theme={props.theme} imgUrl={beer.imgUrl} key={beer.name} name={beer.name} type={beer.type} brewer={beer.brewer} price={beer.price} />);




    return (
        <div className="beer_list">
            {beersHtml}
            {beers.length > numberOfDisplaingBeers ? <button className={props.theme ? "light" : "dark"} onClick={handleBtn}>Load more</button> : null}
        </div>
    );
}

export default BeerList;