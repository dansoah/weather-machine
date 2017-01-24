import React from 'react';
import ReactDOM from 'react-dom';

import Temperature from '../temperature.jsx'
import MinAndMax from '../min-and-max.jsx'

export default class ForecastItem extends React.Component {

    render() {
        return <div className="forecast-item" key={this.props.date}>
            <div className="item-date">
                {this.props.date}
            </div>
            <div className="item-min-max">
                <MinAndMax minC={this.props.minC}
                minF={this.props.minF}
                maxC={this.props.maxC}
                maxF={this.props.maxF}
                isCelsius={this.props.isCelsius} />
            </div>
        </div>
    }

}