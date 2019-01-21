import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import './Index.module.scss'
import styles from './Home.module.scss'
import { Hero, Intro, Layout, LocationHours } from '../components';
import { IndexData } from '../types/queries';

interface IndexProps {
  data: IndexData
}

export default class Index extends React.Component<IndexProps> {
  public render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const heroImage = data.heroImage.childImageSharp.fluid;

    return (
      <Layout data={data}>
        <Helmet title={siteTitle} />
        <Hero
          image={heroImage}
          phone={5557416842}
          title={siteTitle}
        />
        <div className={styles.homeContent}>
          <Intro />
          <LocationHours />
        </div>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    heroImage: file(relativePath: { eq: "pizza.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

// import React from 'react'
// import { graphql } from 'gatsby'
// import {get} from 'lodash'
// import Helmet from 'react-helmet'
// import Hero from '../components/hero'
// import Layout from '../components/layout'
// import ArticlePreview from '../components/article-preview'

// class RootIndex extends React.Component {
//   render() {
    // const siteTitle = get(this, 'props.data.site.siteMetadata.title')
//     const posts = get(this, 'props.data.allContentfulBlogPost.edges')
//     const [author] = get(this, 'props.data.allContentfulPerson.edges')

//     return (
//       <Layout location={this.props.location} >
//         <div style={{ background: '#fff' }}>
//           <Helmet title={siteTitle} />
//           <Hero data={author.node} />
//           <div className="wrapper">
//             <h2 className="section-headline">Recent articles</h2>
//             <ul className="article-list">
//               {posts.map(({ node }) => {
//                 return (
//                   <li key={node.slug}>
//                     <ArticlePreview article={node} />
//                   </li>
//                 )
//               })}
//             </ul>
//           </div>
//         </div>
//       </Layout>
//     )
//   }
// }

// export default RootIndex

// export const pageQuery = graphql`
//   query HomeQuery {
//     allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
//       edges {
//         node {
//           title
//           slug
//           publishDate(formatString: "MMMM Do, YYYY")
//           tags
//           heroImage {
//             fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
//              ...GatsbyContentfulFluid_tracedSVG
//             }
//           }
//           description {
//             childMarkdownRemark {
//               html
//             }
//           }
//         }
//       }
//     }
//     allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
//       edges {
//         node {
//           name
//           shortBio {
//             shortBio
//           }
//           title
//           heroImage: image {
//             fluid(
//               maxWidth: 1180
//               maxHeight: 480
//               resizingBehavior: PAD
//               background: "rgb:000000"
//             ) {
//               ...GatsbyContentfulFluid_tracedSVG
//             }
//           }
//         }
//       }
//     }
//   }
// `
