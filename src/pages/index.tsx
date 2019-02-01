
import React from 'react';
import { Coupons, Hero, Intro, Layout, LocationHours } from '../components';
import '../appearance/styles/Index.module.scss';
import styles from '../appearance/styles/Home.module.scss';

interface IndexProps {}

export default class Index extends React.Component<IndexProps> {
  public render() {
    return (
      <Layout>
        <Hero />
        <div className={styles.homeContent}>
          <Intro />
          <LocationHours />
        </div>
        <Coupons />
      </Layout>
    );
  }
}
