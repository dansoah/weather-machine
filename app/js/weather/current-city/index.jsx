import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cityData: { name: null, temperature: null } };
    }

    componentWillReceiveProps(newProps) {

        this.getCityInfo(newProps.latitude, newProps.longitude)
            .then((data) => {
                this.setState({ cityData: data });
            })
    }


    componentDidMount() {

        this.getCityInfo(this.props.latitude, this.props.longitude)
            .then((data) => {
                this.setState({ cityData: data });
            })

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

    

    render() {
        return <div id="city-info">
            <h1>{this.state.cityData.name}</h1>
            <h2>{this.state.cityData.temperature} ºC</h2>
            <span>{this.props.latitude},{this.props.longitude}</span>
        </div>
    }
}

