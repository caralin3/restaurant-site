
import React from 'react';
import { Layout } from '../components';
import '../appearance/styles/Index.module.scss';
// import styles from '../appearance/styles/Home.module.scss';

interface CateringProps {}

export default class Catering extends React.Component<CateringProps> {
  public render() {
    return (
      <Layout>
        <h1>Catering</h1>
      </Layout>
    );
  }
}
