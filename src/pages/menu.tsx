import { graphql } from 'gatsby'
import { get } from 'lodash';
import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components';
import { Address, ContentfulFood, MenuData, Location } from '../types';
import { getAddress } from '../utils';
import styles from './Menu.module.scss'
import favicon from '../appearance/images/pizza.jpg';

interface MenuProps {
  data: MenuData
}

export default class Menu extends React.Component<MenuProps> {
  public render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const location: Location = get(this, 'props.data.allContentfulLocations.edges')[0].node;
    const food: ContentfulFood[] = get(this, 'props.data.allContentfulFood.edges');
    const address: Address = getAddress(location);
    const sections: string[] = [
      'appetizers',
      'salads',
      'soups',
      'pizza',
      'toppings',
      'specialty pizza',
      'sandwiches',
      'desserts',
      'drinks'
    ]

    const section = (header: string) => (
      food.map((edge, i) => {
        if (edge.node.type === header) {
          return (
            <div key={i}>
              {edge.node.name}
            </div>
          )
        }
      })
    );

    return (
      <Layout address={address} siteTitle={siteTitle} pageTitle="Menu">
        <div className={styles.menu}>
          {sections.map((sec => (
            <div className={styles.section} key={sec} style={{gridArea: sec.replace(/\s/g, '')}}>
              <p className={styles.section_header}>{sec}</p>
              {section(sec)}
            </div>
          )))}
        </div>
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
