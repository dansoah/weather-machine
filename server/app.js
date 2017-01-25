// we need 'babel-polyfill' for async/await.
import 'babel-polyfill';

import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import views from 'koa-views';
import serve from 'koa-static';

import path from 'path';
import axios from 'axios';

import Geolocation from './geolocation';
import Places from './places';
import Weather from './weather';
import { kelvinToCelsius, kelvinToFahrenheit } from './convert';
import { server as config } from './config'

const root = path.join(__dirname, '../');
const static_files = path.join(__dirname, '../', 'app-dist');

const app = new Koa();
const router = Router();
app.use(BodyParser())
    .use(serve(static_files))
    .use(views(root, {
        map: {
            html: 'underscore'
        }
    }))
    .use(async (ctx, next) => {
        ctx.state = {};
        ctx.state.query = ctx.request.query;
        ctx.state.body = ctx.request.body;
        await next();
    })
    .use(router.routes())
    .use(router.allowedMethods());

router.get('/', async (ctx, next) => {
    await ctx.render('index.html')
});

router.get('/user-latlong', async (ctx, next) => {

    var ip = ctx.request.ip;
    let ipv4 = ip.split(":").reverse()[0];

    let g = new Geolocation();
    await g.getLatLongByIp(ipv4).then((data) => {
        ctx.body = {
            "lat": data.latitude,
            "long": data.longitude,
        }
    })

});

router.get('/city-info', async (ctx, next) => {
    let lat = ctx.query.latitude;
    let long = ctx.query.longitude;

    let g = new Geolocation();
    await g.getCityInfoByLatLong(lat, long).then((data) => {
        ctx.body = { name: data };
    }).catch((e) => console.log("deu erro", e))

});

router.get('/weather', async (ctx, next) => {
    let lat = ctx.query.latitude;
    let long = ctx.query.longitude;

    const w = new Weather();

    await w.getCurrentWeather(lat, long).then((weather) => {

        ctx.body = {
            temperature_c: kelvinToCelsius(weather.main.temp),
            temperature_f: kelvinToFahrenheit(weather.main.temp),
            humidity: weather.main.humidity,
            min_c: kelvinToCelsius(weather.main.temp_min),
            max_c: kelvinToCelsius(weather.main.temp_max),
            min_f: kelvinToFahrenheit(weather.main.temp_min),
            max_f: kelvinToFahrenheit(weather.main.temp_max),
            sunrise_utc: weather.sys.sunrise,
            sunset_utc: weather.sys.sunset,
        }

    }, () => {
        ctx.body = {
            temperature_c: 0,
            temperature_f: 0,
            humidity: 0,
            min_c: 0,
            max_c: 0,
            min_f: 0,
            max_f: 0,
            sunrise_utc: 0,
            sunset_utc: 0,
        }
    }).catch((e) => console.log("deu erro", e))


});

router.get('/forecast', async (ctx, next) => {
    let lat = ctx.query.latitude;
    let long = ctx.query.longitude;

    const w = new Weather();

    await w.getForecast(lat, long).then((forecast) => {

        ctx.body = forecast.list.map((f) => {
            let m = f.main;
            return {
                date: f.dt,
                temperature_c: kelvinToCelsius(m.temp),
                temperature_f: kelvinToFahrenheit(m.temp),
                min_c: kelvinToCelsius(m.temp_min),
                max_c: kelvinToCelsius(m.temp_max),
                min_f: kelvinToFahrenheit(m.temp_min),
                max_f: kelvinToFahrenheit(m.temp_max),
                humidity: f.humidity
            }
        });

    }, () => {
        ctx.body = {
            date: 0,
            temperature_c: 0,
            min_c: 0,
            max_c: 0,
            min_f: 0,
            max_f: 0,
            humidity: 0
        }
    }).catch((e) => console.log("deu erro", e))


});

router.get('/city-background', async (ctx, next) => {
    let latitude = ctx.query.latitude;
    let longitude = ctx.query.longitude;

    const p = new Places();
    let types = ["museum", "park", "church", "city_hall","amusement_park",
                "airport","hospital","aquarium","library","bank","bakery",
                "bus_station", "cemetery", "courthouse", "embassy", "school",
                "fire_station", "shopping_mall", "stadium", "subway_station",
                "university", "hindu_temple", "zoo"]

    var response = {
        attributions: null,
        place: null,
        url: null
    };

    await p.getPlacesNearby(latitude, longitude, 1000, types).then((data) => {
        let pictures = p.getPicturesFromPlaces(data.results);
        let pictureCount = pictures.length;

        var selectedPicture;
        if (pictureCount == 1) {
             selectedPicture = pictures[0];
        } else {
            let random = Math.floor(Math.random() * pictureCount);
            selectedPicture = pictures[random];
        }
        
        let pictureReference = selectedPicture.photo_reference;
        response.attributions = selectedPicture.attributions;
        response.place = selectedPicture.place_name;

        return p.getPlacePicture(pictureReference, 1600);
    }).then( (pictureUrl) => {
        response.url = pictureUrl;
        ctx.body = response;
    }).catch( (e) => {
        console.log("Deu erro",e);
    })
});

app.listen(config.port, () => console.log('Listening on port '+config.port.toString()));

export default app;