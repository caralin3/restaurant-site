import React from 'react';
import styles from './MenuCategory.module.scss';
import { Food, MenuSection } from '../types';
import { formatMoneyNoSign } from '../utils';

interface MenuCategoryProps {
  section: MenuSection;
  items: Food[];
}

export const MenuCategory: React.SFC<MenuCategoryProps> = ({section, items}) => (
  <div className={styles.menuSection}>
    <p className={styles.menuSection_title}>{section.title}</p>
    {!!section.subtitle &&
      <p className={styles.menuSection_subtitle}>
        {section.subtitle}
      </p>
    }
    {section.title === 'Salads' &&
      <div className={styles.menuSection_sizes}>
        <p className={styles.menuSection_sizes_small}>Sm</p>
        <p className={styles.menuSection_sizes_large}>Lg</p>
      </div>
    }
    {section.title === 'Soups' &&
      <div className={styles.menuSection_sizes}>
        <p className={styles.menuSection_sizes_small}>Cup</p>
        <p className={styles.menuSection_sizes_large}>Bowl</p>
      </div>
    }
    {section.title === 'Specialty Pizza' &&
      <div className={styles.menuSection_sizes}>
        <p className={styles.menuSection_sizes_small}>16"</p>
        <p className={styles.menuSection_sizes_large}>18"</p>
      </div>
    }
    {items.length > 0 && items.map((food, i) => (
      <div className={styles.menuItem} key={i}>
        <span className={styles.menuItem_name}>{food.name}</span>
        {!!food.priceSmall && <span className={styles.menuItem_price}>{formatMoneyNoSign(food.priceSmall)}</span>}
        {!!food.price && <span className={styles.menuItem_price}>{formatMoneyNoSign(food.price)}</span>}
      </div>
    ))}
    {!!section.note &&
      <p className={styles.menuSection_note}>
        {section.note}
      </p>
    }
  </div>
);
