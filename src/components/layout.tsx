import React from 'react'
import { Address } from '../types';
import styles from './Layout.module.scss'
import { Navigation, Footer } from '.';

interface LayoutProps {
  address: Address;
  siteTitle: string;
}

export const Layout: React.SFC<LayoutProps> = (props) => (
  <div className={styles.layout}>
    <Navigation title={props.siteTitle} />
    <div className={styles.layout}>
      {props.children}
    </div>
    <Footer
      address={props.address}
      title={props.siteTitle}
    />
  </div>
)
