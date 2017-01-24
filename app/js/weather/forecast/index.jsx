import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Temperature from '../temperature.jsx';
import ForecastItem from './forecast-item.jsx';

export default class Forecast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: []
        }

    }

    refreshForecast(props) {

        this.getForecastInfo(props.latitude, props.longitude).then((data) => {

            this.setState({ forecast: data });

        });

    }

    componentWillReceiveProps(newProps) {

        this.refreshForecast(newProps);
    }


    componentDidMount() {

        this.refreshForecast(this.props);

    }

    getForecastInfo(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let url = '/forecast/?latitude=' + latitude
                + '&longitude=' + longitude;

            axios.get(url).then((response) => {
                resolve(response.data);
            })
        })
    }



    render() {

        let forecastList = this.state.forecast.map((f) => {
            return <ForecastItem date={f.date}
                temperatureC={f.temperature_c}
                temperatureF={f.temperature_f}
                minC={this.state.forecast.minC}
                minF={this.state.forecast.minF}
                maxC={this.state.forecast.maxC}
                maxF={this.state.forecast.maxF}
                humidity={this.state.forecast.maxF} 
                isCelsius={this.props.isCelsius}/>
        })

        return <div id="forecast" className="center"> {forecastList} </div>
    }
}

