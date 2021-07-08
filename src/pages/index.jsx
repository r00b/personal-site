import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Header from "../components/header";
import Avatar from "../components/avatar";
import Aircraft from "../components/aircraft";

const IndexPage = () => {
  return (
    <Layout>
      <Seo />
      <Header />
      <Avatar />
      <Aircraft />
    </Layout>
  );
};

export default IndexPage;
