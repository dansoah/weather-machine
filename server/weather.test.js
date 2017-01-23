import test from 'ava';
import moxios from 'moxios';
import sinon from 'sinon';
import Q from 'q';

import Weather from './weather';

test.beforeEach(t => {
    moxios.install();
})

test.afterEach(t => {
    moxios.uninstall();
})

test('getCurrentWeather | Must resolve when status is 200 ', t => {

    return new Promise((resolve, reject) => {

        moxios.withMock(function () {

            let onFulfilled = sinon.spy()
            const w = new Weather();

            w.getCurrentWeather(-16.92, 145.77).then(onFulfilled);

            moxios.wait(function () {
                let request = moxios.requests.mostRecent();
                request.respondWith( {
                    status:200,
                    response:{a:"32"}
                }).then( () => {
                    resolve();
                })
            });
        })

    }).then( () => {
        t.pass();
    })

})

test('getCurrentWeather | Must reject when status is 401 ', t => {

    return new Promise((resolve, reject) => {

        moxios.withMock(function () {

            let onFulfilled = sinon.spy()
            const w = new Weather();

            w.getCurrentWeather(-16.92, 145.77).then(onFulfilled);

            moxios.wait(function () {
                let request = moxios.requests.mostRecent();
                request.respondWith( {
                    status:401,
                    response:{a:"32"}
                }).then( reject, resolve)
            });
        })

    }).then( () => {
        t.fail();
    }, () => {
        t.pass();
    })

})
