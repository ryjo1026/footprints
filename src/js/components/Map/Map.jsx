import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  KmlLayer,
} from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import { getNearestRoad, getNearestRoads } from '../../api/map';
import Overlay from '../Overlay/Overlay';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

const DEFAULT_CENTER = { lat: 42.28, lng: -83.74 };

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

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heatmapData: [],
      isMarkerShown: false,
      markerPosition: DEFAULT_CENTER,
    };
  }

  componentDidMount() {
    const data = [];
    for (let i = 0; i < 25; i++) {
      data.push(
        new google.maps.LatLng({
          lat: Math.random() * 0.01 + 42.275,
          lng: Math.random() * 0.01 - 83.752,
        })
      );
    }

    // getNearestRoad(new google.maps.LatLng(DEFAULT_CENTER)).then(console.log);

    getNearestRoads(data)
      .then((res) =>
        res.map(
          (d) => new google.maps.LatLng({ lat: d.latitude, lng: d.longitude })
        )
      )
      .then((heatmapData) => this.setState({ heatmapData }));
    return data;
  }

  createMockData = () => {};

  handleAddMarker = () => {
    this.setState({ markerPosition: DEFAULT_CENTER, isMarkerShown: true });
  };

  handleSetMarker = () => {
    const { markerPosition } = this.state;

    getNearestRoad(new google.maps.LatLng(markerPosition))
      .then(
        (res) =>
          new google.maps.LatLng({ lat: res.latitude, lng: res.longitude })
      )
      .then((heatmapPoint) =>
        this.setState((prevState) => ({
          heatmapData: [...prevState.heatmapData, heatmapPoint],
          isMarkerShown: false,
        }))
      );
  };

  handleMarkerPositionchange = () => {
    const lat = this.marker.getPosition().lat();
    const lng = this.marker.getPosition().lng();

    this.setState({
      markerPosition: { lat, lng },
    });
  };

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
          <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            {heatmapData.map((marker) => (
              <Marker position={marker} />
            ))}
          </MarkerClusterer>
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
