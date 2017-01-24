import React from 'react';
import ReactDOM from 'react-dom';

import Temperature from './temperature.jsx';

export default class MinAndMax extends React.Component {

    render() {
        return <div className="min-max" >
            
            <div className="day-max">
                <span className="title">Max: </span>
                <Temperature
                    temperatureC={this.props.maxC}
                    temperatureF={this.props.maxF}
                    isCelsius={this.props.isCelsius} />
            </div>
            <div className="day-min">
                <span className="title">Min: </span>
                <Temperature
                    temperatureC={this.props.minC}
                    temperatureF={this.props.minF}
                    isCelsius={this.props.isCelsius} />
            </div>

        </div>
    }

}