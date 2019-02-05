import React from 'react';
import {Map, MapProps, Marker, GoogleApiWrapper} from 'google-maps-react';

interface MapContainerProps extends MapProps {
  location: {
    lat: number,
    lng: number
  };
} 

export class MapComponent extends React.Component<MapContainerProps> {
  public render() {
    const GoogleMap = (props: any) => <Map {...props} /> as any;

    return (
      <GoogleMap
        google={this.props.google}
        zoom={14}
        containerStyle={{position: 'relative'}}
        style={{width: '100%', height: '300px'}}
        initialCenter={this.props.location}
      >
        <Marker
          title={'Joe\'s Pizzeria and Restaurant'}
          position={this.props.location}
        />
      </GoogleMap>
    );
  }
}

export const MapContainer = GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY as string
})(MapComponent);