import React from 'react';
import ReactDOM from 'react-dom';

export default class Temperature extends React.Component {

    render() {
        return this.props.isCelsius 
                    ? <span className="temp"> {this.props.temperatureC} ºC </span>
                    : <span className="temp"> {this.props.temperatureF} ºF </span>
    }

}