import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from 'react-google-maps';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

const createMockData = () => {
    let data = [];
    for (let i = 0; i < 100; i++) {
        data.push(new google.maps.LatLng({ lat: Math.random() * 0.02 + 42.27, lng: Math.random() * 0.02 - 83.753 }));
    }
    return data;
};

const mapStyle = [
    {
        "featureType": "all",
        "stylers": [
            {
                "saturation": 0
            },
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    }
];

export default withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 42.28, lng: -83.74 }}
            options={{styles: mapStyle}}
        >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            <HeatmapLayer
                data={createMockData()}
                options={{
                    gradient: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)', 'rgb(0, 0, 200)', 'rgb(0, 0, 255)']
                }}
            />
            <KmlLayer
                url="http://localhost:9000/test.kml"
                options={{ preserveViewport: true }}
            />
        </GoogleMap>);
}));
