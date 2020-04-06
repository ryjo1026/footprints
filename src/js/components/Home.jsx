import React from 'react';
import Map from './Map/index.jsx';

export default function Home() {
  return <Map 
    isMarkerShown
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    >
      
    </Map>;
}
