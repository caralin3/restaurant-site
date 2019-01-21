import React from 'react'
import Img from 'gatsby-image'
import styles from './Hero.module.scss'
import { formatPhone } from '../utils/formatter';

interface HeroProps {
  image: any;
  title: string;
  phone: number;
}

export const Hero: React.SFC<HeroProps> = (props) => (
  <div className={styles.hero}>
    {/* <Img className={styles.heroImage} alt={props.title} fluid={props.image.fluid} /> */}
    <img className={styles.heroImage} src={require('../appearance/images/pizza.jpg')} />
    <div className={styles.heroDetails}>
      <p className={styles.heroTitle}>{props.title}</p>
      <button>View Menu</button>
      <p className={styles.heroPhone}>
        Call <strong>{formatPhone(props.phone)}</strong> to Order
      </p>
    </div>
  </div>
)

// export default ({ data }) => (
//   <div className={styles.hero}>
//     <Img className={styles.heroImage} alt={data.name} fluid={data.heroImage.fluid} />
//     <div className={styles.heroDetails}>
//       <h3 className={styles.heroHeadline}>{data.name}</h3>
//       <p className={styles.heroTitle}>{data.title}</p>
//       <p>{data.shortBio.shortBio}</p>
//     </div>
//   </div>
// )
