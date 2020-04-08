import { Client } from "@googlemaps/google-maps-services-js";

const API_KEY = 'AIzaSyCOzeOHT1tovidiIL9uVNODS0REn9Ciy-s';

const client = new Client({});

const snappedPointToPlaceId = (sp) => sp.location;

const getNearestRoads = ({ points }) => {
    const pointsStr = points.map(latLng => `${latLng.lat()},${latLng.lng()}`).reduce((a, b) => `${a}|${b}`);
    return fetch(`https://roads.googleapis.com/v1/nearestRoads?points=${pointsStr}&key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => data.snappedPoints.map((d) => snappedPointToPlaceId(d)));
}

export {
    getNearestRoads,
};

