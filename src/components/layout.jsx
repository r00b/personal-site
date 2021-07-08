import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import BackgroundImage from "gatsby-background-image";

import "../styles/components/layout.scss";

const Layout = ({ children }) => {
  if (typeof window !== `undefined`) {
    const setViewportHeight = function () {
      const viewportHeight = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${viewportHeight}px`);
    };
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
  }

  const data = useStaticQuery(graphql`
    query {
      skyhawk: file(relativePath: { eq: "skyhawk.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage
      Tag="section"
      className="backdrop"
      alt="Cessna 172 Skyhawk"
      fluid={data.skyhawk.childImageSharp.fluid}
      style={{
        backgroundSize: "",
        backgroundPosition: "",
      }}>
      <main className="h-full flex flex-col">{children}</main>
    </BackgroundImage>
  );
};

export default Layout;
