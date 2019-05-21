const url = require("url");

module.exports = {
  siteMetadata: {
    title: `Jean Regisser { software engineer }`,
    description: `Portfolio of software engineer Jean Regisser.`,
    author: `@jeanregisser`,
    // These are provided by the netlify build
    repositoryUrl:
      (process.env.REPOSITORY_URL &&
        // strip out the auth info present in the url
        url.format(new URL(process.env.REPOSITORY_URL), { auth: false })) ||
      "",
    commitHash: process.env.COMMIT_REF || "dev",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-13098799-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jean Regisser`,
        short_name: `Regisser`,
        start_url: `/`,
        // background_color: `#663399`,
        theme_color: `#fffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-react-css-modules`,
      options: {
        // *.css files are included by default.
        // To support another syntax (e.g. SCSS),
        // add `postcss-scss` to your project's devDependencies
        // and add the following option here:
        // filetypes: {
        //   ".scss": { syntax: `postcss-scss` },
        // },

        // Exclude global styles from the plugin using a RegExp:
        exclude: `\/global\/`,
        // For all the options check babel-plugin-react-css-modules README link provided above
      },
    },
  ],
};
