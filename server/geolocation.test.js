import test from 'ava';
import Geolocation from './geolocation';


test('latitudeIsValid | Latitude must be a number', t => {
    let g = new Geolocation();
    t.false(
        g.latitudeIsValid(),
        "Accepting undefined");
    t.false(
        g.latitudeIsValid("a"),
        "Accepting \"a\"");
    t.true(
        g.latitudeIsValid("1"),
        "Accepting \"1\"");
    t.true(
        g.latitudeIsValid(1),
        "Not accepting positive integer");
    t.true(
        g.latitudeIsValid(-1),
        "Not accepting negative integer");
    t.true(
        g.latitudeIsValid(-48.354812),
        "Not accepting negative double");
    t.true(
        g.latitudeIsValid(22.927381),
        "not accepting positive double");
});

test('latitudeIsValid | Latitude must be a number between -90 and 90', t => {
    //Equator is 0º, North pole is 90º, South pole is -90º (or 90º south)
    let g = new Geolocation();

    t.false(
        g.latitudeIsValid(91),
        "Allowing integer > 90");
    t.false(
        g.latitudeIsValid(-91),
        "Allowing integer < -90");
    t.false(
        g.latitudeIsValid(90.0000001),
        "Allowing decimal > 90");
    t.false(
        g.latitudeIsValid(-90.0000001),
        "Allowing decimal < -90");
    t.true(
        g.latitudeIsValid(-32.405078),
        "Not allowing negtive decimal");
    t.true(
        g.latitudeIsValid(5.001924),
        "Not allowing positive decimal");

});

test('longitudeIsValid | Longitude must be a number', t => {
    let g = new Geolocation();
    t.false(
        g.longitudeIsValid(),
        "Accepting undefined");
    t.false(
        g.longitudeIsValid("a"),
        "Accepting \"a\"");
    t.true(
        g.longitudeIsValid("1"),
        "Not accepting \"1\"");
    t.true(
        g.longitudeIsValid(0),
        "Not accepting zero")
    t.true(
        g.longitudeIsValid(1),
        "Not accepting positive integer");
    t.true(
        g.longitudeIsValid(-1),
        "Not accepting negative integer");
    t.true(
        g.longitudeIsValid(-48.354812),
        "Not accepting negative double");
    t.true(
        g.longitudeIsValid(22.927381),
        "not accepting positive double");
});

test('longitudeIsValid | longitude must be a number between -90 and 90', t => {
    //Greenwich is 0, -1 ~ -180 is eastern and 1 ~ 180 is western
    let g = new Geolocation();

    t.true(
        g.longitudeIsValid(0),
        "Not accepting zero")
    t.false(
        g.longitudeIsValid(181),
        "Allowing integer > 180");
    t.false(
        g.longitudeIsValid(-181),
        "Allowing integer < -180");
    t.false(
        g.longitudeIsValid(180.0000001),
        "Allowing decimal > 180");
    t.false(
        g.longitudeIsValid(-180.0000001),
        "Allowing decimal < -180");
    t.true(
        g.longitudeIsValid(-32.405078),
        "Not allowing negtive decimal");
    t.true(
        g.longitudeIsValid(5.001924),
        "Not allowing positive decimal");

});