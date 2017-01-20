import React from 'react';
import ReactDOM from 'react-dom';

export default class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>{this.props.latitude}, {this.props.longitude}</h1>
    }
}

