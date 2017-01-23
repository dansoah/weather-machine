import {openWeatherMap} from './config';
import Geolocation from './geolocation';
import axios from 'axios';

export default class Weather{
    
    construct(){

    }

    getCurrentWeather(latitude, logitude){    
        const url = 'http://api.openweathermap.org/data/2.5/weather?'
                        +'lat='+latitude
                        +'&lon='+logitude
                        +'&APPID='+openWeatherMap.key;
        
        const g = new Geolocation();
        
        if (!g.latitudeIsValid(latitude))
            return Promise.reject(
                RangeError("latitude must be a number between -90 & 90"))
        if (!g.longitudeIsValid(logitude))
            return Promise.reject(
                RangeError("longitude must be a number between -180 & 180"))
        
        return new Promise( (resolve, reject)=> {
            axios.get(url).then( (response) => {
                return resolve(response.data);
            }, (err) => {
                return reject(err);
            })
        })
        

    }

}