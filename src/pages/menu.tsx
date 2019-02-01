import { graphql } from 'gatsby';
import { get } from 'lodash';
import React from 'react';
import { Layout } from '../components';
import { ContentfulFood, FoodData } from '../types';
import styles from '../appearance/styles/Menu.module.scss';

interface MenuProps {
  data: FoodData;
}

export default class Menu extends React.Component<MenuProps> {
  public render() {
    const food: ContentfulFood[] = get(this, 'props.data.allContentfulFood.edges');
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
    ];

    const section = (header: string) => (
      food.map((edge, i) => {
        const sectionTitle = edge.node.section.title.toLowerCase();
        const menu = edge.node.menu;
        if (sectionTitle === header && menu === 'general') {
          return (
            <div key={i}>
              {edge.node.name}
            </div>
          );
        }
      })
    );

    return (
      <Layout pageTitle="Menu">
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
    allContentfulFood {
      edges {
        node {
          name
          section {
            title
          }
          meal
          menu
          price
          shortDescription
        }
      }
    }
  }
`;
