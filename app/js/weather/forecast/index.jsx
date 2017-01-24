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

        const sum = (acm, val) => acm + val;

        return new Promise((resolve, reject) => {
            let url = '/forecast/?latitude=' + latitude
                + '&longitude=' + longitude;

            axios.get(url).then((response) => {
                //todo: calculate day media
                let result = response.data.map( (f) => {
                    f.date = new Date(f.date * 1000);
                    return f;
                }).reduce( (list, f) => {
                    let date = ("0" + f.date.getDate()).slice(-2) + "/" +
                               ("0" + (f.date.getMonth() + 1)).slice(-2) + '/' +                               
                                f.date.getFullYear();
                               
                    let selected = list.filter( (l) => l.date === date );

                    if(selected.length === 0){
                        list.push({ 'date':date,
                                    'min_c':parseInt(f.min_c),
                                    'max_c':parseInt(f.max_c),
                                    'min_f':parseInt(f.min_f),
                                    'max_f':parseInt(f.max_f)
                                });
                        return list;
                    }

                    if(f.min_c < selected[0].min_c)
                        selected[0].min_c = parseInt(f.min_c);

                    if(f.min_f < selected[0].min_f)
                        selected[0].min_f = parseInt(f.min_f);

                    if(f.max_c > selected[0].max_c)
                        selected[0].max_c = parseInt(f.max_c);

                    if(f.max_f > selected[0].max_f)
                        selected[0].max_f = parseInt(f.max_f);

                    return list;

                }, [])
                
                let date = new Date();
                let now = ("0" + date.getDate()).slice(-2) + "/" +
                            ("0" + (date.getMonth() + 1)).slice(-2) + '/' +                               
                            date.getFullYear();

                if(now === result[0].date)
                    result = result.slice(1);

                resolve(result);
            })
        })
    }



    render() {
       
        let forecastList = this.state.forecast.map((f) => {
            
            return <ForecastItem date={f.date}
                minC={f.min_c}
                minF={f.min_f}
                maxC={f.max_c}
                maxF={f.max_f}
                humidity={f.humidity} 
                isCelsius={this.props.isCelsius}/>
        })

        return <div id="forecast" className="center"> {forecastList} </div>
    }
}

