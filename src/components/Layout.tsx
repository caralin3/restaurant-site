import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import favicon from '../appearance/images/favicon.ico';
import { SiteData } from '../types';
import styles from './Layout.module.scss';
import { Navigation, Footer } from './';

interface LayoutProps {
  pageTitle?: string;
}

interface LayoutPropsWithData extends LayoutProps {
  data: SiteData;
}

const LayoutComponent: React.SFC<LayoutPropsWithData> = (props) => {
  const { data, pageTitle } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <div className={styles.layout}>
      <Helmet
        title={!!pageTitle ? `${ pageTitle} | ${siteTitle}` : siteTitle}
        link={[{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }]}
      />
      <Navigation title={siteTitle} />
      <div className={styles.layout}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export const Layout: React.SFC<LayoutProps> = (props) => (
  <StaticQuery
    query={LayoutQuery}
    render={data => <LayoutComponent data={data} {...props} />}
  />
);

const LayoutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
