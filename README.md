# Weather Machine

A weather application created using React and KOA.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing & Running

Get a [Google geocoding Api key](https://developers.google.com/maps/documentation/geocoding/intro) and
a [Open Weather Map key](http://openweathermap.org/appid). Store them in the config file located on [server/config.js](server/config.js).

Install [Node.js](https://nodejs.org/). This application was developed using v7.4.0.

1. Installing dependencies:
    ```shell
    $ npm install
    ```
2. Building:

    ```shell
    > $ npm run build:all
    ```
    
3. Running
    1. Development mode
        ```shell
        $ npm run run:dev
        ```
    2. Production mode:
        ```shell
        $ npm run run:prod
        ```
    3. Rebuild all the application and run at development mode:
        ```shell
        $ npm run start:dev
        ```
    4. Rebuild all the application and run at development mode:
        ```shell
        $ npm run start:dev
        ```

## Running tests
```shell
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

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details