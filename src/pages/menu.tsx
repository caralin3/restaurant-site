import { graphql } from 'gatsby';
import { get } from 'lodash';
import React from 'react';
import styles from '../appearance/styles/Menu.module.scss';
import { Layout, MenuCategory } from '../components';
import { ContentfulFood, ContentfulMenuSection, Food, MenuData, MenuSection } from '../types';

interface MenuProps {
  data: MenuData;
}

interface MenuState {
  food: Food[];
  mobileSections: MenuSection[];
  sections: MenuSection[];
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  public readonly state: MenuState = {
    food: [],
    mobileSections: [],
    sections: []
  };

  public componentDidMount() {
    this.getSections();
  }

  public render() {
    const { mobileSections, sections } = this.state;

    return (
      <Layout pageTitle="Menu">
        <h1 className={styles.menu_title}>Menu</h1>
        <div className={styles.menu_mobile}>
          {mobileSections.length > 0 && mobileSections.map((sec => (
            <MenuCategory
              key={sec.title}
              section={sec}
              items={this.getFood(sec.title)}
            />
          )))}
        </div>
        {sections.length > 0 &&
          <div className={styles.menu}>
            <div className={styles.menu_left}>
              {sections.slice(0, 4).map((sec => (
                <MenuCategory
                  key={sec.title}
                  section={sec}
                  items={this.getFood(sec.title)}
                />
              )))}
            </div>
            <div className={styles.menu_right}>
              {sections.slice(4).map((sec => (
                <MenuCategory
                  key={sec.title}
                  section={sec}
                  items={this.getFood(sec.title)}
                />
              )))}
          </div>
        </div>}
      </Layout>
    );
  }

  private getSections = () => {
    const menuSections: ContentfulMenuSection[] = get(this, 'props.data.allContentfulMenuSection.edges');
    const mobileSections: MenuSection[] = [];
    const sections: MenuSection[] = [];
    menuSections.forEach(section => {
      mobileSections.push(section.node);
      sections.push(section.node);
    });
    const mobileOrder: string[] = [
      'appetizers', 'salads', 'soups',
      'pizza', 'toppings', 'specialty pizza',
      'entrees', 'sandwiches', 'desserts', 'drinks'
    ];
    const ordered: string[] = [
      'appetizers',
      'salads',
      'soups',
      'entrees',
      'pizza',
      'toppings',
      'specialty pizza',
      'sandwiches',
      'desserts',
      'drinks'
    ];
    mobileSections.sort((t1: MenuSection, t2: MenuSection) =>
      mobileOrder.indexOf(t1.title.toLowerCase()) - mobileOrder.indexOf(t2.title.toLowerCase()));
    sections.sort((t1: MenuSection, t2: MenuSection) =>
      ordered.indexOf(t1.title.toLowerCase()) - ordered.indexOf(t2.title.toLowerCase()));
    this.setState({ mobileSections, sections });
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
          image {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
