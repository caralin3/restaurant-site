import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { FooterData, Social } from '../types';
import { formatPhone } from '../utils/formatter';
import styles from './Footer.module.scss';

interface FooterProps {}

interface FooterPropsWithData {
  data: FooterData;
}

export const FooterComponent: React.SFC<FooterPropsWithData> = ({data}) => {
  const title = data.site.siteMetadata.title;
  const location = data.allContentfulLocations.edges[0].node;
  const profile = data.allContentfulProfile.edges[0].node;
  const year = new Date().getFullYear();
  const socials: Social[] = [
    {
      class: 'fa-facebook-square',
      url: profile.facebook
    },
    {
      class: 'fa-twitter-square',
      url: profile.twitter
    },
    {
      class: 'fa-instagram',
      url: profile.instagram
    }
  ]

  return (
    <footer className={styles.footer}>
      <small className={styles.footerCopyright}>
        &copy; {year} {title}
      </small>
      <span className={styles.footerContact}>
        <p className={styles.footerAddress}>
          {`${location.street}
            ${location.city}, 
            ${location.state}
          `}
        </p>
        <p className={styles.footerAddress}>
          {formatPhone(location.phone)}
        </p>
      </span>
      <span className={styles.footerSocial}>
        {socials.map((soc, i) => (
          !!soc.url &&
          <a href={soc.url} target="_blank" key={i}>
            <i className={`fab ${soc.class}`} />
          </a>
        ))}
      </span>
    </footer>
  );
}

export const Footer: React.SFC<FooterProps> = (props) => (
  <StaticQuery
    query={FooterQuery}
    render={(data: FooterData) => <FooterComponent data={data} {...props} />}
  />
);

const FooterQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulLocations {
      edges {
        node {
          street
          city
          state
          zipCode
          phone
        }
      }
    }
    allContentfulProfile {
      edges {
        node {
          facebook
          twitter
          instagram
        }
      }
    }
  }
`
