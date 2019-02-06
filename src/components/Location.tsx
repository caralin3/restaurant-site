import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { formatPhone } from '../utils';
import { LocationData } from '../types';
import styles from './Location.module.scss';
import { MapContainer } from './';

interface LocationProps {}

interface LocationPropsWithData {
  data: LocationData;
}

export const LocationComponent: React.SFC<LocationPropsWithData> = ({data}) => {
  const location = data.allContentfulLocations.edges[0].node;
  const { city, phone, state, street, zipCode } = location;
  const address = `${street} ${city}, ${state}`;
  const mapsLink = `http://maps.google.com/?q=${address}`;
  const coordinates = { lat: 41.0907, lng: 73.9179 };

  return (
    <div className={styles.location}>
      <p className={styles.location_title}>Location</p>
      <p className={styles.location_details}>{street}</p>
      <p className={styles.location_details}>{`${city}, ${state} ${zipCode}`}</p>
      <p className={styles.location_details}>{formatPhone(phone)}</p>
      <a className={styles.location_link} href={mapsLink} target="_blank">
        Get Directions
      </a>
      <div className={styles.location_map}>
        <MapContainer location={coordinates} />
      </div>
    </div>
  );
};

export const Location: React.SFC<LocationProps> = (props) => (
  <StaticQuery
    query={LocationQuery}
    render={(data: LocationData) => <LocationComponent data={data} {...props} />}
  />
);

const LocationQuery = graphql`
  query {
    allContentfulLocations {
      edges {
        node {
          street
          city
          state
          zipCode
          phone
        }
      }
    }
  }
`;
