import React from 'react';
import Map from './Map/index';

import '../../sass/main.scss';

const MAPS_URL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCOzeOHT1tovidiIL9uVNODS0REn9Ciy-s';

export default function Home() {
  return (
    <div>
      <Map
        isMarkerShown
        googleMapURL={MAPS_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
