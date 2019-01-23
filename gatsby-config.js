require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let contentfulConfig;

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

const envConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENV_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: envConfig.spaceId || contentfulConfig.spaceId,
  environment: envConfig.envId || contentfulConfig.envId,
  accessToken: envConfig.accessToken || contentfulConfig.accessToken,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Restaurant Name`,
    siteUrl: `https://www.restaurant.com`,
    description: `Website for Restaurant`,
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
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
    }
  ],
}
