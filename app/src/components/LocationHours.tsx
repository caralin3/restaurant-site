import React from 'react';
import { Address, ContentfulHours } from '../types';
import styles from './LocationHours.module.scss';

interface LocationHoursProps {
  hours: ContentfulHours[];
  location: Address;
}


export class LocationHours extends React.Component<LocationHoursProps> {

  public render() {
    const { hours, location } = this.props;
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
}
