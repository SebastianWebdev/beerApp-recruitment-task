import React, {
    Component
} from 'react';
import '../styles/Column.css';

import Brewers from './Brewers';
import BeerList from './BeerList';
class Column extends Component {
    state = {
        activBrewer: "",
        beersOnList: 0,
        activeBrewerBeers: [],
        beersNumberMulti: 1,
    }
    handleBrewer = (e) => {
        const id = this.props.columnId;
        if (e.target.value) {
            const brewer = this.props.data.filter(element => element.brewer === e.target.value)
            sessionStorage.setItem(id, brewer[0].brewer);
            this.setState({
                activBrewer: brewer[0].brewer,
                activeBrewerBeers: [],
                beersNumberMulti: 1,
            })
        }


    }
    componentDidUpdate() {

        if (this.props.number !== this.state.beersOnList) {
            this.setState({
                beersOnList: this.props.number,
            })
        }

        if (this.props.data.length) {
            const brewer = this.props.data.filter(element => element.brewer === this.state.activBrewer);

            if (!this.state.activeBrewerBeers.length && brewer.length) {
                this.setState({
                    activeBrewerBeers: brewer[0].beers,
                })
            }
        }

    }
    componentDidMount() {

        const sessionBrewer = sessionStorage.getItem(this.props.columnId);

        if (sessionBrewer) {
            this.setState({
                activBrewer: sessionBrewer,
                beersOnList: this.props.number,
            })
        } else {
            this.setState({
                activBrewer: "",
                beersOnList: this.props.number,
            })
        }

    }
    handleBtn = (e) => {
        this.setState(prev => ({
            beersNumberMulti: prev.beersNumberMulti + 1,
        }))

    }

    render() {


        return (
            <div className="beers_column" >
                <Brewers theme={this.props.theme} brewer={this.state.activBrewer} brewers={this.props.data} handler={this.handleBrewer} />
                {this.state.activBrewer ? <h2 className="active-brewer"> Brewer: {this.state.activBrewer}</h2> : null}
                <BeerList theme={this.props.theme} handleBtn={this.handleBtn} beers={this.state.activeBrewerBeers} count={this.state.beersOnList} sort={this.props.sort} multi={this.state.beersNumberMulti} />
            </div>
        );
    }
}

export default Column;