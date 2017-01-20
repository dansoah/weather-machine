import test from 'ava';
import exceptionGrabber from './exception-grabber'

test('foo', t => {
    t.fail();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});