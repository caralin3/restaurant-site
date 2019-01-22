import React from 'react'
import styles from './Footer.module.scss'
import { formatPhone } from '../utils/formatter';
import { Address } from '../types';

interface FooterProps {
  address: Address
  title: string;
}

export const Footer: React.SFC<FooterProps> = (props) => (
  <footer className={styles.footer}>
    <small className={styles.footerCopyright}>
      &copy; {new Date().getFullYear()} {props.title}
    </small>
    <span className={styles.footerContact}>
      <p className={styles.footerAddress}>
        {`${props.address.street}
          ${props.address.city}, 
          ${props.address.state}
        `}
      </p>
      <p className={styles.footerAddress}>
        {formatPhone(props.address.phone)}
      </p>
    </span>
    <span className={styles.footerSocial}>
      <i className="fab fa-facebook-square" />
      <i className="fab fa-twitter-square" />
      <i className="fab fa-instagram" />
    </span>
  </footer>
)
