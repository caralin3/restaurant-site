import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ContentfulCoupon, Coupon, CouponData } from '../types';
import styles from './Coupons.module.scss';
import { formatMoney } from '../utils';

interface CouponsProps {}

interface CouponsPropsWithData {
  data: CouponData;
}

export const CouponsComponent: React.SFC<CouponsPropsWithData> = ({data}) => {
  const coupons: ContentfulCoupon[] = data.allContentfulCoupon.edges;

  return (
    <div className={styles.coupons}>
      {coupons.map((coupon, i) => (
        <CouponItem key={i} coupon={coupon.node} />
      ))}
    </div>
  );
};

interface CouponProps {
  coupon: Coupon;
}

export const CouponItem: React.SFC<CouponProps> = ({coupon}) => (
  <div className={styles.coupon}>
    <p className={styles.couponTitle}>{coupon.title}</p>
    <p className={styles.couponPrice}>
      {formatMoney(coupon.price)} {coupon.discount && 'OFF'}
    </p>
    <p className={styles.couponDescription}>
      {!!coupon.shortDescription && coupon.shortDescription}
    </p>
    <small className={styles.couponDisclaimer}>{coupon.disclaimer}</small>
  </div>
);

export const Coupons: React.SFC<CouponsProps> = (props) => (
  <StaticQuery
    query={CouponsQuery}
    render={(data: CouponData) => <CouponsComponent data={data} {...props} />}
  />
);

const CouponsQuery = graphql`
  query {
    allContentfulCoupon {
      edges {
        node {
          title
          shortDescription
          price
          disclaimer
          discount
        }
      }
    }
  }
`;
