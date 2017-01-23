import { googlePlaces } from './config';
import axios from 'axios';

export default class Places {

    getPlacesNearby(latitude, longitude, radius, types) {
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/" +
            "json?location=" + latitude + "," + longitude + "&radius=" + radius +
            "&key=" + googlePlaces.key

        if (typeof types !== 'undefined')
            url += "&types=" + types.map(m => m.trim().split(' ').join('_'))
                .join("|");

        return new Promise((resolve, reject) => {
            axios.get(url).then((response) => {
                if (response.status === 200)
                    return resolve(response.data);

                return reject(response);
            }, reject);

        })

    }

    getPicturesFromPlaces(placeList) {
        let places = placeList
            .filter((p) => typeof p.photos !== 'undefined')
            .map((place) => {
                return place.photos.map((photo) => {
                    return {
                        place_name: place.name,
                        photo_reference: photo.photo_reference,
                        photo_width: photo.width,
                        attributions: photo.html_attributions
                    }
                })
            })
        places = [].concat.apply([], places);
        return places.sort((a, b) => {

            if (a.photo_width === b.photo_width)
                return 0;

            return a.photo_width > b.photo_width ? 1 : -1;
        }).reverse();

    }

    getPlacePicture(reference, maxwidth) {

        if (typeof maxwidth != 'number' || maxwidth === null || isNaN(maxwidth))
            maxwidth = 1600

        if (maxwidth > 1600)
            maxwidth = 1600;

        let url = "https://maps.googleapis.com/maps/api/place/photo?"
            + "maxwidth=" + maxwidth
            + "&photoreference=" + reference
            + "&key=" + googlePlaces.key;

        return new Promise((resolve, reject) => {
            axios.get(url).then((response) => {
                resolve(response.request._currentUrl);
            }, reject);

        })
    }
}