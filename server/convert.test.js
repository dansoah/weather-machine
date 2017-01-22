import test from 'ava';
import {kelvinToCelsius as k2c} from './convert';
import {kelvinToFahrenheit as k2f} from './convert';

test('kelvinToCelsius | Must return 0 if temperature is not a number', t => {
    t.is(k2c("a"),0,"Is allowing strings");
    t.is(k2c(null),0,"Is allowing null");
    t.is(k2c(),0,"Is allowing undefined");
    t.is(k2c(true),0,"Is allowing bool(true)");
    t.is(k2c(false),0,"Is allowing bool(false)");
    t.not(k2c(5),0,"Is not allowing numbers");
});

test('kelvinToCelsius | Must return 0 if temperature is negative', t => {
    t.is(k2c(-10),0);
    t.is(k2c(-234234),0);
    t.is(k2c(-4567),0);
});

test('kelvinToCelsius | Should obey celsius scale', t => {
    const k2c0 = (-273.15).toFixed(2);
    const k2c10 = (-263.15).toFixed(2);
    const k2c100 = (-173.15).toFixed(2);
    const k2c200 = (-73.15).toFixed(2);
    const k2c300 = (26.85).toFixed(2);
    const k2c400 = (126.85).toFixed(2);

    t.is(k2c(0),k2c0,"Wrong result for 0ºK");
    t.is(k2c(10),k2c10,"Wrong result for 10ºK");
    t.is(k2c(100),k2c100,"Wrong result for 100ºK");
    t.is(k2c(200),k2c200,"Wrong result for 200ºK");
    t.is(k2c(300),k2c300,"Wrong result for 300ºK");
    t.is(k2c(400),k2c400,"Wrong result for 400ºK");
});

test('kelvinToCelsius | Must return 0 if temperature is negative', t => {
    t.is(k2f(-10),0);
    t.is(k2f(-234234),0);
    t.is(k2f(-4567),0);
})

test('kelvinToFahrenheit | Must return 0 if temperature is not a number', t => {
    t.is(k2f("a"),0,"Is allowing strings");
    t.is(k2f(null),0,"Is allowing null");
    t.is(k2f(),0,"Is allowing undefined");
    t.is(k2f(true),0,"Is allowing bool(true)");
    t.is(k2f(false),0,"Is allowing bool(false)");
    t.not(k2f(5),0,"Is not allowing numbers");
});

test('kelvinToFahrenheit | Must return correct values', t => {
    const k2f0 = (-459.67).toFixed(2);
    const k2f10 = (-441.67).toFixed(2);
    const k2f100 = (-279.67).toFixed(2);
    const k2f200 = (-99.67).toFixed(2);
    const k2f300 = (80.33).toFixed(2);
    const k2f400 = (260.33).toFixed(2);

    t.is(k2f(0),k2f0, "Wrong value for 0ºK");
    t.is(k2f(10),k2f10, "Wrong value for 10ºK");
    t.is(k2f(100),k2f100, "Wrong value for 100ºK");
    t.is(k2f(200),k2f200, "Wrong value for 200ºK");
    t.is(k2f(300),k2f300, "Wrong value for 300ºK");
    t.is(k2f(400),k2f400, "Wrong value for 400ºK");
});