import React, { useEffect, useState } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  KmlLayer,
} from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import { getNearestRoads } from '../../api/map.js';
import Overlay from '../Overlay/Overlay';

const DEFAULT_CENTER = { lat: 42.28, lng: -83.74 };

const createMockData = () => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push(
      new google.maps.LatLng({
        lat: Math.random() * 0.01 + 42.275,
        lng: Math.random() * 0.01 - 83.752,
      })
    );
  }
  return data;
};

const mapStyle = [
  {
    featureType: 'all',
    stylers: [
      {
        saturation: 0,
      },
      {
        hue: '#e7ecf0',
      },
    ],
  },
  {
    featureType: 'road',
    stylers: [
      {
        saturation: -70,
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        saturation: -60,
      },
    ],
  },
];

// export default withScriptjs(
//   withGoogleMap((props) => {
//     const [data, setData] = useState([]);
//     useEffect(() => {
//       getNearestRoads({ points: createMockData() })
//         .then((res) =>
//           res.map(
//             (d) => new google.maps.LatLng({ lat: d.latitude, lng: d.longitude })
//           )
//         )
//         .then((res) => setData(res));
//     }, []);
//     return (
//       <div>
//         <Overlay addMarker={this.handleAddMarker} />
//         <GoogleMap
//           defaultZoom={16}
//           defaultCenter={DEFAULT_CENTER}
//           options={{ styles: mapStyle }}
//         >
//           {props.isMarkerShown && (
//             <Marker draggable position={DEFAULT_CENTER} />
//           )}
//           <HeatmapLayer
//             data={data}
//             options={{
//               gradient: [
//                 'rgba(255, 255, 255, 0)',
//                 'rgba(255, 255, 255, 1)',
//                 'rgb(0, 0, 200)',
//                 'rgb(0, 0, 255)',
//               ],
//             }}
//           />
//           <KmlLayer
//             url="http://localhost:9000/test.kml"
//             options={{ preserveViewport: true }}
//           />
//         </GoogleMap>
//       </div>
//     );
//   })
// );

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: createMockData(),
      heatmapData: [],
      isMarkerShown: false,
      markerPosition: DEFAULT_CENTER,
    };
  }

  componentDidMount() {
    this.updateMap();
  }

  handleAddMarker = () => {
    this.setState({ markerPosition: DEFAULT_CENTER, isMarkerShown: true });
  };

  handleSetMarker = () => {
    const { markerPosition } = this.state;

    this.setState((prevState) => {
      prevState.points.push(
        new google.maps.LatLng({
          lat: markerPosition.lat,
          lng: markerPosition.lng,
        })
      );
      return {
        points: prevState.points,
      };
    });

    console.log(this.state.points);
    this.updateMap();

    this.setState({ isMarkerShown: false });
  };

  handleMarkerPositionchange = () => {
    const lat = this.marker.getPosition().lat();
    const lng = this.marker.getPosition().lng();

    this.setState({
      markerPosition: { lat, lng },
    });
  };

  updateMap() {
    getNearestRoads({ points: this.state.points })
      .then((res) =>
        res.map(
          (d) => new google.maps.LatLng({ lat: d.latitude, lng: d.longitude })
        )
      )
      .then((heatmapData) => this.setState({ heatmapData }));
  }

  render() {
    const { heatmapData, isMarkerShown, markerPosition } = this.state;

    return (
      <div className="Map">
        <Overlay
          addMarker={this.handleAddMarker}
          setMarker={this.handleSetMarker}
          isMarkerShown={isMarkerShown}
          markerPosition={markerPosition}
        />
        <GoogleMap
          defaultZoom={16}
          defaultCenter={DEFAULT_CENTER}
          options={{ styles: mapStyle }}
        >
          {isMarkerShown && (
            <Marker
              draggable
              position={markerPosition}
              ref={(input) => (this.marker = input)}
              onPositionChanged={this.handleMarkerPositionchange}
            />
          )}
          <HeatmapLayer
            data={heatmapData}
            options={{
              gradient: [
                'rgba(255, 255, 255, 0)',
                'rgba(255, 255, 255, 1)',
                'rgb(0, 0, 200)',
                'rgb(0, 0, 255)',
              ],
            }}
          />
          <KmlLayer
            url="http://localhost:9000/test.kml"
            options={{ preserveViewport: true }}
          />
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
