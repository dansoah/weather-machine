import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Temperature from '../temperature.jsx';
import MinAndMax from '../min-and-max.jsx';

export default class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: {
                name: "Loading...",
                temperatureC: 0,
                temperatureF: 0
            },
            cityWeather: {
                minC: 0,
                minF: 0,
                maxC: 0,
                maxF: 0,
                humidity: 0
            },
            forecastInfo: [],
            isCelsius: true
        };
    }

    refreshWeather(props) {

        Promise.all([
            this.getCityInfo(props.latitude, props.longitude),
            this.getWeatherInfo(props.latitude, props.longitude),
            this.getForecastInfo(props.latitude, props.longitude)
        ]).then((data) => {
            let cityInfo = data[0];
            let weatherInfo = data[1];
            let forecastInfo = data[2];

            this.setState({
                cityData: {
                    name: cityInfo.name,
                    temperatureC: parseInt(weatherInfo.temperature_c),
                    temperatureF: parseInt(weatherInfo.temperature_f),
                },
                cityWeather: {
                    minC: parseInt(weatherInfo.min_c),
                    minF: parseInt(weatherInfo.min_f),
                    maxC: parseInt(weatherInfo.max_c),
                    maxF: parseInt(weatherInfo.max_f),
                    humidity: parseInt(weatherInfo.humidity)
                },
                forecastInfo: forecastInfo,
            })
        })

    }

    componentWillReceiveProps(newProps) {

        this.refreshWeather(newProps);
    }


    componentDidMount() {

        this.refreshWeather(this.props);

    }

    getCityInfo(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let url = '/city-info/?latitude=' + latitude
                + '&longitude=' + longitude;

            axios.get(url).then((response) => {
                resolve(response.data);
            })
        })

    }

    getWeatherInfo(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let url = '/weather/?latitude=' + latitude
                + '&longitude=' + longitude;

            axios.get(url).then((response) => {
                resolve(response.data);
            })
        })
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
        return <div id="city-info">
            <div className="row">                
                <div id="main-temp">
                    <Temperature temperatureC={this.state.cityData.temperatureC}
                        temperatureF={this.state.cityData.temperatureF}
                        isCelsius={this.props.isCelsius} />
                </div>
                <MinAndMax minC={this.state.cityWeather.minC}
                minF={this.state.cityWeather.minF}
                maxC={this.state.cityWeather.maxC}
                maxF={this.state.cityWeather.maxF}
                isCelsius={this.props.isCelsius} />
            </div>
            <div id="city-name">{this.state.cityData.name}</div>
            
        </div>
    }
}

