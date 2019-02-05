
import React from 'react';
import { Layout } from '../components';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import { ContentfulProfile, ProfileData } from '../types';
// import styles from '../appearance/styles/Home.module.scss';
import '../appearance/styles/Index.module.scss';

interface AboutProps {
  data: ProfileData;
}

export default class About extends React.Component<AboutProps> {
  public render() {
    const profile: ContentfulProfile[] = get(this, 'props.data.allContentfulProfile.edges');
    // const intro = profile[0].node.intro.intro;
    const bio = profile[0].node.longBio.childMarkdownRemark.html;

    return (
      <Layout>
        <h1>About</h1>
        {/* <p>{intro}</p> */}
        <div dangerouslySetInnerHTML={{ __html: bio }} />
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
