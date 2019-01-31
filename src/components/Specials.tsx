import React from 'react';
import styles from './Specials.module.scss';

interface SpecialsProps {}

export const Specials: React.SFC<SpecialsProps> = (props) => (
  <div className={styles.specials}>
    <p className={styles.specialsTitle}>Specials</p>
    <div className={styles.special}>
      <p>2 Liter Soda &amp; Large Pie</p>
      <p>$7.99</p>
    </div>
  </div>
);
