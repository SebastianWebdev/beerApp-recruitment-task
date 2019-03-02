import React, {
  Component
} from 'react';
import Column from './beerList/Column'
import FullImg from './FullImg'
import Set from './settings/Set'
import './styles/App.css';
// theme: true === light,theme: false === dark,
class App extends Component {
  state = {
    ImgUrl: "",
    responseLoaded: false,
    responseStatus: false,
    beers: [],
    data: [],
    settings: {
      theme: true,
      sortOption: "name",
      numberOfBeers: 5,
    }
  }


  setJSONData = (url) => {
    const api = url;
    const xhr = new XMLHttpRequest()

    xhr.open("GET", api, true)
    xhr.onload = () => {
      this.setState({
        responseLoaded: true,
      })
      if (xhr.status === 200) {
        this.setState({
          responseStatus: true,
          beers: JSON.parse(xhr.response)
        })

      }

    }

    xhr.send(null)

  }
  getPrizePerLitre = (arg1, arg2) => {
    const price = arg1 * 1;
    const arr = arg2.split(" ");
    arr.forEach((e, i) => {
      if (!e) {
        arr.splice(i, 1)
      }
    })
    const count = arr[0] * 1;
    const ammount = parseFloat(arr[3]) / 1000
    const pricePerLitre = (price / (count * ammount)).toFixed(2)



    return pricePerLitre

  }
  setData = (data = [...this.state.beers]) => {
    const brewers = [];
    const outputData = [];

    for (let i = 0; i < data.length; i++) {
      let isInBrewers = false;
      brewers.forEach(e => {
        if (data[i].brewer === e) {
          isInBrewers = true;
        }
      })
      if (!isInBrewers) {
        brewers.push(data[i].brewer)
      }

    }
    brewers.forEach(e => {
      const beers = []
      let id = e;
      data.forEach(d => {
        if (e === d.brewer) {
          const pricePerLitre = this.getPrizePerLitre(d.price, d.size);

          beers.push({
            name: d.name,
            type: d.type,
            price: pricePerLitre,
            id: d.beer_id,
            imgUrl: d.image_url
          })
        }

      })
      outputData.push({
        brewer: e,
        beers: beers,
        id
      })
    })



    return outputData
  }

  componentDidMount() {
    this.setJSONData("http://ontariobeerapi.ca/beers/");

    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "true") {
        document.querySelector(".them-switch").classList.add("active")
      } else {


        document.querySelector(".them-switch").classList.remove("active")
      }

      const storageTheme = JSON.parse(localStorage.getItem("theme"))
      this.setState(prev => {
        return {
          settings: {
            sortOption: prev.settings.sortOption,
            numberOfBeers: prev.settings.numberOfBeers,
            theme: storageTheme,
          }
        }
      })
    }
  }

  componentDidUpdate() {
    if (this.state.responseStatus && !this.state.data.length) {
      const data = this.setData()
      this.setState({
        data
      })
    }
  }
  handleTheme = (e) => {
    const button = document.querySelector(".them-switch")
    //button.classList.toggle("active")
    this.setState(prev => {
      return {
        settings: {
          sortOption: prev.settings.sortOption,
          numberOfBeers: prev.settings.numberOfBeers,
          theme: !prev.settings.theme,
        }
      }
    })
    if (button.classList.contains("active")) {
      localStorage.setItem("theme", "true")
    } else {
      localStorage.setItem("theme", "false")
    }

  }
  handleSortOption = (e) => {

    const label = e.target.labels[0]

    const labels = [...document.querySelectorAll(".option label")]
    labels.forEach(label => {
      label.classList.remove('activeLabel');
    })
    label.classList.add("activeLabel");




    const value = e.target.value;

    this.setState(prev => {
      return {
        settings: {
          theme: prev.settings.theme,
          sortOption: value,
          numberOfBeers: prev.settings.numberOfBeers,
        }
      }
    })

  }
  handleBeersOnPage = (e) => {

    const numberOfBeers = e.target.value * 1;
    this.setState(prev => {
      return {
        settings: {
          theme: prev.settings.theme,
          sortOption: prev.settings.sortOption,
          numberOfBeers: numberOfBeers,
        }
      }
    })
  }
  handleImgClick = (e) => {

    if (e.target.name === "img") {
      this.setState({
        ImgUrl: e.target.src
      })
    } else if (e.target.classList.contains("exit")) {

      this.setState({
        ImgUrl: "",
      })
    }


  }

  render() {

    const { data, responseStatus, ImgUrl: url } = this.state
    const { sortOption: sort, numberOfBeers: number, theme } = this.state.settings

    return (
      < div className={`app_wrapper ${theme ? "light" : "dark"}`} onClick={this.handleImgClick} >

        <Set handleBeersOnPage={this.handleBeersOnPage} handleTheme={this.handleTheme} theme={theme} handleSortOption={this.handleSortOption} />

        <section className={`app_content ${theme ? "light" : "dark"}`} >
          {this.state.responseStatus ? < Column theme={theme} columnId="column1" number={number} data={data} sort={sort} dataStatus={responseStatus} /> : null}
          {this.state.responseStatus ? < Column theme={theme} columnId="column2" number={number} data={data} sort={sort} dataStatus={responseStatus} /> : null}
          {this.state.responseStatus ? < Column theme={theme} columnId="column3" number={number} data={data} sort={sort} dataStatus={responseStatus} /> : null}
        </section> {url ? < FullImg url={url} /> : null}
      </div>
    )
  }
}

export default App;