import { graphql } from 'gatsby'
import { get } from 'lodash';
import React from 'react'
import Helmet from 'react-helmet'
import './Index.module.scss'
import styles from './Home.module.scss'
import { Hero, Intro, Layout, LocationHours } from '../components';
import { Address, ContentfulHours, IndexData, Location } from '../types';
import { sortDays } from '../utils';

interface IndexProps {
  data: IndexData
}

export default class Index extends React.Component<IndexProps> {

  private getAddress = (location: Location) => ({
    city: location.city,
    phone: location.phone,
    state: location.state,
    street: location.street,
    zipCode: location.zipCode
  })

  public render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const location: Location = get(this, 'props.data.allContentfulLocations.edges')[0].node;
    const hours: ContentfulHours[] = sortDays(get(this, 'props.data.allContentfulHours.edges'));
    const address: Address = this.getAddress(location);

    return (
      <Layout address={address} siteTitle={siteTitle}>
        <Helmet title={siteTitle} />
        <Hero
          image={location.heroImage}
          phone={address.phone}
          title={siteTitle}
        />
        <div className={styles.homeContent}>
          <Intro />
          <LocationHours
            hours={hours}
            location={address}
          />
        </div>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
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
    allContentfulHours {
      edges {
        node {
          daysOfTheWeek
          open
          close
        }
      }
    }
  }
`
