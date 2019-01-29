import React from 'react';
import Img from 'gatsby-image';
import { formatPhone } from '../utils/formatter';
import styles from './Hero.module.scss';

interface HeroProps {
  image: any;
  title: string;
  phone: number;
}

export const Hero: React.SFC<HeroProps> = (props) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={props.title} fluid={props.image.fluid} />
    <div className={styles.heroDetails}>
      <p className={styles.heroTitle}>{props.title}</p>
      <a className={styles.heroButton} href="/menu">View Menu</a>
      <p className={styles.heroPhone}>
        Call <strong>{formatPhone(props.phone)}</strong> to Order
      </p>
    </div>
  </div>
)
