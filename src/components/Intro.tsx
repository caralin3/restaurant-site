import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ProfileData } from '../types';
import styles from './Intro.module.scss';

interface IntroProps {}

interface IntroPropsWithData {
  data: ProfileData;
}

export const IntroComponent: React.SFC<IntroPropsWithData> = ({data}) => {
  const intro = data.allContentfulProfile.edges[0].node.intro.intro;

  return (
    <div className={styles.intro}>
      <p className={styles.introTitle}>Welcome</p>
      <div className={styles.introText}>
        <p>{intro}</p>
      </div>
    </div>
  );
};

export const Intro: React.SFC<IntroProps> = (props) => (
  <StaticQuery
    query={IntroQuery}
    render={(data: ProfileData) => <IntroComponent data={data} {...props} />}
  />
);

const IntroQuery = graphql`
  query {
    allContentfulProfile {
      edges {
        node {
          intro {
            intro
          }
        }
      }
    }
  }
`;
