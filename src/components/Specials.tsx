import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ContentfulSpecial, Special, SpecialData } from '../types';
import styles from './Specials.module.scss';
import { formatMoney } from '../utils';

interface SpecialsProps {}

interface SpecialsPropsWithData {
  data: SpecialData;
}

export const SpecialsComponent: React.SFC<SpecialsPropsWithData> = ({data}) => {
  const specials: ContentfulSpecial[] = data.allContentfulSpecial.edges;

  return (
    <div className={styles.specials}>
      {specials.map((special, i) => (
        <SpecialItem key={i} special={special.node} />
      ))}
    </div>
  );
};

interface SpecialProps {
  special: Special;
}

export const SpecialItem: React.SFC<SpecialProps> = ({special}) => (
  <div className={styles.special}>
    <p className={styles.specialTitle}>{special.title}</p>
    <p className={styles.specialPrice}>
      {formatMoney(special.price)} + TAX
    </p>
  </div>
);

export const Specials: React.SFC<SpecialsProps> = (props) => (
  <StaticQuery
    query={SpecialsQuery}
    render={(data: SpecialData) => <SpecialsComponent data={data} {...props} />}
  />
);

const SpecialsQuery = graphql`
  query {
    allContentfulSpecial {
      edges {
        node {
          title
          price
        }
      }
    }
  }
`;
