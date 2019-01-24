import React from 'react';
import Helmet from 'react-helmet';
// import favicon from '../../public/favicon.ico';
import favicon from '../appearance/images/pizza.jpg';
import { Address } from '../types';
import styles from './Layout.module.scss';
import { Navigation, Footer } from '.';

interface LayoutProps {
  address: Address;
  pageTitle?: string;
  siteTitle: string;
}

export const Layout: React.SFC<LayoutProps> = (props) => (
  <div className={styles.layout}>
    <Helmet
      title={!!props.pageTitle ? `${ props.pageTitle} | ${props.siteTitle}` : props.siteTitle}
      link={[{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }]}
    />
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
