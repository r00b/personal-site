const defaults = {
  title: "Rob Steilberg",
  description: "Robert Steilberg's home page",
  icon: "src/images/favicon.png",
};

const icon = "src/images/favicon.png";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: defaults.title,
    description: defaults.description,
    author: "@r00b",
    url: "",
    icon: defaults.icon,
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
      resolve: `gatsby-transformer-sharp`,
      options: {
        icon,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"),
        ],
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`EB Garamond`, `PT Serif Caption`, `Roboto`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: defaults.description,
        short_name: defaults.title,
        start_url: `/`,
        background_color: `#0d2034`,
        theme_color: `#ffffff`,
        lang: `en`,
        display: `standalone`,
        icon: defaults.icon,
        icon_options: {
          purpose: `maskable any`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      },
    },
  ],
};
