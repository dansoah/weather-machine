import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CurrentWeather from './current-weather/index.jsx';
import Forecast from './forecast/index.jsx';

var geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 4000
};

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userPosition: { lat: 2, long: 3 },
            background: {
                attributions: null,
                place: null,
                url: null
            },
            isCelsius: true
        }
    }

    componentDidMount() {

        this.getUserLatLong()
            .then((data) => {
                this.setState({ userPosition: data });
                return this.getBackgroundByLatLong(data.lat, data.long)
            })
            .then((data) => {
                this.setState({ background: data });
                console.log("back", data)
            })
    }

    getBackgroundByLatLong(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let url = '/city-background/?latitude=' + latitude
                + '&longitude=' + longitude;
            axios.get(url).then((response) => {
                resolve(response.data);
            });
        });
    }

    getLatLongByGeolocation() {

        return new Promise((resolve, reject) => {

            /* User will have 4 seconds to allow browser to get his position,
             * if user takes too long, his position is gotten by IP.
             *  
             * Works fine at chrome, firefox need some bugfixing, not
             * tested with IE/Edge
            */
            let locationTimeout = setTimeout(() => {
                this.getLatLongByIp().then(resolve, reject);
            }, 4000);

            return navigator
                .geolocation
                .getCurrentPosition((data) => {

                    clearTimeout(locationTimeout);
                    resolve({
                        lat: data.coords.latitude,
                        long: data.coords.longitude
                    })

                }, () => {

                    clearTimeout(locationTimeout);
                    this.getLatLongByIp().then(resolve, reject);

                }, geoOptions);
        });
    }

    getLatLongByIp() {
        return new Promise((resolve, reject) => {
            axios.get('/user-latlong').then((response) => {
                console.log(response.data);
                resolve({
                    lat: response.data.lat,
                    long: response.data.long
                })
            });
        });
    }

    getUserLatLong() {
        if ("geolocation" in navigator) {
            return this.getLatLongByGeolocation();
        } else {
            return this.getLatLongByIp();
        }
    }

    render() {
        let backgroundStyle = {
            backgroundImage: 'url(' + this.state.background.url + ')'
        }

        var attributions = null;
        if (this.state.background.attributions != null)
            attributions = this.state.background.attributions.map((a) => {
                let link = a.match(/href="(.*?)"/)[1];
                let name = a.match(/>(.*?)</)[1];

                return (<a href={link} key={link} target="_blank">{name}</a>);
            })

        return (<div id="container" style={backgroundStyle}>
            <div id="header" className="center">
                <CurrentWeather latitude={this.state.userPosition.lat}
                    longitude={this.state.userPosition.long}
                    isCelsius={this.state.isCelsius} />

            </div>

            <Forecast latitude={this.state.userPosition.lat}
                longitude={this.state.userPosition.long}
                isCelsius={this.state.isCelsius} />
            <div id="bg-info">
                <img src="/images/powered_by_google_on_white.png" />
                <p> {this.state.background.place} by {attributions}

                </p>

            </div>
        </div>
        );
    }

}

ReactDOM.render(<Weather />, document.getElementById('app'));