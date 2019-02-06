
import React from 'react';
import { Layout } from '../components';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import { ContentfulProfile, ProfileData } from '../types';
import styles from '../appearance/styles/About.module.scss';
import '../appearance/styles/Index.module.scss';

interface AboutProps {
  data: ProfileData;
}

export default class About extends React.Component<AboutProps> {
  public render() {
    const profile: ContentfulProfile[] = get(this, 'props.data.allContentfulProfile.edges');
    const bio = profile[0].node.longBio.childMarkdownRemark.html;

    return (
      <Layout>
        <div className={styles.about}>
          <h1 className={styles.about_header}>About</h1>
          <div dangerouslySetInnerHTML={{ __html: bio }} />
        </div>
      </Layout>
    );
  }
}

export const AboutQuery = graphql`
  query {
    allContentfulProfile {
      edges {
        node {
          longBio {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
