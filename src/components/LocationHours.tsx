import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ContentfulHours, LocationHoursData } from '../types';
import { sortDays } from '../utils';
import styles from './LocationHours.module.scss';

interface LocationHoursProps {}

interface LocationHoursPropsWithData {
  data: LocationHoursData;
}


export const LocationHoursComponent: React.SFC<
  LocationHoursPropsWithData
> = ({data}) => {
  const hours: ContentfulHours[] = sortDays(data.allContentfulHours.edges);
  const location = data.allContentfulLocations.edges[0].node;
  const { city, state, street, zipCode } = location;
  const address = `${street} ${city}, ${state}`;
  const mapsLink = `http://maps.google.com/?q=${address}`;

  return (
    <div className={styles.locationHours}>
      <div className={styles.container}>
        <p className={styles.title}>Hours</p>
        {hours.map((edge, i) => (
          <span className={styles.hour} key={i}>
            <p className={styles.label}>
              {edge.node.daysOfTheWeek}
            </p>
            <p className={styles.details}>
              {`${edge.node.open} - ${edge.node.close}`}
            </p>
          </span>
        ))}
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Location</p>
        <p className={styles.details}>{street}</p>
        <p className={styles.details}>{`${city}, ${state} ${zipCode}`}</p>
        <a className={styles.locationLink} href={mapsLink} target="_blank">
          Get Directions
        </a>
      </div>
    </div>
  )
}

export const LocationHours: React.SFC<LocationHoursProps> = (props) => (
  <StaticQuery
    query={LocationHoursQuery}
    render={(data: LocationHoursData) => <LocationHoursComponent data={data} {...props} />}
  />
);

export const LocationHoursQuery = graphql`
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
    allContentfulHours {
      edges {
        node {
          daysOfTheWeek
          open
          close
        }
      }
    }
  }
`
