import { graphql } from 'gatsby';
import { get } from 'lodash';
import React from 'react';
import { Layout, MenuCategory } from '../components';
import { ContentfulFood, ContentfulMenuSection, Food, MenuData, MenuSection } from '../types';
import styles from '../appearance/styles/Menu.module.scss';

interface MenuProps {
  data: MenuData;
}

interface MenuState {
  food: Food[];
  sections: MenuSection[];
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  public readonly state: MenuState = {
    food: [],
    sections: []
  };

  public componentDidMount() {
    this.getSections();
  }

  public render() {
    const { sections } = this.state;

    return (
      <Layout pageTitle="Menu">
        <div className={styles.menu}>
          {sections.length > 0 && sections.map((sec => (
            <MenuCategory
              key={sec.title}
              section={sec}
              items={this.getFood(sec.title)}
            />
          )))}
        </div>
      </Layout>
    );
  }

  private getSections = () => {
    const menuSections: ContentfulMenuSection[] = get(this, 'props.data.allContentfulMenuSection.edges');
    const sections: MenuSection[] = [];
    menuSections.forEach(section => {
      sections.push(section.node);
    });
    const ordered: string[] = [
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
    sections.sort((t1: MenuSection, t2: MenuSection) =>
      ordered.indexOf(t1.title.toLowerCase()) - ordered.indexOf(t2.title.toLowerCase()));
    this.setState({ sections });
  }

  private getFood = (section: string) => {
    const foodData: ContentfulFood[] = get(this, 'props.data.allContentfulFood.edges');
    const food: Food[] = [];
    foodData.forEach(edge => {
      if (edge.node.section.title === section) {
        food.push(edge.node);
      }
    });
    return food;
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
            note
          }
          meal
          menu
          price
          priceSmall
          shortDescription
        }
      }
    }
    allContentfulMenuSection {
      edges {
        node {
          title
          note
        }
      }
    }
  }
`;
