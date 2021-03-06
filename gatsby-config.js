require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let masterConfig;

try {
  // Load the Contentful config from the .contentful.json
  masterConfig = require('./.contentful')
} catch (_) { }

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || masterConfig.spaceId,
  environment: process.env.CONTENTFUL_ENV_ID || masterConfig.envId,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || masterConfig.accessToken,
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Joe's Pizzeria & Restaurant`,
    siteUrl: `https://joespizza-demo.netlify.com/`,
    description: `Static Website Demo for Local Restaurant with CMS integration`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-plugin-tslint',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/appearance/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // Specify optional GTM environment details.
        gtmAuth: process.env.GOOGLE_TAG_MANAGER_ENV_AUTH,
        gtmPreview: process.env.GOOGLE_TAG_MANAGER_ENV_PREVIEW,
      },
    }
  ],
}
