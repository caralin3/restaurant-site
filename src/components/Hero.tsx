import React from 'react'
import Img from 'gatsby-image'
import styles from './hero.module.scss'

interface HeroProps {
  image: any;
  title: string;
  subtitle: string;
  phone: string;
}

export const Hero: React.SFC<HeroProps> = (props) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={props.title} fluid={props.image.fluid} />
    <div className={styles.heroDetails}>
      <p className={styles.heroTitle}>{props.title}</p>
      <p>{props.subtitle}</p>
      <button className={styles.button}>View Menu</button>
      <p>CALL {props.phone} TO ORDER </p>
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
