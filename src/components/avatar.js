import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

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
    <div className="flex flex-col self-end items-center">
      <Img
        className="h-56 w-56 m-8 rounded shadow"
        fluid={data.avatar.childImageSharp.fluid}
      />
      <div className="flex flex-col flex-center">
        <h1 className="text-2xl text-center">ROB STEILBERG</h1>
        <div className="mt-3 text-lg text-center">
          <h2>
            aviation enthusiast
            <br />& student pilot
          </h2>
          <hr className="h-px my-1 border-0 bg-white" />
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
