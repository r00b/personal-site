import React from "react";
import Img from "gatsby-image";
import "../styles/components/avatar.scss";
import { graphql, useStaticQuery } from "gatsby";

const Avatar = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className="avatar">
      <Img className="image" fluid={data.avatar.childImageSharp.fluid} />
      <div className="text">
        <h1>ROB STEILBERG</h1>
        <div>
          <h2>
            aviation enthusiast
            <br />& student pilot
          </h2>
          <hr />
          <h2>
            software development
            <br />
            engineer, Esri
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
