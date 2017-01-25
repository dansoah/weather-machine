# Weather Machine

A weather application created using React, KOA, Open Weather Map as weather API and Google Places API for displaying the background images.

![Weather Machine Screenshot](https://github.com/dansoah/weather-machine/raw/master/media/screenshot.png?raw=true)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing & Running

Get a [Google geocoding Api key](https://developers.google.com/maps/documentation/geocoding/intro) and
a [Open Weather Map key](http://openweathermap.org/appid). Store them in the config file located on [server/config.js](server/config.js).

Install [Node.js](https://nodejs.org/). This application was developed using v7.4.0.

1. Installing dependencies:
    ```
    $ npm install
    ```
2. Building:

    ```
    > $ npm run build:all
    ```
    
3. Running

    ```
    $ npm start
    ```

4. Developing
    1. Watching app dir:

        ```
        $ npm run watch
        ```

    2. Run at development mode:
        ```
        $ npm run dev
        ```

## Running tests
```
$ npm run test
```

## Built With

* [React](https://facebook.github.io/react/) - Used to create user interface
* [Babel](https://babeljs.io/) - Used to generate browser compatible javascript
* [Node.js](https://nodejs.org/) - The applciation platform
* [Koa](https://github.com/koajs/koa) - HTTP framework
* [Ava](https://github.com/avajs/ava) - Testing framework
* [geoplugin](http://www.geoplugin.net/) - Informs approximated latlong using user's ip
* [OpenWeatherMap](http://openweathermap.org) - Weather API
* [Google geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) - Get user location data using latlong info

## Known issues

[ ] Open Wheather Map is returning the same min and max values for some cities

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details