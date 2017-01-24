import React from 'react';
import ReactDOM from 'react-dom';

export default class Temperature extends React.Component {

    render() {
        return this.props.isCelsius 
                    ? <span> {this.props.temperatureC} ºC </span>
                    : <span> {this.props.temperatureF} ºF </span>
    }

}