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
        className="h-48 w-48 md:h-56 md:w-56 m-5 md:m-8 rounded shadow"
        fluid={data.avatar.childImageSharp.fluid}
      />
      <div className="flex flex-col flex-center">
        <h1 className="text-2xl text-center uppercase">Rob Steilberg</h1>
        <div className="mt-3 text-md md:text-lg text-center">
          <h2>
            commercial pilot
            <br />& flight instructor
          </h2>
          <hr className="h-px my-1 mx-3 md:mx-0 border-0 bg-white" />
          <h2>
            senior software development
            <br />
            engineer, ForeFlight / Boeing
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
