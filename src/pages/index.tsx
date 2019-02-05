
import { graphql } from 'gatsby';
import { get } from 'lodash';
import React from 'react';
import { Hero, Hours, Layout } from '../components';
import styles from '../appearance/styles/Home.module.scss';
import '../appearance/styles/Index.module.scss';

interface IndexProps {}

export default class Index extends React.Component<IndexProps> {
  public render() {
    const ourStory: string = get(this, 'props.data.allContentfulProfile.edges[0].node.ourStory');
    const catering: string = get(this, 'props.data.allContentfulProfile.edges[0].node.cateringDescription');

    return (
      <Layout>
        <Hero />
        <div className={styles.container}>
          <div className={styles.info}>
            <h3 className={styles.info_title}>Our Story</h3>
            <p className={styles.info_copy}>{ourStory}</p>
          </div>
          <div className={styles.hours}><Hours /></div>
          <div className={styles.info}>
            <h3 className={styles.info_title}>We Cater</h3>
            <p className={styles.info_copy}>{catering}</p>
            <a className={styles.info_button} href="/catering">Book Now</a>
          </div>
        </div>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    allContentfulProfile {
      edges {
        node {
          ourStory
          cateringDescription
        }
      }
    }
  }
`;
