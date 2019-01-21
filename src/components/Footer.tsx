import React from 'react'
import styles from './Footer.module.scss'
import { formatPhone } from '../utils/formatter';

interface FooterProps {
  address: string;
  phone: number;
  title: string;
  year: number;
}

export const Footer: React.SFC<FooterProps> = (props) => (
  <footer className={styles.footer}>
    <small className={styles.footerCopyright}>
      &copy; {props.year} {props.title}
    </small>
    <span className={styles.footerContact}>
      <p className={styles.footerAddress}>{props.address}</p>
      <p className={styles.footerAddress}>{formatPhone(props.phone)}</p>
    </span>
    <span className={styles.footerSocial}>
      <i className="fab fa-facebook-square" />
      <i className="fab fa-twitter-square" />
      <i className="fab fa-instagram" />
    </span>
  </footer>
)
