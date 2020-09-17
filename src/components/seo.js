import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

const SEO = ({ title, description }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl: url
        }
      }
    }
  `);

  const defaults = site.siteMetadata;
  if (defaults.siteUrl === "" && typeof window !== "undefined") {
    defaults.siteUrl = window.location.origin;
  }
  const { defaultTitle, defaultDescription, siteUrl } = defaults;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={seo.title}>
      <html lang="en" />

      <meta name="description" content={seo.description} />

      <link rel="canonical" href={seo.url} />

      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={seo.description} />

      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      />
    </Helmet>
  );
};

export default SEO;
