import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Header from "../components/header";

import "../styles/pages/404.scss";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Header showHome={true} />
    <div className="not-found">
      <h1>NOT FOUND</h1>
      <p>Whatever you were looking for... it's not here.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
