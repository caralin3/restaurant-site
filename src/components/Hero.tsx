import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { HeroData } from '../types';
import { formatPhone } from '../utils/formatter';
import styles from './Hero.module.scss';

interface HeroProps {}

interface HeroPropsWithData {
  data: HeroData;
}

export const HeroComponent: React.SFC<HeroPropsWithData> = ({data}) => {
  const title = data.site.siteMetadata.title;
  const phone = data.allContentfulLocations.edges[0].node.phone;
  const heroImage = data.allContentfulLocations.edges[0].node.heroImage as any;

  return (
    <div className={styles.hero}>
      <Img className={styles.heroImage} alt={title} fluid={heroImage.fluid} />
      <div className={styles.heroDetails}>
        <p className={styles.heroTitle}>{title}</p>
        <a className={styles.heroButton} href="/menu">View Menu</a>
        <p className={styles.heroPhone}>
          Call <strong>{formatPhone(phone)}</strong> to Order
        </p>
      </div>
    </div>
  );
}

export const Hero: React.SFC<HeroProps> = (props) => (
  <StaticQuery
    query={HeroQuery}
    render={(data: HeroData) => <HeroComponent data={data} {...props} />}
  />
);

export const HeroQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulLocations {
      edges {
        node {
          street
          city
          state
          zipCode
          phone
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
               ...GatsbyContentfulFluid_tracedSVG
              }
          }
        }
      }
    }
  }
`
