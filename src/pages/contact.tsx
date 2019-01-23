import { graphql } from 'gatsby'
import { get } from 'lodash';
import React from 'react'
import { Layout } from '../components';
import { Address, IndexData, Location } from '../types';
import { getAddress } from '../utils';
import styles from './Contact.module.scss'


interface ContactProps {
  data: IndexData
}

export default class Contact extends React.Component<ContactProps> {
  public render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const location: Location = get(this, 'props.data.allContentfulLocations.edges')[0].node;
    const address: Address = getAddress(location);

    return (
      <Layout address={address} siteTitle={siteTitle} pageTitle="Contact">
        <div className={styles.contact}>
          <h2>Contact Us</h2>
        </div>
      </Layout>
    );
  }
}

export const ContactQuery = graphql`
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
