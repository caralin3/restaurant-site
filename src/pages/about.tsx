
import React from 'react';
import { Intro, Layout, LocationHours } from '../components';
import '../appearance/styles/Index.module.scss';
import styles from '../appearance/styles/Home.module.scss';

interface AboutProps {}

export default class About extends React.Component<AboutProps> {
  public render() {
    return (
      <Layout>
        <h1>About</h1>
        <Intro />
      </Layout>
    );
  }
}
