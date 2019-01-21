import { graphql } from 'gatsby'
import React from 'react'
import { Navigation, Footer } from '.';
import styles from './Layout.module.scss'

interface LayoutProps {
  children: any,
  data: {
    site: {
      siteMetadata: {
        title: string;
      }
    }
  }
}

export const Layout = ({data, children}: LayoutProps) => {
  // const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const year = new Date().getFullYear();

  return (
    <div className={styles.layout}>
      <Navigation title={siteTitle} />
      <div className={styles.layout}>
        {children}
      </div>
      <Footer
        address="12 Address St Town, ST 14205"
        phone={5557416842}
        title={siteTitle}
        year={year}
      />
    </div>
  )
}

export const LayoutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

// import { Link } from 'gatsby'
// import base from './base.scss'
// import Container from './container'
// import Navigation from './navigation'

// class Template extends React.Component {
//   render() {
//     const { location, children } = this.props
//     let header

//     let rootPath = `/`
//     if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
//       rootPath = __PATH_PREFIX__ + `/`
//     }

//     return (
//       <Container>
//         <Navigation />
//         {children}
//       </Container>
//     )
//   }
// }

// export default Template
