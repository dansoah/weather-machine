// we need 'babel-polyfill' for async/await.
import 'babel-polyfill';

import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import views from 'koa-views';
import serve from 'koa-static';

import path from 'path';

import exceptionGrabber from './exception-grabber';

console.log(process.env.NODE_ENV);
const root = process.env.NODE_ENV === 'production'
                        ? __dirname
                        : path.join(__dirname,'../');
const static_files = path.join(root,'app-dist');

const app = new Koa();
const router = Router();
app.use(exceptionGrabber)
    .use(BodyParser())
    .use(serve(static_files))
    .use(views(root, {
        map:{
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

app.listen(5050, () => console.log('Listening on port 5050.'));

export default app;