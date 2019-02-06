import { graphql } from 'gatsby';
import { get } from 'lodash';
import React from 'react';
import styles from '../appearance/styles/Menu.module.scss';
import { Layout, MenuCategory } from '../components';
import { ContentfulFood, ContentfulMenuSection, Food, MenuData, MenuSection } from '../types';

interface CateringMenuProps {
  data: MenuData;
}

interface MenuState {
  food: Food[];
  mobileSections: MenuSection[];
  sections: MenuSection[];
}

export default class CateringMenu extends React.Component<CateringMenuProps, MenuState> {
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
      <Layout pageTitle="Catering Menu">
        <h1 className={styles.menu_title}>Catering Menu</h1>
        <p className={styles.menu_copy}>Sizes are for Half and Full Trays</p>
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
              {sections.slice(0, 2).map((sec => (
                <MenuCategory
                  key={sec.title}
                  section={sec}
                  items={this.getFood(sec.title)}
                />
              )))}
            </div>
            <div className={styles.menu_right}>
              {sections.slice(2).map((sec => (
                <MenuCategory
                  key={sec.title}
                  section={sec}
                  items={this.getFood(sec.title)}
                />
              )))}
          </div>
        </div>}
        <p className={styles.menu_footer}>*Heroes are also available at 5 ft</p>
      </Layout>
    );
  }

  private getSections = () => {
    const menuSections: ContentfulMenuSection[] = get(this, 'props.data.allContentfulMenuSection.edges');
    const mobileSections: MenuSection[] = [];
    const sections: MenuSection[] = [];
    menuSections.forEach(section => {
      const title = section.node.title.toLowerCase();
      if (title !== 'salads' && title !== 'soups' && title !== 'sandwiches' && 
        title !== 'desserts' && title !== 'drinks') {
          mobileSections.push(section.node);
          sections.push(section.node);
      }
    });
    const mobileOrder: string[] = [
      'appetizers',
      'entrees',
      'pizza',
      'toppings',
      'specialty pizza'
    ];
    const ordered: string[] = [
      'appetizers',
      'entrees',
      'pizza',
      'toppings',
      'specialty pizza',
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
      if (edge.node.section.title === section && edge.node.menu === 'catering') {
        food.push(edge.node);
      }
    });
    return food;
  }
}

export const CateringMenuQuery = graphql`
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
