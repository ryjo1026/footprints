import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from 'react-google-maps';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import { getNearestRoads } from '../../api/map.js';

const createMockData = () => {
    let data = [];
    for (let i = 0; i < 100; i++) {
        data.push(new google.maps.LatLng({ lat: Math.random() * 0.01 + 42.275, lng: Math.random() * 0.01 - 83.752 }));
    }
    return data;
};

export default withScriptjs(withGoogleMap((props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getNearestRoads({points: createMockData()})
            .then((res) => res.map((d) => new google.maps.LatLng({lat: d.latitude, lng: d.longitude})))
            .then((res) => setData(res));
    }, []);
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 42.28, lng: -83.74 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            <HeatmapLayer
                data={data}
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
