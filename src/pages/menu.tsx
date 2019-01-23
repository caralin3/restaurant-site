import { graphql } from 'gatsby'
import { get } from 'lodash';
import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components';
import { Address, ContentfulFood, MenuData, Location } from '../types';
import { getAddress } from '../utils';
// import styles from './Menu.module.scss'

interface MenuProps {
  data: MenuData
}

export default class Menu extends React.Component<MenuProps> {

  public render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const location: Location = get(this, 'props.data.allContentfulLocations.edges')[0].node;
    const food: ContentfulFood[] = get(this, 'props.data.allContentfulFood.edges');
    const address: Address = getAddress(location);

    return (
      <Layout address={address} siteTitle={siteTitle}>
        <Helmet title={`Menu | ${siteTitle}`} />
        {food.map((edge, i) => (
          <div key={i}>
            {edge.node.name}
          </div>
        ))}
      </Layout>
    );
  }
}

export const MenuQuery = graphql`
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
    allContentfulFood {
      edges {
        node {
          name
          meal
          price
          shortDescription
          type
        }
      }
    }
  }
`
