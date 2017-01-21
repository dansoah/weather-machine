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
import exceptionGrabber from './exception-grabber';

const root = process.env.NODE_ENV === 'production'
    ? __dirname
    : path.join(__dirname, '../');
const static_files = path.join(root, 'app-dist');

const app = new Koa();
const router = Router();
app.use(exceptionGrabber)
    .use(BodyParser())
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
    ctx.body = {
        "lat": "-23.4733",
        "long": "-46.6658",
    }
});

router.get('/city-info', async (ctx, next) => {
    let lat = ctx.query.latitude;
    let long = ctx.query.longitude;
    
    let g = new Geolocation();
    await g.getCityInfoByLatLong(lat,long).then( (data) => {
        ctx.body = {name: data};
    }).catch( (e) => console.log("deu erro",e))

});



app.listen(5050, () => console.log('Listening on port 5050.'));

export default app;