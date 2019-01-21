import React from 'react'
import styles from './LocationHours.module.scss'

interface LocationHoursProps {}

interface LocationHoursState {

}

export class LocationHours extends React.Component<LocationHoursProps, LocationHoursState> {

  public render() {
    const street = '12 Address St';
    const city = 'City Town, ST 14576';
    const address = street + ' ' + city;
    const mapsLink = `http://maps.google.com/?q=${address}`;

    return (
      <div className={styles.locationHours}>
        <div className={styles.container}>
          <p className={styles.title}>Hours</p>
          <span className={styles.hour}>
            <p className={styles.label}>Monday-Thursday</p>
            <p className={styles.details}>11:30am - 7:30pm</p>
          </span>
          <span className={styles.hour}>
            <p className={styles.label}>Friday-Saturday</p>
            <p className={styles.details}>11am - 9pm</p>
          </span>
          <span className={styles.hour}>
            <p className={styles.label}>Sunday</p>
            <p className={styles.details}>12pm - 7:30pm</p>
          </span>
        </div>
        <div className={styles.container}>
          <p className={styles.title}>Location</p>
          <p className={styles.details}>{street}</p>
          <p className={styles.details}>{city}</p>
          <a className={styles.locationLink} href={mapsLink} target="_blank">
            Get Directions
          </a>
        </div>
      </div>
    )
  }
}
