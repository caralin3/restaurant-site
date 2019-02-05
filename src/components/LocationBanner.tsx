import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { LocationData } from '../types';
import styles from './LocationBanner.module.scss';

interface LocationBannerProps {}

interface LocationBannerPropsWithData {
  data: LocationData;
}

export const LocationBannerComponent: React.SFC<LocationBannerPropsWithData> = ({data}) => {
  const location = data.allContentfulLocations.edges[0].node;
  const { city, state, street, zipCode } = location;
  const address = `${street} ${city}, ${state}`;
  const mapsLink = `http://maps.google.com/?q=${address}`;

  return (
    <div className={styles.banner}>
      <a className={styles.banner_links} href={mapsLink} target="_blank">
        <span className={styles.banner_link}>{street}</span>
        <span className={styles.banner_link}>
        <span className={styles.banner_dot}><i className="fas fa-circle" /></span>
          {city}, {state}
        </span>
        <span className={styles.banner_link}>
          <span className={styles.banner_dot}><i className="fas fa-circle" /></span>
          {zipCode}
        </span>
      </a>
      <p className={styles.banner_deliver}>We Deliver</p>
    </div>
  );
};

export const LocationBanner: React.SFC<LocationBannerProps> = (props) => (
  <StaticQuery
    query={LocationBannerQuery}
    render={(data: LocationData) => <LocationBannerComponent data={data} {...props} />}
  />
);

const LocationBannerQuery = graphql`
  query {
    allContentfulLocations {
      edges {
        node {
          street
          city
          state
          zipCode
        }
      }
    }
  }
`;
