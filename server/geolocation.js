import { googleGeoCode } from './config';
import axios from 'axios';

export default class Geolocation {

    construct() {

    }

    /**
     * Process google geolocation api to get a city name
     */
    getCityNameFromGoogleApi(response) {
        let data = response.data;
        
        if (data.results.length === 0)
            return "noname";

        return data.results
            .map((a) => a.address_components)
            .map((a) => a.filter(
                (b) => b.types.indexOf("locality") > -1))
            .map((a) => a.map((b) => b.short_name)[0])
            .filter((a) => typeof a != 'undefined')
            .reduce((list, location) => {

                list = typeof list === 'undefined' ? [] : list;
                var locationFilter = list.filter(
                    (a) => a.location === location);
                var locationExists = locationFilter.length > 0;

                if (!locationExists) {
                    list.push({ 'location': location, count: 1 });
                    return list;
                }

                list[list.indexOf(locationFilter[0])].count++;

                return list;

            }, [])
            .sort((a, b) => Math.sign(a.count, b.count))[0].location;
    }

    /**
     * Checks if a latitude value is between -90 and 90 and if it's a number
     */
    latitudeIsValid(lat) {
        if(typeof lat === 'undefined')
            return false;        
        
        lat = lat === null ? null : parseFloat(lat);
        
        if (lat == null || isNaN(lat) || typeof lat !== 'number')
            return false;

        if (lat > 90 || lat < -90)
            return false;

        return true;
    }

    /**
     * Checks if a longitude value is between -180 and 180 and if it's a number
     */
    longitudeIsValid(long) {
        if(typeof long === 'undefined')
            return false;        
        
        long = long === null ? null : parseFloat(long);

        if (long == null || isNaN(long) || typeof long !== 'number')
            return false;

        if (long > 180 || long < -180)
            return false;

        return true;
    }

    /**
     * Queries Google's Geocode API for city information based on 
     * latitude and longitude
     */
    getCityInfoByLatLong(lat, long) {

        if (!this.latitudeIsValid(lat))
            return Promise.reject(
                    RangeError("latitude must be a number between -90 & 90"))
        if (!this.longitudeIsValid(long))
            return Promise.reject(
                    RangeError("longitude must be a number between -180 & 180"))

            return new Promise((resolve, reject) => {

                let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
                    + lat + ',' + long + '&key=' + googleGeoCode.key;

                axios
                    .get(url)
                    .then(response => {
                        let cityName = this.getCityNameFromGoogleApi(response);
                        return resolve(cityName);
                    }).catch( (e) => {
                        console.warn(e);
                    })
            })

    }

}